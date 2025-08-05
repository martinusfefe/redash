"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Editor;
const react_1 = __importDefault(require("react"));
const editor_1 = require("../../components/visualizations/editor");
const prop_types_1 = require("../../visualizations/prop-types");
function Editor({ options, onOptionsChange }) {
    const onXAxisLabelChanged = (xAxisLabel) => {
        const newOptions = { ...options, xAxisLabel };
        onOptionsChange(newOptions);
    };
    const onYAxisLabelChanged = (yAxisLabel) => {
        const newOptions = { ...options, yAxisLabel };
        onOptionsChange(newOptions);
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.Input, { label: "X Axis Label", "data-test": "BoxPlot.XAxisLabel", value: options.xAxisLabel, onChange: (event) => onXAxisLabelChanged(event.target.value) })),
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.Input, { label: "Y Axis Label", "data-test": "BoxPlot.YAxisLabel", value: options.yAxisLabel, onChange: (event) => onYAxisLabelChanged(event.target.value) }))));
}
Editor.propTypes = prop_types_1.EditorPropTypes;
