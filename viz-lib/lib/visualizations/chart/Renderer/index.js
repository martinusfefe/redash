"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Renderer;
const react_1 = __importDefault(require("react"));
const prop_types_1 = require("@/visualizations/prop-types");
const PlotlyChart_1 = __importDefault(require("./PlotlyChart"));
const CustomPlotlyChart_1 = __importDefault(require("./CustomPlotlyChart"));
const visualizationsSettings_1 = require("@/visualizations/visualizationsSettings");
require("./renderer.less");
function Renderer({ options, ...props }) {
    if (options.globalSeriesType === "custom" && visualizationsSettings_1.visualizationsSettings.allowCustomJSVisualizations) {
        return react_1.default.createElement(CustomPlotlyChart_1.default, { options: options, ...props });
    }
    return react_1.default.createElement(PlotlyChart_1.default, { options: options, ...props });
}
Renderer.propTypes = prop_types_1.RendererPropTypes;
