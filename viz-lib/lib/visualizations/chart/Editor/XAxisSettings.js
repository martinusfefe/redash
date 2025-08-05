"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = XAxisSettings;
const react_1 = __importDefault(require("react"));
const editor_1 = require("@/components/visualizations/editor");
const prop_types_1 = require("@/visualizations/prop-types");
const AxisSettings_1 = __importDefault(require("./AxisSettings"));
function XAxisSettings({ options, onOptionsChange }) {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(AxisSettings_1.default, { id: "XAxis", features: { autoDetectType: true }, options: options.xAxis, 
            // @ts-expect-error ts-migrate(2322) FIXME: Type '(xAxis: any) => any' is not assignable to ty... Remove this comment to see the full error message
            onChange: (xAxis) => onOptionsChange({ xAxis }) }),
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.Switch
            // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
            , { "data-test": "Chart.XAxis.Sort", 
                // @ts-expect-error ts-migrate(2322) FIXME: Type 'any' is not assignable to type 'never'.
                defaultChecked: options.sortX, 
                // @ts-expect-error ts-migrate(2322) FIXME: Type '(sortX: any) => any' is not assignable to ty... Remove this comment to see the full error message
                onChange: (sortX) => onOptionsChange({ sortX }) }, "Sort Values")),
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.Switch
            // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
            , { "data-test": "Chart.XAxis.Reverse", 
                // @ts-expect-error ts-migrate(2322) FIXME: Type 'any' is not assignable to type 'never'.
                defaultChecked: options.reverseX, 
                // @ts-expect-error ts-migrate(2322) FIXME: Type '(reverseX: any) => any' is not assignable to... Remove this comment to see the full error message
                onChange: (reverseX) => onOptionsChange({ reverseX }) }, "Reverse Order")),
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.Switch
            // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
            , { "data-test": "Chart.XAxis.ShowLabels", 
                // @ts-expect-error ts-migrate(2322) FIXME: Type 'any' is not assignable to type 'never'.
                defaultChecked: options.xAxis.labels.enabled, 
                // @ts-expect-error ts-migrate(2322) FIXME: Type '(enabled: any) => any' is not assignable to ... Remove this comment to see the full error message
                onChange: (enabled) => onOptionsChange({ xAxis: { labels: { enabled } } }) }, "Show Labels"))));
}
XAxisSettings.propTypes = prop_types_1.EditorPropTypes;
