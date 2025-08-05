"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ColumnMappingSelect;
const lodash_1 = require("lodash");
const react_1 = __importDefault(require("react"));
const editor_1 = require("@/components/visualizations/editor");
const MappingTypes = {
    x: { label: "X Column" },
    y: { label: "Y Columns", multiple: true },
    series: { label: "Group by" },
    yError: { label: "Errors column" },
    size: { label: "Bubble Size Column" },
    zVal: { label: "Color Column" },
};
const SwappedMappingTypes = {
    ...MappingTypes,
    x: { label: "Y Column" },
    y: { label: "X Columns", multiple: true },
};
function ColumnMappingSelect({ value, availableColumns, type, onChange, areAxesSwapped }) {
    const options = (0, lodash_1.sortBy)((0, lodash_1.filter)((0, lodash_1.uniq)((0, lodash_1.flatten)([availableColumns, value])), v => (0, lodash_1.isString)(v) && v !== ""));
    // this swaps the ui, as the data will be swapped on render
    const { label, multiple } = !areAxesSwapped ? MappingTypes[type] : SwappedMappingTypes[type];
    return (
    // @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message
    react_1.default.createElement(editor_1.Section, null,
        react_1.default.createElement(editor_1.Select, { label: label, "data-test": `Chart.ColumnMapping.${type}`, mode: multiple ? "multiple" : "default", allowClear: true, showSearch: true, placeholder: multiple ? "Choose columns..." : "Choose column...", value: value || undefined, 
            // @ts-expect-error ts-migrate(2349) FIXME: This expression is not callable.
            onChange: (column) => onChange(column || null, type) }, (0, lodash_1.map)(options, c => (
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message
        react_1.default.createElement(editor_1.Select.Option, { key: c, value: c, "data-test": `Chart.ColumnMapping.${type}.${c}` }, c))))));
}
ColumnMappingSelect.defaultProps = {
    value: null,
    availableColumns: [],
    type: null,
    onChange: () => { },
};
ColumnMappingSelect.MappingTypes = MappingTypes;
