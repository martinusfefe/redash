"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SeriesSettings;
const lodash_1 = require("lodash");
const react_1 = __importStar(require("react"));
const use_debounce_1 = require("use-debounce");
const table_1 = __importDefault(require("antd/lib/table"));
const input_1 = __importDefault(require("antd/lib/input"));
const radio_1 = __importDefault(require("antd/lib/radio"));
// @ts-expect-error ts-migrate(2724) FIXME: Module '"../../../../node_modules/react-sortable-h... Remove this comment to see the full error message
const react_sortable_hoc_1 = require("react-sortable-hoc");
const sortable_1 = require("@/components/sortable");
const prop_types_1 = require("@/visualizations/prop-types");
const ChartTypeSelect_1 = __importDefault(require("./ChartTypeSelect"));
const getChartData_1 = __importDefault(require("../getChartData"));
const SortableBodyRow = (0, react_sortable_hoc_1.sortableElement)((props) => react_1.default.createElement("tr", { ...props }));
function getTableColumns(options, updateSeriesOption, debouncedUpdateSeriesOption) {
    const result = [
        {
            title: "Order",
            dataIndex: "zIndex",
            render: (unused, item) => (react_1.default.createElement("span", { className: "series-settings-order" },
                react_1.default.createElement(sortable_1.DragHandle, null),
                item.zIndex + 1)),
        },
        {
            title: "Label",
            dataIndex: "name",
            render: (unused, item) => (react_1.default.createElement(input_1.default, { "data-test": `Chart.Series.${item.key}.Label`, placeholder: item.key, defaultValue: item.name, onChange: event => debouncedUpdateSeriesOption(item.key, "name", event.target.value) })),
        },
    ];
    if (!(0, lodash_1.includes)(["pie", "heatmap"], options.globalSeriesType)) {
        if (!options.swappedAxes) {
            result.push({
                title: "Y Axis",
                dataIndex: "yAxis",
                render: (unused, item) => (react_1.default.createElement(radio_1.default.Group, { className: "series-settings-y-axis", value: item.yAxis === 1 ? 1 : 0, onChange: event => updateSeriesOption(item.key, "yAxis", event.target.value) },
                    react_1.default.createElement(radio_1.default, { value: 0, "data-test": `Chart.Series.${item.key}.UseLeftAxis` }, "left"),
                    react_1.default.createElement(radio_1.default, { value: 1, "data-test": `Chart.Series.${item.key}.UseRightAxis` }, "right"))),
            });
        }
        result.push({
            title: "Type",
            dataIndex: "type",
            render: (unused, item) => (react_1.default.createElement(ChartTypeSelect_1.default, { "data-test": `Chart.Series.${item.key}.Type`, dropdownMatchSelectWidth: false, value: item.type, 
                // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
                hiddenChartTypes: ["pie", "heatmap", "bubble", "box"], onChange: (value) => updateSeriesOption(item.key, "type", value) })),
        });
    }
    return result;
}
function SeriesSettings({ options, data, onOptionsChange }) {
    const series = (0, react_1.useMemo)(() => (0, lodash_1.map)((0, getChartData_1.default)(data.rows, options), // returns sorted series
    ({ name }, zIndex) => (0, lodash_1.extend)({ key: name, type: options.globalSeriesType }, options.seriesOptions[name], { zIndex })), [options, data]);
    const handleSortEnd = (0, react_1.useCallback)(({ oldIndex, newIndex }) => {
        const seriesOptions = [...series];
        seriesOptions.splice(newIndex, 0, ...seriesOptions.splice(oldIndex, 1));
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'key' does not exist on type 'Boolean'.
        onOptionsChange({ seriesOptions: (0, lodash_1.fromPairs)((0, lodash_1.map)(seriesOptions, ({ key }, zIndex) => [key, { zIndex }])) });
    }, [onOptionsChange, series]);
    const updateSeriesOption = (0, react_1.useCallback)((key, prop, value) => {
        onOptionsChange({
            seriesOptions: {
                [key]: {
                    [prop]: value,
                },
            },
        });
    }, [onOptionsChange]);
    const [debouncedUpdateSeriesOption] = (0, use_debounce_1.useDebouncedCallback)(updateSeriesOption, 200);
    const columns = (0, react_1.useMemo)(() => getTableColumns(options, updateSeriesOption, debouncedUpdateSeriesOption), [
        options,
        updateSeriesOption,
        debouncedUpdateSeriesOption,
    ]);
    return (react_1.default.createElement(sortable_1.SortableContainer, { axis: "y", lockAxis: "y", lockToContainerEdges: true, useDragHandle: true, helperClass: "chart-editor-series-dragged-item", helperContainer: (container) => container.querySelector("tbody"), onSortEnd: handleSortEnd, containerProps: {
            className: "chart-editor-series",
        } },
        react_1.default.createElement(table_1.default
        // @ts-expect-error ts-migrate(2322) FIXME: Type 'boolean[]' is not assignable to type 'object... Remove this comment to see the full error message
        , { 
            // @ts-expect-error ts-migrate(2322) FIXME: Type 'boolean[]' is not assignable to type 'object... Remove this comment to see the full error message
            dataSource: series, columns: columns, components: {
                body: {
                    row: SortableBodyRow,
                },
            }, 
            // @ts-expect-error ts-migrate(2322) FIXME: Type '(item: object) => { index: any; }' is not as... Remove this comment to see the full error message
            onRow: item => ({ index: item.zIndex }), pagination: false })));
}
SeriesSettings.propTypes = prop_types_1.EditorPropTypes;
