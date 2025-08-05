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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ChartTypeSelect;
const lodash_1 = require("lodash");
const react_1 = __importStar(require("react"));
const editor_1 = require("@/components/visualizations/editor");
const visualizationsSettings_1 = require("@/visualizations/visualizationsSettings");
const allChartTypes = [
    { type: "line", name: "Line", icon: "line-chart" },
    { type: "column", name: "Bar", icon: "bar-chart" },
    { type: "area", name: "Area", icon: "area-chart" },
    { type: "pie", name: "Pie", icon: "pie-chart" },
    { type: "scatter", name: "Scatter", icon: "circle-o" },
    { type: "bubble", name: "Bubble", icon: "circle-o" },
    { type: "heatmap", name: "Heatmap", icon: "th" },
    { type: "box", name: "Box", icon: "square-o" },
];
function ChartTypeSelect({ hiddenChartTypes, ...props }) {
    const chartTypes = (0, react_1.useMemo)(() => {
        const result = [...allChartTypes];
        if (visualizationsSettings_1.visualizationsSettings.allowCustomJSVisualizations) {
            result.push({ type: "custom", name: "Custom", icon: "code" });
        }
        if (hiddenChartTypes.length > 0) {
            return (0, lodash_1.filter)(result, ({ type }) => !(0, lodash_1.includes)(hiddenChartTypes, type));
        }
        return result;
    }, []);
    return (react_1.default.createElement(editor_1.Select, { ...props }, (0, lodash_1.map)(chartTypes, ({ type, name, icon }) => (
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message
    react_1.default.createElement(editor_1.Select.Option, { key: type, value: type, "data-test": `Chart.ChartType.${type}` },
        react_1.default.createElement("i", { className: `fa fa-${icon}`, style: { marginRight: 5 } }),
        name)))));
}
ChartTypeSelect.defaultProps = {
    hiddenChartTypes: [],
};
