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
const table_1 = __importDefault(require("antd/lib/table"));
const tooltip_1 = __importDefault(require("antd/lib/tooltip"));
const prop_types_1 = require("../../../visualizations/prop-types");
const ColorPalette_1 = __importDefault(require("../../../visualizations/ColorPalette"));
const value_format_1 = require("../../../lib/value-format");
const prepareData_1 = __importDefault(require("./prepareData"));
const FunnelBar_1 = __importDefault(require("./FunnelBar"));
require("./index.less");
function generateRowKeyPrefix() {
    return Math.trunc(Math.random() * Number.MAX_SAFE_INTEGER).toString(36) + ":";
}
function Renderer({ data, options }) {
    const funnelData = (0, react_1.useMemo)(() => (0, prepareData_1.default)(data.rows, options), [data, options]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const rowKeyPrefix = (0, react_1.useMemo)(() => generateRowKeyPrefix(), [funnelData]);
    const formatValue = (0, react_1.useMemo)(() => (0, value_format_1.createNumberFormatter)(options.numberFormat), [options.numberFormat]);
    const formatPercentValue = (0, react_1.useMemo)(() => {
        const format = (0, value_format_1.createNumberFormatter)(options.percentFormat);
        return (value) => {
            if (value < options.percentValuesRange.min) {
                return `<${format(options.percentValuesRange.min)}`;
            }
            if (value > options.percentValuesRange.max) {
                return `>${format(options.percentValuesRange.max)}`;
            }
            return format(value);
        };
    }, [options.percentFormat, options.percentValuesRange]);
    const columns = (0, react_1.useMemo)(() => {
        if (funnelData.length === 0) {
            return [];
        }
        // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
        const maxToPrevious = (0, lodash_1.maxBy)(funnelData, d => (isFinite(d.pctPrevious) ? d.pctPrevious : 0)).pctPrevious;
        return [
            {
                title: options.stepCol.displayAs,
                dataIndex: "step",
                width: "25%",
                className: "text-ellipsis",
                render: (text) => (react_1.default.createElement(tooltip_1.default, { title: text, mouseEnterDelay: 0, mouseLeaveDelay: 0 }, text)),
            },
            {
                title: options.valueCol.displayAs,
                dataIndex: "value",
                width: "45%",
                align: "center",
                render: (value, item) => (
                // @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message
                react_1.default.createElement(FunnelBar_1.default, { align: "center", color: ColorPalette_1.default.Cyan, value: item.pctMax }, formatValue(value))),
            },
            {
                title: "% Max",
                dataIndex: "pctMax",
                width: "15%",
                align: "center",
                render: (value) => formatPercentValue(value),
            },
            {
                title: "% Previous",
                dataIndex: "pctPrevious",
                width: "15%",
                align: "center",
                render: (value) => (
                // @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message
                react_1.default.createElement(FunnelBar_1.default, { className: "funnel-percent-column", value: (value / maxToPrevious) * 100.0 }, formatPercentValue(value))),
            },
        ];
    }, [options.stepCol.displayAs, options.valueCol.displayAs, funnelData, formatValue, formatPercentValue]);
    if (funnelData.length === 0) {
        return null;
    }
    return (react_1.default.createElement("div", { className: "funnel-visualization-container" },
        react_1.default.createElement(table_1.default
        // @ts-expect-error ts-migrate(2322) FIXME: Type '({ title: any; dataIndex: string; width: str... Remove this comment to see the full error message
        , { 
            // @ts-expect-error ts-migrate(2322) FIXME: Type '({ title: any; dataIndex: string; width: str... Remove this comment to see the full error message
            columns: columns, dataSource: funnelData, rowKey: (record, index) => rowKeyPrefix + index, pagination: false })));
}
Renderer.propTypes = prop_types_1.RendererPropTypes;
