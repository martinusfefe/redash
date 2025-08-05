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
const react_1 = __importStar(require("react"));
const lodash_1 = require("lodash");
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
const PivotTableUI_1 = __importDefault(require("react-pivottable/PivotTableUI"));
const prop_types_1 = require("../../visualizations/prop-types");
const utils_1 = require("../../lib/utils");
require("react-pivottable/pivottable.css");
require("./renderer.less");
const VALID_OPTIONS = [
    "rows",
    "cols",
    "vals",
    "aggregatorName",
    "valueFilter",
    "sorters",
    "rowOrder",
    "colOrder",
    "derivedAttributes",
    "rendererName",
    "hiddenAttributes",
    "hiddenFromAggregators",
    "hiddenFromDragDrop",
    "menuLimit",
    "unusedOrientationCutoff",
    "controls",
    "rendererOptions",
];
function formatRows({ rows, columns }) {
    return (0, lodash_1.map)(rows, row => (0, lodash_1.mapValues)(row, (value, key) => (0, utils_1.formatColumnValue)(value, (0, lodash_1.find)(columns, { name: key }).type)));
}
function Renderer({ data, options, onOptionsChange }) {
    const [config, setConfig] = (0, react_1.useState)({ ...options });
    const dataRows = (0, react_1.useMemo)(() => formatRows(data), [data]);
    (0, react_1.useEffect)(() => {
        setConfig({ ...options });
    }, [options]);
    const onChange = (updatedOptions) => {
        const validOptions = (0, lodash_1.pick)(updatedOptions, VALID_OPTIONS);
        setConfig({ ...validOptions });
        onOptionsChange(validOptions);
    };
    // Legacy behavior: hideControls when controls.enabled is true
    const hideControls = (0, lodash_1.get)(options, "controls.enabled");
    const hideRowTotals = !(0, lodash_1.get)(options, "rendererOptions.table.rowTotals");
    const hideColumnTotals = !(0, lodash_1.get)(options, "rendererOptions.table.colTotals");
    return (react_1.default.createElement("div", { className: "pivot-table-visualization-container", "data-hide-controls": hideControls || null, "data-hide-row-totals": hideRowTotals || null, "data-hide-column-totals": hideColumnTotals || null, "data-test": "PivotTableVisualization" },
        react_1.default.createElement(PivotTableUI_1.default, { ...(0, lodash_1.pick)(config, VALID_OPTIONS), data: dataRows, onChange: onChange })));
}
Renderer.propTypes = prop_types_1.RendererPropTypes;
Renderer.defaultProps = { onOptionsChange: () => { } };
