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
原因：类型不匹配，使用字符串查询与数字类型不匹配导致没有数据，与instance无关
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
### 中文传输字符长度比字符串长度多2的长度
问题网元发送中文报错，本以为是字符转换的问题，结果是head长度的问题（晕
流的长度

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

### win terminal 
https://learn.microsoft.com/zh-cn/windows/terminal/panes


april drove targets refuse italic egypt resistance providing updated hazardous pony whom grading amateurs supplied freestyle


### tar cvf ~hx/db.tar redis/
gzip myarchive.tar


indigenous mothers nursing weeks university dots password reimbursement surname hoping samurai consortium restart interact particularly


singing extended dozens apparently meals relevance business institutions suggestions verify environment sensation lands registrar


### https://leetcode.cn/studyplan/top-interview-150/

### linux
docker 重置数据
cd tnms && docker compose kill && rm -rf ../tnms_data && ./tnms_start.sh


### nginx
前后端合一 静态请求和动态请求

### delete
rimraf [src]
 npm install -g rimraf

### Glob Import As 
全局导入

### CRA(create react app)
react官方建议使用vite


### react 16 Fiber
https://legacy.reactjs.org/blog/2017/09/26/react-v16.0.html

Fiber is responsible for most of the new features in React 16, like error boundaries and fragments. Over the next few releases, you can expect more new features as we begin to unlock the full potential of React.

Perhaps the most exciting area we’re working on is async rendering—a strategy for cooperatively scheduling rendering work by periodically yielding execution to the browser. The upshot is that, with async rendering, apps are more responsive because React avoids blocking the main thread.

### str 
charAt() slice(-1) [length-1] 获取字符串最后一个字符

### key value
```
const name = Object.keys(obj)[0];
const data = yang8[name].definition.yangType === "container" ? await this.getContainer(name) : await this.getList(name);        return {data: {data: {[name]: data}}};
```

### Java operator(https://docs.oracle.com/javase/tutorial/java/nutsandbolts/opsummary.html)
>=Greater than or equal to
\<Less than
&& Conditional-AND
?: Ternary(shorthand for if-then-less statment)

### 抓包
wireshark   snmp2 mib


模板字符串、 分布式

### git取消已经commit的文件
git reset HEAD~


### windows 右键
reg.exe add "HKCU\Software\Classes\CLSID\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}\InprocServer32" /f /ve
win + x 终端管理员


屏幕保护程序
设置 ”在合上便携式计算机时“ 设成'不 采取任何措施'
设置 '在按下计算机睡眠按钮时”设成“不 采取任何措施'

### object 数据存储 动态存储
    power[ne] = {};
    power[ne][`EDFA-${loc}-PA`] = [data[`EDFA-${loc}-PA`]?.["target-gain"]];


### idea 主题theme插件更新 编辑页变白的问题
需要在 (Settings/Preferences)->Editor->Color Scheme 将他设置为对应的颜色


### cloneDeep    deepClone 


### redux
```
import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import faultReducer from "./faultSlice";
import timeReducer from "./timeSlice";
import languageReducer from "./languageSlice";
import chassisReducer from "./chassisSlice";
import layerReducer from "@/redux/layerSlice";
import upgradeSlice from "@/redux/upgradeSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        fault: faultReducer,
        time: timeReducer,
        language: languageReducer,
        chassis: chassisReducer,
        layer:layerReducer,
        upgrade:upgradeSlice
    }
});

export default store;



---------------------------------------
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import {createRoot} from "react-dom/client";
import App from "./app";
import store from "./redux/store";

const root = document.getElementById("root");
const container = createRoot(root);
container.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
);
document.title = `iGUI - ${window.location.hostname}`;


```


PostgreSQL


### js对象属性赋值问题
有时候解构赋值会赋值失败
不如直接 data.type = 赋值


### 删除
rm -rf node_modules
Remove-Item -Recurse -Force node_modules


### ultraedit 工具




javascript.info

### win11 focus 在windows中执行干净启动
https://support.microsoft.com/zh-cn/topic/%E5%A6%82%E4%BD%95%E5%9C%A8-windows-%E4%B8%AD%E6%89%A7%E8%A1%8C%E5%B9%B2%E5%87%80%E5%90%AF%E5%8A%A8-da2f9573-6eec-00ad-2f8a-a97a1807f3dd


### CSRF
跨域攻击 


### android document
https://developer.android.com/jetpack/compose/compositionlocal


### webSocket / eventSource(SSE)


英飞拉

### leetcode
https://leetcode.cn/problems/group-anagrams/solutions/520469/zi-mu-yi-wei-ci-fen-zu-by-leetcode-solut-gyoc/?envType=study-plan-v2&envId=top-100-liked


3. 使用持久化状态管理库：有一些第三方库（如 redux-persist）可以帮助你将 Redux store 中的数据持久化到本地存储或其他持久化存储中，以便在页面刷新后可以恢复数据。


alarm.resource.indexOf(filterKey) > -1
"PORT-1-40-NM2" TFF-1-4 -1-4


### debounce
1. 当调用 `debounce` 函数时，它会返回一个新的函数（称为 `debounced` 函数）作为结果。

2. 当调用 `debounced` 函数时，它会启动一个定时器，并等待一定的时间（即防抖延迟）。

3. 如果在防抖延迟内再次调用 `debounced` 函数，定时器会被重置，重新开始计时。

4. 如果在防抖延迟内没有再次调用 `debounced` 函数，定时器会触发，并执行原始函数。

通过这种机制，`debounce` 函数可以确保原始函数只在一定的时间间隔内没有新的调用时才会执行，从而实现函数调用的防抖效果。

下面是一个简化版的 `debounce` 函数的示例实现：

```javascript
function debounce(func, delay) {
  let timerId;

  return function (...args) {
    clearTimeout(timerId);

    timerId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
```

在上述示例中，`debounce` 函数接受两个参数：`func` 表示原始函数，`delay` 表示防抖延迟时间。

`debounce` 函数返回一个闭包函数，该闭包函数内部使用了一个定时器 `timerId`。每当调用闭包函数时，定时器会被清除，并重新设 置一个新的定时器。

当没有新的函数调用在防抖延迟内发生时，定时器会触发，并执行原始函数 `func`。

这就是 lodash 的 `debounce` 函数的基本实现原理。




这段代码是一个用于配置代理的中间件。它使用了`http-proxy-middleware`库，用于在开发环境中将特定的请求代理到不同的目标服务


### 使用终端打开注册表编辑器
beyond conpare

regedt32 输入   
在计算机\HKEY_LOCAL_MACHINE\SOFTWARE\Setup 删除一个socket ...


### react svg import 导入
import { ReactComponent as Fan_1 } from './img_fs/port/fan_1.svg';


### python include
        if password not in ["Optical@1cli", "FS@otn"] or login_info.username != "admin":


### download
window.open(`/api/file/download?type=data&filename=${name}`, "_self");

```
class Solution:
    def twoSum(nums: List[int], target: int) -> List[int]:
        n = len(nums)
        for i in range(n):
            for j in range(i + 1, n):
                if nums[i] + nums[j] == target:
                    return [i, j]

        return []


def twoSumHash(nums: List[int], target: int) -> List[int]:
    hashtable = dict()
    for i, num in enumerate(nums):
        if target - num in hashtable:
            return [hashtable[target - num], i]
        hashtable[nums[i]] = i
    return []

```
在Python中，enumerate() 是一个内置函数，用于将一个可迭代对象（如列表、元组、字符串等）转换为一个枚举对象，同时返回每个元素的索引和值。这个函数通常在循环中使用，可以方便地获取元素的索引和值。

### splice

```
const a = [1, 2, 3, 4, 5, 0, 0];
const b = [2, 3, 4];
a.splice(5, a.length - 5, ...b);
a.sort((t1, t2) => t1 - t2);
console.log(a);
```

### document processing 文档处理
pandoc test.docx -o test.md
pandoc TNMS网管系统用户手册.docx --extract-media=images -o cc.md


february funny excerpt award sweep festivals sensory rhetoric thoroughly hygiene extra assistant fragrances comprehend


### svg https://svg-tutorial.com/svg/gradient



`**`是用来进行字典解包（dictionary unpacking）操作的语法

export const sleep = ms => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
};


### vim
switching window
reference https://zhuanlan.zhihu.com/p/683883778


<ctrl-w> +  w 窗口循环切换
            h 切换到左边窗口
            j 切换到上边窗口
            k 切换到下边窗口
            l 切换到右边窗口


### go struct
```
tests := []struct {
		name      string
		args      args
		wantStart int
		wantEnd   int
		wantTyp   int
		wantErr   bool
		wantValid bool
	}{
		{"bool", args{`[true  ,2]`, []interface{}{0}}, 1, 5, V_TRUE, false, true},
		{"bool", args{`[t2ue  ,2]`, []interface{}{0}}, 1, 5, V_TRUE, false, false},
		{"number", args{`[1  ,2]`, []interface{}{0}}, 1, 2, V_NUMBER, false, true},
		{"number", args{`[1w ,2]`, []interface{}{0}}, 1, 3, V_NUMBER, false, false},
		{"string", args{`[" "  ,2]`, []interface{}{0}}, 1, 4, V_STRING, false, true},
		{"string", args{`[" "]  ,2]`, []interface{}{0}}, 1, 4, V_STRING, false, true},
		{"object", args{`[{"":""}  ,2]`, []interface{}{0}}, 1, 8, V_OBJECT, false, true},
		{"object", args{`[{x}  ,2]`, []interface{}{0}}, 1, 4, V_OBJECT, false, false},
		{"arrauy", args{`[[{}]  ,2]`, []interface{}{0}}, 1, 5, V_ARRAY, false, true},
		{"arrauy", args{`[[xx]  ,2]`, []interface{}{0}}, 1, 5, V_ARRAY, false, false},
	}
```

### js string
```
PROT_10GE_LAN
{port_type.substring(port_type.indexOf("_") + 1)}
```

### https://yyets.click/home

### python venv
python -m venv venv

 macos & linux 激活虚拟环境
source venv/bin/activate

windows 激活虚拟环境
venv\Scripts\activate

### frontend interview
https://www.lingtiku.com/quiz/detail/5

taste test
### 三角形 css
```
#triangle {
    width: 0;
    height: 0;
    border-left: 40px solid transparent;
    border-right: 40px solid transparent;
    border-bottom: 80px solid lightblue;
}
```
### interview
https://www.frontendinterviewhandbook.com/zh/

### Nuphy 629
### binarySearch
```javascript
function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        let mid = Math.floor((left + right) / 2);

        if (arr[mid] === target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return -1; // 如果未找到目标元素，返回-1
}

// 测试示例
const arr = [1, 3, 5, 7, 9, 11, 13];
const target = 7;
const index = binarySearch(arr, target);

if (index !== -1) {
    console.log(`目标元素 ${target} 找到，索引位置为 ${index}`);
} else {
    console.log(`目标元素 ${target} 未找到`);
}
```
### promise
```javascript
// 手写一个简单的Promise
const customPromise = new Promise((resolve, reject) => {
    // 模拟异步操作
    setTimeout(() => {
        const randomNum = Math.random();
        if (randomNum >= 0.5) {
            resolve(`Success: Random number ${randomNum} is greater than or equal to 0.5`);
        } else {
            reject(`Error: Random number ${randomNum} is less than 0.5`);
        }
    }, 1000);
});

// 使用Promise的then和catch方法处理结果
customPromise.then((message) => {
    console.log(message);
}).catch((error) => {
    console.error(error);
});
```
### http-proxy-middleware
### https://milu.blog/article/117           interview web nav
### 使用git查看代码行数
```
git ls-files | xargs wc -l
```
### pon dci otn pul
### python
### hello-algo
https://github.com/krahets/hello-algo
### http-proxy-middleware
### everyone-can-use-english
1
### rust
```
enum Coin {
    Penny,
    Nickel,
    Dime,
    Quarter,
}

fn value_in_cents(coin: Coin) -> u8 {
    match coin {
        Coin::Penny => 1,
        Coin::Nickel => 5,
        Coin::Dime => 10,
        Coin::Quarter => 25,
    }
}
```
6.
##### python 1
### generative-ai-for-beginners

https://github.com/microsoft/generative-ai-for-beginners/tree/main


go 1
1 1
做了一份前端面试复习计划，保熟～
-1
xr-frame
-1
### canvas
ndc canvas
```
// 获取 canvas 元素
    var canvas = document.getElementById('canvas');
    // 通过判断getContext方法是否存在来判断浏览器的支持性
    if(canvas.getContext) {
      // 获取绘图上下文
      var ctx = canvas.getContext('2d');
      // 绘制一条从起点（x: 50, y:50）到 另一个点（x: 200, y:200）的直线
      ctx.moveTo(50, 50);
      ctx.lineTo(200, 200);
      ctx.stroke();
    }
```
```
// 获取绘图上下文
      var ctx = canvas.getContext('2d');
      // 绘制一个三角形
      ctx.moveTo(50, 50);
      ctx.lineTo(200, 200);
      ctx.lineTo(200, 50);
      ctx.lineTo(50, 50);
      ctx.stroke();
```
绘制一个矩形边框
ctx.strockRect(50,50,200,100);
绘制一个填充矩形
ctx.fillRect(100,100,200,100);
createLinearGradient
### end-to-end
### lua table
