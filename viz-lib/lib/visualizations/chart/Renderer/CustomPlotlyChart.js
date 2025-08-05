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
exports.default = CustomPlotlyChart;
const react_1 = __importStar(require("react"));
const prop_types_1 = require("../../../visualizations/prop-types");
const resizeObserver_1 = __importDefault(require("../../../services/resizeObserver"));
const getChartData_1 = __importDefault(require("../getChartData"));
const plotly_1 = require("../plotly");
function CustomPlotlyChart({ options, data }) {
    const [container, setContainer] = (0, react_1.useState)(null);
    const renderCustomChart = (0, react_1.useMemo)(() => (0, plotly_1.createCustomChartRenderer)(options.customCode, options.enableConsoleLogs), [
        options.customCode,
        options.enableConsoleLogs,
    ]);
    const plotlyData = (0, react_1.useMemo)(() => (0, plotly_1.prepareCustomChartData)((0, getChartData_1.default)(data.rows, options)), [options, data]);
    (0, react_1.useEffect)(() => {
        if (container) {
            const unwatch = (0, resizeObserver_1.default)(container, () => {
                // Clear existing data with blank data for succeeding codeCall adds data to existing plot.
                // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'null' is not assignable to param... Remove this comment to see the full error message
                plotly_1.Plotly.purge(container);
                renderCustomChart(plotlyData.x, plotlyData.ys, container, plotly_1.Plotly);
            });
            return unwatch;
        }
    }, [container, plotlyData, renderCustomChart]);
    // Cleanup when component destroyed
    (0, react_1.useEffect)(() => {
        if (container) {
            // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'null' is not assignable to param... Remove this comment to see the full error message
            return () => plotly_1.Plotly.purge(container);
        }
    }, [container]);
    // @ts-expect-error ts-migrate(2322) FIXME: Type 'Dispatch<SetStateAction<null>>' is not assig... Remove this comment to see the full error message
    return react_1.default.createElement("div", { className: "chart-visualization-container", ref: setContainer });
}
CustomPlotlyChart.propTypes = prop_types_1.RendererPropTypes;
