"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DataLabelsSettings;
const lodash_1 = require("lodash");
const react_1 = __importDefault(require("react"));
const use_debounce_1 = require("use-debounce");
const editor_1 = require("@/components/visualizations/editor");
const prop_types_1 = require("@/visualizations/prop-types");
function DataLabelsSettings({ options, onOptionsChange }) {
    const isShowDataLabelsAvailable = (0, lodash_1.includes)(["line", "area", "column", "scatter", "pie", "heatmap"], options.globalSeriesType);
    const [debouncedOnOptionsChange] = (0, use_debounce_1.useDebouncedCallback)(onOptionsChange, 200);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        isShowDataLabelsAvailable && (
        // @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.Checkbox, { "data-test": "Chart.DataLabels.ShowDataLabels", defaultChecked: options.showDataLabels, onChange: event => onOptionsChange({ showDataLabels: event.target.checked }) }, "Show Data Labels"))),
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.Input, { label: react_1.default.createElement(react_1.default.Fragment, null,
                    "Number Values Format",
                    react_1.default.createElement(editor_1.ContextHelp.NumberFormatSpecs, null)), "data-test": "Chart.DataLabels.NumberFormat", defaultValue: options.numberFormat, onChange: (e) => debouncedOnOptionsChange({ numberFormat: e.target.value }) })),
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.Input, { label: react_1.default.createElement(react_1.default.Fragment, null,
                    "Percent Values Format",
                    react_1.default.createElement(editor_1.ContextHelp.NumberFormatSpecs, null)), "data-test": "Chart.DataLabels.PercentFormat", defaultValue: options.percentFormat, onChange: (e) => debouncedOnOptionsChange({ percentFormat: e.target.value }) })),
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.Input, { label: react_1.default.createElement(react_1.default.Fragment, null,
                    "Date/Time Values Format",
                    react_1.default.createElement(editor_1.ContextHelp.DateTimeFormatSpecs, null)), "data-test": "Chart.DataLabels.DateTimeFormat", defaultValue: options.dateTimeFormat, onChange: (e) => debouncedOnOptionsChange({ dateTimeFormat: e.target.value }) })),
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.Input, { label: react_1.default.createElement(react_1.default.Fragment, null,
                    "Data Labels",
                    react_1.default.createElement(editor_1.ContextHelp, { placement: "topRight", arrowPointAtCenter: true },
                        react_1.default.createElement("div", { style: { paddingBottom: 5 } }, "Use special names to access additional properties:"),
                        react_1.default.createElement("div", null,
                            react_1.default.createElement("code", null, "{{ @@name }}"),
                            " series name;"),
                        react_1.default.createElement("div", null,
                            react_1.default.createElement("code", null, "{{ @@x }}"),
                            " x-value;"),
                        react_1.default.createElement("div", null,
                            react_1.default.createElement("code", null, "{{ @@y }}"),
                            " y-value;"),
                        react_1.default.createElement("div", null,
                            react_1.default.createElement("code", null, "{{ @@yPercent }}"),
                            " relative y-value;"),
                        react_1.default.createElement("div", null,
                            react_1.default.createElement("code", null, "{{ @@yError }}"),
                            " y deviation;"),
                        react_1.default.createElement("div", null,
                            react_1.default.createElement("code", null, "{{ @@size }}"),
                            " bubble size;"),
                        react_1.default.createElement("div", { style: { paddingTop: 5 } },
                            "Also, all query result columns can be referenced",
                            react_1.default.createElement("br", null),
                            "using",
                            react_1.default.createElement("code", { style: { whiteSpace: "nowrap" } }, "{{ column_name }}"),
                            " syntax."))), "data-test": "Chart.DataLabels.TextFormat", placeholder: "(auto)", defaultValue: options.textFormat, onChange: (e) => debouncedOnOptionsChange({ textFormat: e.target.value }) }))));
}
DataLabelsSettings.propTypes = prop_types_1.EditorPropTypes;
