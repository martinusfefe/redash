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
exports.default = PlotlyChart;
const react_1 = __importStar(require("react"));
const use_media_1 = __importDefault(require("use-media"));
const ErrorBoundary_1 = require("@/components/ErrorBoundary");
const prop_types_1 = require("@/visualizations/prop-types");
const visualizationsSettings_1 = require("@/visualizations/visualizationsSettings");
const getChartData_1 = __importDefault(require("../getChartData"));
const initChart_1 = __importDefault(require("./initChart"));
function PlotlyChart({ options, data }) {
    const [container, setContainer] = (0, react_1.useState)(null);
    const [chart, setChart] = (0, react_1.useState)(null);
    const errorHandler = (0, react_1.useContext)(ErrorBoundary_1.ErrorBoundaryContext);
    const errorHandlerRef = (0, react_1.useRef)();
    // @ts-expect-error ts-migrate(2322) FIXME: Type '{ handleError: (error: any) => void; reset: ... Remove this comment to see the full error message
    errorHandlerRef.current = errorHandler;
    const isMobile = (0, use_media_1.default)({ maxWidth: 768 });
    const isMobileRef = (0, react_1.useRef)();
    // @ts-expect-error ts-migrate(2322) FIXME: Type 'boolean' is not assignable to type 'undefine... Remove this comment to see the full error message
    isMobileRef.current = isMobile;
    (0, react_1.useEffect)(() => {
        if (container) {
            let isDestroyed = false;
            const chartData = (0, getChartData_1.default)(data.rows, options);
            const _chart = (0, initChart_1.default)(container, options, chartData, visualizationsSettings_1.visualizationsSettings, (error) => {
                // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
                errorHandlerRef.current.handleError(error);
            });
            _chart.initialized.then(() => {
                if (!isDestroyed) {
                    setChart(_chart);
                }
            });
            return () => {
                isDestroyed = true;
                _chart.destroy();
            };
        }
    }, [options, data, container]);
    (0, react_1.useEffect)(() => {
        if (chart) {
            // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
            chart.setZoomEnabled(!isMobile);
        }
    }, [chart, isMobile]);
    // @ts-expect-error ts-migrate(2322) FIXME: Type 'Dispatch<SetStateAction<null>>' is not assig... Remove this comment to see the full error message
    return react_1.default.createElement("div", { className: "chart-visualization-container", ref: setContainer });
}
PlotlyChart.propTypes = prop_types_1.RendererPropTypes;
