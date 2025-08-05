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
exports.default = GeneralSettings;
const lodash_1 = require("lodash");
const react_1 = __importStar(require("react"));
const use_debounce_1 = require("use-debounce");
const editor_1 = require("@/components/visualizations/editor");
const prop_types_1 = require("@/visualizations/prop-types");
function GeneralSettings({ options, data, onOptionsChange }) {
    const columnNames = (0, react_1.useMemo)(() => (0, lodash_1.map)(data.columns, c => c.name), [data]);
    const [onOptionsChangeDebounced] = (0, use_debounce_1.useDebouncedCallback)(onOptionsChange, 200);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.Select, { layout: "horizontal", label: "Step Column", "data-test": "Funnel.StepColumn", placeholder: "Choose column...", defaultValue: options.stepCol.colName || undefined, onChange: (colName) => onOptionsChange({ stepCol: { colName: colName || null } }) }, (0, lodash_1.map)(columnNames, col => (
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message
            react_1.default.createElement(editor_1.Select.Option, { key: col, "data-test": `Funnel.StepColumn.${col}` }, col))))),
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.Input, { layout: "horizontal", label: "Step Column Title", "data-test": "Funnel.StepColumnTitle", defaultValue: options.stepCol.displayAs, onChange: (event) => onOptionsChangeDebounced({ stepCol: { displayAs: event.target.value } }) })),
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.Select, { layout: "horizontal", label: "Value Column", "data-test": "Funnel.ValueColumn", placeholder: "Choose column...", defaultValue: options.valueCol.colName || undefined, onChange: (colName) => onOptionsChange({ valueCol: { colName: colName || null } }) }, (0, lodash_1.map)(columnNames, col => (
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message
            react_1.default.createElement(editor_1.Select.Option, { key: col, "data-test": `Funnel.ValueColumn.${col}` }, col))))),
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.Input, { layout: "horizontal", label: "Value Column Title", "data-test": "Funnel.ValueColumnTitle", defaultValue: options.valueCol.displayAs, onChange: (event) => onOptionsChangeDebounced({ valueCol: { displayAs: event.target.value } }) })),
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.Checkbox, { "data-test": "Funnel.CustomSort", checked: !options.autoSort, onChange: event => onOptionsChange({ autoSort: !event.target.checked }) }, "Custom Sorting")),
        !options.autoSort && (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(editor_1.Section, null,
                react_1.default.createElement(editor_1.Select, { layout: "horizontal", label: "Sort Column", "data-test": "Funnel.SortColumn", allowClear: true, placeholder: "Choose column...", defaultValue: options.sortKeyCol.colName || undefined, onChange: (colName) => onOptionsChange({ sortKeyCol: { colName: colName || null } }) }, (0, lodash_1.map)(columnNames, col => (
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message
                react_1.default.createElement(editor_1.Select.Option, { key: col, "data-test": `Funnel.SortColumn.${col}` }, col))))),
            react_1.default.createElement(editor_1.Section, null,
                react_1.default.createElement(editor_1.Select, { layout: "horizontal", label: "Sort Order", "data-test": "Funnel.SortDirection", disabled: !options.sortKeyCol.colName, defaultValue: options.sortKeyCol.reverse ? "desc" : "asc", onChange: (order) => onOptionsChange({ sortKeyCol: { reverse: order === "desc" } }) },
                    react_1.default.createElement(editor_1.Select.Option, { value: "asc", "data-test": "Funnel.SortDirection.Ascending" }, "ascending"),
                    react_1.default.createElement(editor_1.Select.Option, { value: "desc", "data-test": "Funnel.SortDirection.Descending" }, "descending")))))));
}
GeneralSettings.propTypes = prop_types_1.EditorPropTypes;
