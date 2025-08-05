"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = YAxisSettings;
const react_1 = __importDefault(require("react"));
const editor_1 = require("../../../components/visualizations/editor");
const prop_types_1 = require("../../../visualizations/prop-types");
const AxisSettings_1 = __importDefault(require("./AxisSettings"));
function YAxisSettings({ options, onOptionsChange }) {
    const [leftYAxis, rightYAxis] = options.yAxis;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(editor_1.Section.Title, null, !options.swappedAxes ? "Left Y Axis" : "X Axis"),
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(AxisSettings_1.default, { id: "LeftYAxis", features: { range: true }, options: leftYAxis, 
                // @ts-expect-error ts-migrate(2322) FIXME: Type '(axis: any) => any' is not assignable to typ... Remove this comment to see the full error message
                onChange: (axis) => onOptionsChange({ yAxis: [axis, rightYAxis] }) })),
        options.globalSeriesType !== "heatmap" && !options.swappedAxes && (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(editor_1.Section.Title, null, "Right Y Axis"),
            react_1.default.createElement(editor_1.Section, null,
                react_1.default.createElement(AxisSettings_1.default, { id: "RightYAxis", features: { range: true }, options: rightYAxis, 
                    // @ts-expect-error ts-migrate(2322) FIXME: Type '(axis: any) => any' is not assignable to typ... Remove this comment to see the full error message
                    onChange: (axis) => onOptionsChange({ yAxis: [leftYAxis, axis] }) })),
            react_1.default.createElement(editor_1.Section, null,
                react_1.default.createElement(editor_1.Switch
                // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
                , { 
                    // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
                    id: "chart-editor-y-axis-align-at-zero", "data-test": "Chart.YAxis.AlignAtZero", 
                    // @ts-expect-error ts-migrate(2322) FIXME: Type 'any' is not assignable to type 'never'.
                    defaultChecked: options.alignYAxesAtZero, 
                    // @ts-expect-error ts-migrate(2322) FIXME: Type '(alignYAxesAtZero: any) => any' is not assig... Remove this comment to see the full error message
                    onChange: (alignYAxesAtZero) => onOptionsChange({ alignYAxesAtZero }) }, "Align Y Axes at Zero")))),
        options.globalSeriesType === "heatmap" && (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(editor_1.Section, null,
                react_1.default.createElement(editor_1.Switch
                // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
                , { 
                    // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
                    id: "chart-editor-y-axis-sort", "data-test": "Chart.LeftYAxis.Sort", 
                    // @ts-expect-error ts-migrate(2322) FIXME: Type 'any' is not assignable to type 'never'.
                    defaultChecked: options.sortY, 
                    // @ts-expect-error ts-migrate(2322) FIXME: Type '(sortY: any) => any' is not assignable to ty... Remove this comment to see the full error message
                    onChange: (sortY) => onOptionsChange({ sortY }) }, "Sort Values")),
            react_1.default.createElement(editor_1.Section, null,
                react_1.default.createElement(editor_1.Switch
                // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
                , { 
                    // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
                    id: "chart-editor-y-axis-reverse", "data-test": "Chart.LeftYAxis.Reverse", 
                    // @ts-expect-error ts-migrate(2322) FIXME: Type 'any' is not assignable to type 'never'.
                    defaultChecked: options.reverseY, 
                    // @ts-expect-error ts-migrate(2322) FIXME: Type '(reverseY: any) => any' is not assignable to... Remove this comment to see the full error message
                    onChange: (reverseY) => onOptionsChange({ reverseY }) }, "Reverse Order"))))));
}
YAxisSettings.propTypes = prop_types_1.EditorPropTypes;
