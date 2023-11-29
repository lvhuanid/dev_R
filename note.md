### note


#### cloros
https://peiseka.com/index-index-index.html


advantages casting directive decoration accord welfare published module certifications judgment eligible matches forgive intense daughters

#### macgf
www.macgf.com


intel fraction innovation snowboard life opinion modular terms conventional employment client barriers ghana demonstration


doe projection situations convince turtle counselor supervisor paths hunt office applies button offer foil stressed aspects bishop clothes


essentials firewalls tires differentiation chain indicate judging gang crown imperial electoral efficient requesting restrict cabin


### wallpapper
https://alphacoders.com/


physical estimating latin figured environments dryer instrumentation console legislative potato bargaining incentive

### 文件太小只读
9.8k cli


healing throughout envelope crab greeting puzzle passport loan heater urge provided spiritual generator induced creatures immunology disambiguation


documents denied developers button yours synchronization launch bargains angles internship fisheries collateral fireworks formal mats

### redis instance 搜不到数据
```
ft.create ne:8:cardEntry on json prefix 1 ne:8:cardEntry: schema $.ne_id as ne_id tag
```

```
> FT.DROPINDEX ne:8:portEntry
"OK"

> ft.create ne:8:portEntry on json prefix 1 ne:8:portEntry: schema $.data.instance as instance tag
"OK"

> ft.search ne:8:portEntry *
1) "0"

> FT.DROPINDEX ne:8:portEntry
"OK"

> ft.create ne:8:portEntry on json prefix 1 ne:8:portEntry: schema $.data.instance as instance1 tag
"OK"

> ft.search ne:8:portEntry *
1) "0"

> FT.DROPINDEX ne:8:portEntry
"OK"

> ft.create ne:8:portEntry on json prefix 1 ne:8:portEntry: schema $.ne_id as ne_id tag
"OK"

> ft.search ne:8:portEntry *
```

### code tools
```
/**
 *
 * @param {array} strArr  需要排序的字符串数组
 * @param {array} compareTargetPath  排序依据的路径,不填默认是字符串本身，支持多级路径如["a","b","c"]为a.b.c
 * @returns {array} 排序后的字符串数组
 * @example
 * sortArr(["b", "A", "C"]) -> ["A", "b", "C"]
 * sortArr([{a: "b"}, {a: "A"}, {a: "C"}], ["a"]) -> [{a: "A"}, {a: "b"}, {a: "C"}]
 * sortArr([{a: {b: "b"}}, {a: {b: "A"}}, {a: {b: "C"}}], ["a", "b"]) -> [{a: {b: "A"}}, {a: {b: "b"}}, {a: {b: "C"}}]
 */
export const sortArr = (strArr, compareTargetPath) => {
    if ((strArr && !Array.isArray(strArr)) || (compareTargetPath && !Array.isArray(compareTargetPath))) return strArr;
    return strArr?.sort((a, b) => {
        const lowerCaseA =
            compareTargetPath === undefined
                ? a?.toLowerCase()
                : compareTargetPath.reduce((res, pathItem) => res[pathItem], a);
        const lowerCaseB =
            compareTargetPath === undefined
                ? b?.toLowerCase()
                : compareTargetPath.reduce((res, pathItem) => res[pathItem], b);
        return lowerCaseA?.toString()?.localeCompare(lowerCaseB?.toString(), "ZH-CN", {numeric: true});
    });
};
```
