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
const editor_1 = require("../../../components/visualizations/editor");
const prop_types_1 = require("../../../visualizations/prop-types");
function getColumns(column, unusedColumns) {
    return (0, lodash_1.filter)([column, ...unusedColumns], v => !(0, lodash_1.isNil)(v));
}
function GeneralSettings({ options, data, onOptionsChange }) {
    const unusedColumns = (0, react_1.useMemo)(() => (0, lodash_1.difference)((0, lodash_1.map)(data.columns, c => c.name), [options.latColName, options.lonColName, options.classify]), [data, options.latColName, options.lonColName, options.classify]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.Select, { label: "Latitude Column Name", "data-test": "Map.Editor.LatitudeColumnName", value: options.latColName, onChange: (latColName) => onOptionsChange({ latColName }) }, (0, lodash_1.map)(getColumns(options.latColName, unusedColumns), col => (
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message
            react_1.default.createElement(editor_1.Select.Option, { key: col, "data-test": "Map.Editor.LatitudeColumnName." + col }, col))))),
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.Select, { label: "Longitude Column Name", "data-test": "Map.Editor.LongitudeColumnName", value: options.lonColName, onChange: (lonColName) => onOptionsChange({ lonColName }) }, (0, lodash_1.map)(getColumns(options.lonColName, unusedColumns), col => (
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message
            react_1.default.createElement(editor_1.Select.Option, { key: col, "data-test": "Map.Editor.LongitudeColumnName." + col }, col))))),
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.Select, { label: "Group By", "data-test": "Map.Editor.GroupBy", allowClear: true, placeholder: "none", value: options.classify || undefined, onChange: (column) => onOptionsChange({ classify: column || null }) }, (0, lodash_1.map)(getColumns(options.classify, unusedColumns), col => (
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message
            react_1.default.createElement(editor_1.Select.Option, { key: col, "data-test": "Map.Editor.GroupBy." + col }, col)))))));
}
GeneralSettings.propTypes = prop_types_1.EditorPropTypes;
