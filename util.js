const fs = require("fs");
const path = require("path");
const dayjs = require("dayjs");
const fernet = require("fernet");
const s = require("sjcl");
const z = require("js-base64");
const AsyncLock = require("async-lock");

const lock = new AsyncLock();
const NE_TYPE = process.argv.at(-1);
const {namespace} = NE_TYPE === "5" ? require("../config/yang-t5.json") : require("../config/yang-t6.json");

const tokenKey = "k8jajQxb2_XWatk4T6jGLTEVAyXxuYeeTJl7U7R_SYw=";

const EXPIRE_TIME = 30 * 24 * 60 * 60;

["log", "info", "warn", "error"].forEach(method => {
    const originalMethod = console[method];
    console[method] = (...args) => {
        let initiator = "unknown place";
        const dateStr = new Date().toLocaleString();
        try {
            throw new Error();
        } catch (e) {
            if (typeof e.stack === "string") {
                let isFirst = true;
                // eslint-disable-next-line no-restricted-syntax
                for (const line of e.stack.split("\n")) {
                    const matches = line.match(/^\s+at\s+(.*)/);
                    if (matches) {
                        if (!isFirst) {
                            initiator = matches[1].includes("(") ? matches[1] : `(${matches[1]})`;
                            break;
                        }
                        isFirst = false;
                    }
                }
            }
        }
        originalMethod.apply(console, [
            ...args,
            "\n",
            " ".repeat(150 - initiator.length),
            `at ${dateStr} ${initiator}`
        ]);
    };
});

const NE_PROTOCOL_TYPE = {
    2: "snmp",
    220: "snmp",
    5: "netConf",
    6: "netConf",
    8: "snmp"
};

const SUPPORT_NE_TYPE = [220, 5, 8];

// const log4j = log4js.getLogger("cheese");

const arrayToObject = (arr, ns) => {
    const result = {};
    arr.forEach(item => {
        result[item] = {};
    });
    result[arr[0]].$ = ns;
    return result;
};

const currentTime = () => dayjs().format("YYYY-MM-DD HH:mm:ss");

const logging = (...args) => {
    console.log(currentTime(), ...args);
    // log4j.trace(...args);
};

/**
 * 格式化特殊字符为\\格式解决redisSearch匹配特殊符号问题
 * @param targetVal string
 * @returns string
 */
const formatSymbolRedis = targetVal => {
    if (typeof targetVal !== "string") targetVal = String(targetVal);
    return targetVal.startsWith("[") ? targetVal : targetVal.replace(/[+./:\\_|~-]/g, "\\$&");
};

const getValueByJPath = (obj, path) => path.reduce((a, c) => a?.[c], obj);

const convertToArray = obj => {
    if (obj == null) return [];
    if (Array.isArray(obj)) return obj;
    if (["string", "object", "number"].includes(typeof obj)) return [obj];
    return [];
};

// 匹配 [xxx] [xxx] [xxx] 格式
const REGEXP_THREE_BRACKETS = /\[(.*?)].*?\[(.*?)].*?\[(.*?)]/;

const delFolder = path => {
    let files = [];

    if (fs.existsSync(path)) {
        files = fs.readdirSync(path);

        files.forEach(function (file, index) {
            const curPath = `${path}/${file}`;
            if (fs.statSync(curPath).isDirectory()) {
                delFolder(curPath);
            } else {
                fs.rmSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};

const isObject = obj => Object.prototype.toString.call(obj) === "[object Object]";

const removeNS = val => {
    if (Array.isArray(val)) return val.map(v => removeNS(v));
    return val?._ && val.$ ? val._.split(":").pop() : val;
};

// const test1 = {
//     _: "oc-alarm-types:MAJOR",
//     $: {"xmlns:oc-alarm-types": "http://openconfig.net/yang/alarms/types"}
// };
// console.log(removeNS(test1));
//
// const test2 = "type-id";
// console.log(removeNS(test2));
// const test3 = [
//     {
//         _: "oc-alarm-types:MAJOR",
//         $: {"xmlns:oc-alarm-types": "http://openconfig.net/yang/alarms/types"}
//     },
//     {
//         _: "oc-alarm-types:MINOR",
//         $: {"xmlns:oc-alarm-types": "http://openconfig.net/yang/alarms/types"}
//     }
// ];
// console.log(removeNS(test3));

/**
 * Recurve all nodes and remove fields start with @, convert {f: {@xmlns: "", #text: "val"}} to {f: "val"}
 * If value is array, also removeNS()
 * No change for object (null, undefined)
 * @param o {{}}
 * @returns {{}}
 */
const removeNSForObj = o => {
    delete o.$;
    return Object.fromEntries(
        Object.entries(o).map(([k, v]) => {
            const val = removeNS(v);
            if (isObject(val)) {
                delete val.$;
                return [k, removeNSForObj(val)];
            }
            return [k, val];
        })
    );
};

const removeNSForObj2 = obj => {
    if (obj instanceof Array) {
        obj.map(i => {
            removeNSForObj(i);
        });
        return;
    }
    Object.entries(obj).map(([key, val]) => {
        if (typeof val === "string") {
            return;
        }
        if (val instanceof Array) {
            val.map((i, index) => {
                if (i?._ && i?.$) {
                    val.splice(index, 1);
                    val.push(i._.split(":").pop());
                } else {
                    removeNSForObj2(i);
                }
            });
        }
        if (val._ && val.$) {
            obj[key] = val._.split(":").pop();
        }
        if (val._) {
            delete val._;
        }
        if (val.$) {
            delete val.$;
        }
        removeNSForObj(val);
    });
};

// const obj = {
//     ne_id: "47.102.195.212:30830",
//     keys: ["PORT-1-1-C9"],
//     data: {
//         name: "PORT-1-1-C9",
//         config: {name: "PORT-1-1-C9", description: "CLIENTPORT", "admin-state": "ENABLED"},
//         port: {
//             config: {
//                 "layer-protocol-name": {
//                     _: "oc-opt-types:PROT_STM64",
//                     $: {xmlns: "http://openconfig.net/yang/platform/port"}
//                 },
//                 "reverse-mode": {_: "AUTO", $: {xmlns: "http://openconfig.net/yang/platform/port"}}
//             }
//         }
//     }
// };
//
// console.log(removeNSForObj(obj));

const enCode = str => {
    return new fernet.Token({
        secret: new fernet.Secret(tokenKey),
        time: Date.parse(1),
        iv: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
    }).encode(str);
};

const deCode = str => {
    return new fernet.Token({
        secret: new fernet.Secret(tokenKey),
        token: str,
        ttl: 0
    }).decode();
};

const addNS = (param, yang) => {
    Object.keys(param).forEach(key => {
        const o = param[key];
        const y = yang[key];
        if (typeof o === "object") {
            addNS(o, y);
            if (y.definition) {
                o.$ = {xmlns: namespace[y.definition.namespace]};
            }
        } else if (y) {
            param[key] = o;
        }
    });
    return param;
};

const getSearchData = searchRawData => {
    const {total, documents} = searchRawData;
    if (total === 0) return [];
    return documents.map(item => item.value);
};

const sleep = ms => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
};

const a = s => {
    return z.decode(s).split("//");
};

const C = {
    a: {
        result: false,
        message: "Invalid code, The code has expired."
    },
    b: {
        result: false,
        message: "Invalid code"
    },
    c: 99999,
    d: "a",
    e: "b",
    f: "c",
    g: {
        result: false
    },
    h: {
        result: false,
        message: "License Expired"
    },
    i: {
        result: true
    },
    j: {
        result: false,
        message: "Abnormal registration time"
    }
};

const e = (a, b) => {
    const obj = JSON.parse(s.decrypt(a, z.decode(b)));
    return z.decode(obj[z.decode(Object.values(obj).pop())]).split("//");
};

const fa = a => {
    return new Date().getTime() - a;
};

const FC = b => {
    return a(b);
};

const df = b => {
    return Math.floor(b / 86400000);
};

const FA = (s, i) => {
    if (!s) {
        return C.g;
    }
    const c = FC(s);
    const d = e(c[0], c[1]);
    const f = z.decode(c[2]).substring(0, 13);
    let b = d[1];
    if (parseInt(b) !== C.c) {
        const a = fa(f);
        if (!i && a < 0) {
            return C.j;
        }
        b -= df(a);
        if (!i && b <= 0) {
            return C.h;
        }
    }
    return {
        ...C.i,
        a: d[0],
        b,
        c: d[2],
        d: f,
        e: d[3],
        f: (d[4] ?? "")?.split(",")
    };
};

const b = (a, b) => {
    return h(`${a}//${b}//${fc()}`);
};

const h = s => {
    return z.encode(s);
};

const fc = () => {
    return h(new Date().getTime() + Math.random().toString(36).substring(2));
};

const f = d => {
    return new Date().getTime() > parseInt(d.c);
};

const FB = async (a, c) => {
    try {
        const d = e(a, c);
        if (
            d.length === 5 &&
            !isNaN(parseFloat(d[1])) &&
            !isNaN(parseFloat(d[2])) &&
            !isNaN(parseFloat(d[3])) &&
            d[4].split(",").filter(i => isNaN(parseFloat(i))).length === 0
        ) {
            if (f(d)) {
                return C.a;
            }
            return {result: true, data: b(a, c)};
        }
        return C.b;
    } catch (e) {
        console.log(e);
        return C.b;
    }
};

/**
 * 返回版本信息列表
 * @param {string} _path
 * @returns {Array}
 * @example
 * getVersionListInfo("/home/ftpuser/ftp/") -> [{uid: t1_linux_all.bin, name: t1_linux_all.bin, versionInfo: V123456, "time-created": "2000-9-1 12:30:00"}, {uid: t2_linux_all.bin, name: t2_linux_all.bin, versionInfo: V4567, "time-created": "2000-9-1 12:30:00"}]
 */
const getVersionListInfo = async _path => {
    const files = await fs.promises.readdir(_path);
    const results = [];
    const chunkSize = 1024;

    // eslint-disable-next-line no-restricted-syntax
    for (const file of files) {
        const filePath = path.join(_path, file);
        if (path.extname(filePath) === ".bin") {
            const result = await new Promise((resolve, reject) => {
                const readStream = fs.createReadStream(filePath, {highWaterMark: chunkSize});
                let data = "";

                readStream.on("data", chunk => {
                    data += chunk.toString("ascii");
                    const softwareVersionMatch = data.slice(68, 88);
                    const timeMatch = data.slice(48, 67);
                    resolve({
                        uid: file,
                        name: file,
                        type: "5",
                        software: softwareVersionMatch,
                        "time-created": timeMatch
                    });
                    readStream.destroy();
                });

                readStream.on("close", () => {
                    resolve(null);
                });

                readStream.on("error", err => {
                    reject(err);
                });
            });
            if (result) {
                const stats = fs.statSync(filePath);
                result.size = Math.ceil(stats.size / 1024);
                results.push(result);
            }
        } else if (path.extname(filePath) === ".zip") {
            const matchFileName = file.split(".zip")[0];
            const result = {
                uid: file,
                name: file,
                software: "",
                type: "6",
                "time-created": ""
            };
            const stats = fs.statSync(filePath);
            result.size = Math.ceil(stats.size / 1024);
            const zipPath = path.join(_path, matchFileName);
            if (fs.existsSync(zipPath) && fs.statSync(zipPath)?.isDirectory()) {
                fs.readdirSync(path.join(_path, matchFileName))?.find(fileName => {
                    const match = fileName?.match(/USS.*?FW_([\d.]+).ups/);
                    if (match) {
                        // eslint-disable-next-line prefer-destructuring
                        result.software = match[1];
                        return true;
                    }
                });
            }
            result["time-created"] = dayjs(stats.birthtime).format("YYYY-MM-DD HH:mm:ss");
            results.push(result);
        } else if (path.extname(filePath) === ".zip" || path.extname(filePath) === ".txt") {
            const result = {
                uid: file,
                name: file,
                software: "",
                type: "6",
                "time-created": ""
            };
            const stats = fs.statSync(filePath);
            result.size = Math.ceil(stats.size / 1024);
            result["time-created"] = dayjs(stats.birthtime).format("YYYY-MM-DD HH:mm:ss");
            results.push(result);
        } else if (path.extname(filePath) === ".gz") {
            const result = {
                uid: file,
                name: file,
                software: "",
                type: "5",
                "time-created": ""
            };
            const stats = fs.statSync(filePath);
            result.size = Math.ceil(stats.size / 1024);
            result["time-created"] = dayjs(stats.birthtime).format("YYYY-MM-DD HH:mm:ss");
            results.push(result);
        }
    }

    return results;
};

/**
 * decodeOduTS("8-22") => {count: 8, available: [ 1, 2, 4, 5, 6, 8 ], used: [3, 7]}
 */
const decodeOduTS = ts => {
    const [count, state] = ts.split("-");
    const hex = parseInt(state, 16).toString(2).padStart(parseInt(8), "0").slice(0, count);
    const available = [...hex].map((i, idx) => (i === "1" ? -1 : idx + 1)).filter(i => i !== -1);
    const used = [...hex].map((i, idx) => (i === "1" ? idx + 1 : -1)).filter(i => i !== -1);
    return {count, available, used};
};

const tcaToAlarm = tca => {
    try {
        return {
            id: `tca_${tca["tca-serial-no"]}`,
            resource: tca["tca-parameter"]["object-name"],
            text: `threshold-type: ${tca["tca-parameter"]["threshold-type"]}, threshold-value: ${tca["tca-parameter"]["threshold-value"]}, current-value: ${tca["current-value"]}`,
            "time-created": `${dayjs(tca["start-time"]).valueOf()}000000`,
            severity: "minor".toUpperCase(),
            "type-id": tca["tca-parameter"]["object-type"],
            "alarm-abbreviate": `TCA_${tca["tca-parameter"]["pm-parameter-name"]}_${tca[
                "tca-parameter"
            ].granularity.toUpperCase()}`
        };
    } catch (e) {
        console.log(e);
        return {};
    }
};

/**
 * Change NE6 alarm to NE5 alarm format
 * @param alarm6
 * @returns {{severity: string, resource, "type-id", id, text, "time-created": string, "alarm-abbreviate"}}
 */
const unifyAlarm6 = alarm6 => {
    try {
        return {
            id: alarm6["alarm-serial-no"],
            resource: alarm6["object-name"],
            text: alarm6.text ?? alarm6["alarm-code"],
            "time-created": `${dayjs(alarm6["start-time"]).valueOf()}000000`,
            severity: alarm6["perceived-severity"].toUpperCase(),
            "type-id": alarm6["object-type"],
            "alarm-abbreviate": alarm6["alarm-code"]
        };
    } catch (e) {
        console.log(e);
        return {};
    }
};

/**
 * 对时间进行前推或后移
 * @param {object} time 时间值可为时间戳或时间字符串
 * @param {Object} {d, h, m, s} 偏移量分别对应天，小时，分钟，秒,支持负数
 * @returns {Object} time
 * @example
 * 请注意返回值为时间戳，举例仅用于理解时间变化
 * changedTime("2021-01-01 00:00:00", {d: 1, h: 1, m: 1, s: 1}) -> "2021-01-02 01:01:01"
 * changedTime("2021-01-01 00:00:00", {d: 1}) -> "2021-01-02 00:00:00"
 * changedTime("2021-01-01 04:50:00", {h: -1, m: -20}) -> "2021-01-01 03:30:00"
 */
function changedTime(time, {d, h, m, s}) {
    if (!time) return;
    const daySize = (d ?? 0) * 86400000;
    const hourSize = (h ?? 0) * 3600000;
    const minuteSize = (m ?? 0) * 60000;
    const secondSize = (s ?? 0) * 1000;
    return new Date(new Date(time).getTime() + daySize + hourSize + minuteSize + secondSize);
}

/**
 * 返回ISO8601格式的时间格式
 * @example
 * getISO8601Time("2023-05-29 17:03:16") -> 2023-05-29T17:03:16+08:00
 */
function getISO8601Time(time) {
    return dayjs(time).format("YYYY-MM-DDTHH:mm:ssZ");
}

const sensorPathList = {
    transceiver: {
        value: "/openconfig-platform:components/component/openconfig-platform-transceiver:transceiver/state",
        path: ["components", "component", "transceiver", "state"],
        request: {
            type: "ne:5:component",
            filter: {type: "transceiver"}
        }
    },
    port: {
        value: "/openconfig-platform:components/component/port/openconfig-transport-line-common:optical-port/state",
        path: ["components", "component", "port", "optical-port", "state"],
        request: {
            type: "ne:5:component",
            filter: {type: "port"}
        }
    },
    otn: {
        value: "/openconfig-terminal-device:terminal-device/logical-channels/channel/otn/state",
        path: ["terminal-device", "logical-channels", "channel", "otn", "state"],
        request: {
            type: "ne:5:channel"
            // filter: {logical_channel_type: "channel"}
        }
    },
    ethernet: {
        value: "/openconfig-terminal-device:terminal-device/logical-channels/channel/ethernet/state",
        path: ["terminal-device", "logical-channels", "channel", "ethernet", "state"],
        request: {
            type: "ne:5:channel"
            // filter: {logical_channel_type: "ethernet"}
        }
    },
    amplifier: {
        value: "/openconfig-optical-amplifier:optical-amplifier/amplifiers/amplifier/state",
        path: ["optical-amplifier", "amplifiers", "amplifier", "state"],
        request: {
            type: "ne:5:amplifier"
            // filter: {type: "amplifier"}
        }
    },
    och: {
        value: "/openconfig-platform:components/component/openconfig-terminal-device:optical-channel/state",
        path: ["components", "component", "optical-channel", "state"],
        request: {
            type: "ne:5:component",
            filter: {type: "OPTICAL_CHANNEL"}
        }
    }
};

/**
 * 根据传感器路径获取传感器编码
 */
const encodeSensorPath = path => Object.entries(sensorPathList).find(item => path === item[1].value)?.[0];

const tcaToAlarm6 = tca => {
    try {
        return {
            "alarm-serial-no": `tca_${tca["tca-serial-no"]}`,
            "object-name": tca["tca-parameter"]["object-name"],
            "object-type": tca["tca-parameter"]["object-type"],
            "alarm-code": `TCA_${tca["tca-parameter"]["pm-parameter-name"]}_${tca[
                "tca-parameter"
            ].granularity.toUpperCase()}`,
            "alarm-state": tca["tca-state"],
            "perceived-severity": "minor",
            "start-time": tca["start-time"],
            text: `threshold-type: ${tca["tca-parameter"]["threshold-type"]}, threshold-value: ${tca["tca-parameter"]["threshold-value"]}, current-value: ${tca["current-value"]}`
        };
    } catch (e) {
        return {};
    }
};

const needDesensitizedKeys = ["password", "token"];
/**
 * 数据脱敏，置空输入对象的敏感内容
 * @example
 * desensitizeData({"username": "john_doe","password": "1234"}) -> {"username": "john_doe","password": ""}
 */
const desensitizeData = data => {
    if (typeof data !== "object" || data === null) {
        return data;
    }

    const desensitizedData = structuredClone(data);

    Object.keys(desensitizedData).forEach(key => {
        if (needDesensitizedKeys.includes(key)) {
            desensitizedData[key] = "";
        } else if (typeof desensitizedData[key] === "object" && desensitizedData[key] !== null) {
            desensitizedData[key] = desensitizeData(desensitizedData[key]);
        }
    });

    return desensitizedData;
};

module.exports = {
    arrayToObject,
    currentTime,
    logging,
    getValueByJPath,
    formatSymbolRedis,
    convertToArray,
    delFolder,
    removeNS,
    removeNSForObj,
    REGEXP_THREE_BRACKETS,
    enCode,
    deCode,
    addNS,
    getSearchData,
    sleep,
    getVersionListInfo,
    lock,
    removeNSForObj2,
    decodeOduTS,
    EXPIRE_TIME,
    tcaToAlarm,
    unifyAlarm6,
    changedTime,
    getISO8601Time,
    sensorPathList,
    encodeSensorPath,
    tcaToAlarm6,
    desensitizeData,
    NE_PROTOCOL_TYPE,
    SUPPORT_NE_TYPE,
    FA,
    FB,
    FC,
    C
};
