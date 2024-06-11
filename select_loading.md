```
// api
const fetchData = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({data: ["1", "2"], status: 200});
            // reject("123");
        }, 1500);
    });
};
```

# 1. Basic
基础用法。

fetchData接收一个funcion，返回一个Promise，当下拉框展开且没有数据时，会调用该Promise来请求Options信息，并将该Promise的返回内容作为Options配置到Select内。
```
const Demo = () => {
    return (
        <div>
            <SearchSelect
                fetchData={prevOptions => {
                    return fetchData().then(rs => {
                        const {data} = rs;
                        return data.map(item => ({label: item, value: item}));
                    });
                }}
            />
        </div>
    );
};
```

# 2. Dependence
依赖项用法。

当依赖的值变化以后，需要重新请求Options时使用。场景如：组和网元的组合下拉框，当选择组的选择项变化后，需要重新请求网元列表。

dependence是依赖项配置，可以是 state或ref，依赖项更新以后，fetchData会被重新调用。

state举例:
```
const DependenceDemo = () => {
    const [searchValue, setSearchValue] = useState("");
    return (
        <div>
            <Input
                onChange={e => {
                    setSearchValue(e.target.value);
                }}
            />
            <SearchSelect
                dependence={searchValue}
                fetchData={prevOptions => {
                    // prevOptions 指向上一次的options数据
                    console.log("options=", prevOptions);
                    return fetchData().then(rs => {
                        // 手动捕获的错误，如果会导致Promise直接报错的可以不手动处理，如果请求成功返回，但是错误需要在then中处理的，使用一下方式
                        // 通过手动触发一个错误，来扔给selectLoading来处理，组件内部会在catch中通过message.error来提示错误信息
                        if (rs.status === "error" && rs.message) {
                            throw new Error("错误信息");
                        }
                        const {data} = rs;
                        return data.map(item => ({label: item, value: item}));
                    });
                }}
            />
        </div>
    );
};
```

>depenedence值如果是不会导致界面渲染的值如（ref），请在dependence值修改时，使用setState方法渲染一下界面，来刷新依赖他的SelectLoading组件

ref举例：
```
const RefDependenceDemo = () => {
    const [type, setType] = useState("");
    const [form] = Form.useForm();

    return (
        <div>
            <Form form={form}>
                <Form.Item name="type" label="type">
                    <Select
                        options={[
                            {label: "PTP", value: "PTP"},
                            {label: "CTP", value: "CTP"}
                        ]}
                        onChange={value => {
                            setType(value);
                        }}
                    />
                </Form.Item>
                <Form.Item name="point" label="point">
                    <SelectLoading
                        dependence={form?.getFieldValue("type")}
                        fetchData={() => {
                            return fetchData().then(rs => {
                                const {data} = rs;
                                return data.map(item => ({label: item, value: item}));
                            });
                        }}
                    />
                </Form.Item>
            </Form>
        </div>
    );
};
```

多Ref依赖项举例
```
<SelectLoading
    dependence={filterFormRef.current?.getFieldsValue(["object-type", "ne_id"])}
    onChange={() => {
        filterFormRef.current.setFieldsValue({"pm-parameter-name": "ALL"});
        setFilterNeList([...filterNeList]);
    }}
    fetchData={async () => {
        const {"object-type": objectType, ne_id} = filterFormRef.current?.getFieldsValue() ?? {};

        return getPmFilterInfo({
            action: "getObjectName",
            "object-type": objectType,
            ne_id
        }).then(rs => {
            const {apiResult, data = [], apiMessage} = rs;
            if (apiResult === "fail") {
                throw new Error(apiMessage);
            }

            return sortArr(
                data.map(name => ({
                    label: getTNMSName(
                        name,
                        ptpTypeList.find(ptpTypeItem => name === ptpTypeItem.value.data.name)?.value
                            ?.data["ptp-type"]
                    )?.name,
                    value: name
                })),
                ["label"]
            );
        });
    }}
/>
```