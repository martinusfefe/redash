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
exports.default = Renderer;
const lodash_1 = require("lodash");
const react_1 = __importStar(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const resizeObserver_1 = __importDefault(require("../../services/resizeObserver"));
const prop_types_1 = require("../../visualizations/prop-types");
const utils_1 = require("./utils");
require("./render.less");
function getCounterStyles(scale) {
    return {
        msTransform: `scale(${scale})`,
        MozTransform: `scale(${scale})`,
        WebkitTransform: `scale(${scale})`,
        transform: `scale(${scale})`,
    };
}
function getCounterScale(container) {
    const inner = container.firstChild;
    const scale = Math.min(container.offsetWidth / inner.offsetWidth, container.offsetHeight / inner.offsetHeight);
    return Number((0, lodash_1.isFinite)(scale) ? scale : 1).toFixed(2); // keep only two decimal places
}
function Renderer({ data, options, visualizationName }) {
    const [scale, setScale] = (0, react_1.useState)("1.00");
    const [container, setContainer] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        if (container) {
            const unwatch = (0, resizeObserver_1.default)(container, () => {
                setScale(getCounterScale(container));
            });
            return unwatch;
        }
    }, [container]);
    (0, react_1.useEffect)(() => {
        if (container) {
            // update scaling when options or data change (new formatting, values, etc.
            // may change inner container dimensions which will not be tracked by `resizeObserver`);
            setScale(getCounterScale(container));
        }
    }, [data, options, container]);
    const { 
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'showTrend' does not exist on type '{}'.
    showTrend, 
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'trendPositive' does not exist on type '{... Remove this comment to see the full error message
    trendPositive, 
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'counterValue' does not exist on type '{}... Remove this comment to see the full error message
    counterValue, 
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'counterValueTooltip' does not exist on t... Remove this comment to see the full error message
    counterValueTooltip, 
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'targetValue' does not exist on type '{}'... Remove this comment to see the full error message
    targetValue, 
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'targetValueTooltip' does not exist on ty... Remove this comment to see the full error message
    targetValueTooltip, 
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'counterLabel' does not exist on type '{}... Remove this comment to see the full error message
    counterLabel, } = (0, utils_1.getCounterData)(data.rows, options, visualizationName);
    return (react_1.default.createElement("div", { className: (0, classnames_1.default)("counter-visualization-container", {
            "trend-positive": showTrend && trendPositive,
            "trend-negative": showTrend && !trendPositive,
        }) },
        react_1.default.createElement("div", { className: "counter-visualization-content", ref: setContainer },
            react_1.default.createElement("div", { style: getCounterStyles(scale) },
                react_1.default.createElement("div", { className: "counter-visualization-value", title: counterValueTooltip }, counterValue),
                targetValue && (react_1.default.createElement("div", { className: "counter-visualization-target", title: targetValueTooltip },
                    "(",
                    targetValue,
                    ")")),
                react_1.default.createElement("div", { className: "counter-visualization-label" }, counterLabel)))));
}
Renderer.propTypes = prop_types_1.RendererPropTypes;
