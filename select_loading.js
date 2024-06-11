import {useState, useRef, useEffect, forwardRef, useImperativeHandle} from "react";
import {Spin, Select, Empty, message, Cascader, TreeSelect} from "antd";
import {convertToArray} from "@/util/util";

function SelectLoading(props, ref) {
    useImperativeHandle(ref, () => ({
        options
    }));

    const {fetchData, dependence, renderType = "Input", noCache = false, onChange = () => {}, ...other} = props;
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);

    const isDependenceChanged = useRef(false);

    const onDropdownVisibleChange = open => {
        if (open) {
            // 依赖项没变化且当前有选项数据就复用上次的options
            if (!noCache && !isDependenceChanged.current && options?.length > 0) {
                return;
            }

            const oldOptions = options;
            setOptions([]);
            setLoading(true);
            Promise.resolve(fetchData(options))
                .then(_options => {
                    // 通过传递null, 手动复用老选项
                    if (_options === null) {
                        setOptions(oldOptions);
                    } else {
                        setOptions(_options);
                    }
                })
                .catch(err => {
                    message.error(err.message);
                })
                .finally(() => {
                    isDependenceChanged.current = false;
                    setLoading(false);
                });
        }
    };

    useEffect(() => {
        isDependenceChanged.current = true;
    }, [dependence]);

    if (renderType === "Cascader") {
        return (
            <div>
                <Cascader
                    {...other}
                    options={options}
                    onDropdownVisibleChange={onDropdownVisibleChange}
                    notFoundContent={loading ? <Spin /> : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
                />
            </div>
        );
    }
    if (renderType === "TreeSelect") {
        return (
            <div style={{width: 240}}>
                <TreeSelect
                    {...other}
                    showSearch
                    style={{width: "100%"}}
                    allowClear
                    onDropdownVisibleChange={onDropdownVisibleChange}
                    onChange={(value, option) => {
                        onChange(value, option);
                    }}
                    treeData={options}
                    notFoundContent={loading ? <Spin /> : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
                />
            </div>
        );
    }

    const formatOptions =
        props?.mode === "multiple" && convertToArray(props.value)?.includes("ALL")
            ? options?.map(item => ({...item, disabled: item?.value !== "ALL"}))
            : options;

    return (
        <div>
            <Select
                {...other}
                options={formatOptions}
                onChange={(value, option) => {
                    onChange(value, option);
                }}
                onDropdownVisibleChange={onDropdownVisibleChange}
                notFoundContent={loading ? <Spin /> : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
            />
        </div>
    );
}

/**
 *   带加载效果的Select组件，使用方法与Select一致，额外的参数如下:
 *   @param {Function} fetchData 该函数会在select打开时执行，用于请求并配置options，返回值为Promise，该函数的参数为上一次的options，返回值为Promise
 *   @param {Function} dependence 可选项，当dependence值发生变化时，会重新请求options，否则复用上一次的options
 *   @see ./select_lodaing.md
 */
const exportMain = forwardRef(SelectLoading);

export default exportMain;
