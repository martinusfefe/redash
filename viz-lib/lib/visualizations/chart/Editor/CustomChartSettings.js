"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CustomChartSettings;
const lodash_1 = require("lodash");
const react_1 = __importDefault(require("react"));
const editor_1 = require("../../../components/visualizations/editor");
const prop_types_1 = require("../../../visualizations/prop-types");
const defaultCustomCode = (0, lodash_1.trimStart)(`
// Available variables are x, ys, element, and Plotly
// Type console.log(x, ys); for more info about x and ys
// To plot your graph call Plotly.plot(element, ...)
// Plotly examples and docs: https://plot.ly/javascript/
`);
function CustomChartSettings({ options, onOptionsChange }) {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.TextArea, { label: "Custom code", "data-test": "Chart.Custom.Code", rows: "10", defaultValue: (0, lodash_1.isNil)(options.customCode) ? defaultCustomCode : options.customCode, onChange: (event) => onOptionsChange({ customCode: event.target.value }) })),
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.Switch
            // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
            , { "data-test": "Chart.Custom.EnableConsoleLogs", 
                // @ts-expect-error ts-migrate(2322) FIXME: Type 'any' is not assignable to type 'never'.
                defaultChecked: options.enableConsoleLogs, 
                // @ts-expect-error ts-migrate(2322) FIXME: Type '(enableConsoleLogs: any) => any' is not assi... Remove this comment to see the full error message
                onChange: (enableConsoleLogs) => onOptionsChange({ enableConsoleLogs }) }, "Show errors in the console")),
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.Switch
            // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
            , { 
                // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
                id: "chart-editor-auto-update-custom-chart", "data-test": "Chart.Custom.AutoUpdate", 
                // @ts-expect-error ts-migrate(2322) FIXME: Type 'any' is not assignable to type 'never'.
                defaultChecked: options.autoRedraw, 
                // @ts-expect-error ts-migrate(2322) FIXME: Type '(autoRedraw: any) => any' is not assignable ... Remove this comment to see the full error message
                onChange: (autoRedraw) => onOptionsChange({ autoRedraw }) }, "Auto update graph"))));
}
CustomChartSettings.propTypes = prop_types_1.EditorPropTypes;
