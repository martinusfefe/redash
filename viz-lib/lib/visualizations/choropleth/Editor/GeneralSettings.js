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
exports.default = GeneralSettings;
const lodash_1 = require("lodash");
const react_1 = __importStar(require("react"));
const Grid = __importStar(require("antd/lib/grid"));
const prop_types_1 = require("@/visualizations/prop-types");
const editor_1 = require("@/components/visualizations/editor");
const visualizationsSettings_1 = require("@/visualizations/visualizationsSettings");
const useLoadGeoJson_1 = __importDefault(require("../hooks/useLoadGeoJson"));
const utils_1 = require("./utils");
function GeneralSettings({ options, data, onOptionsChange }) {
    const [geoJson, isLoadingGeoJson] = (0, useLoadGeoJson_1.default)(options.mapType);
    const geoJsonFields = (0, react_1.useMemo)(() => (0, utils_1.getGeoJsonFields)(geoJson), [geoJson]);
    // While geoJson is loading - show last selected field in select
    const targetFields = isLoadingGeoJson ? (0, lodash_1.filter)([options.targetField], lodash_1.isString) : geoJsonFields;
    const fieldNames = (0, lodash_1.get)(visualizationsSettings_1.visualizationsSettings, `choroplethAvailableMaps.${options.mapType}.fieldNames`, {});
    const handleMapChange = (0, react_1.useCallback)(mapType => {
        onOptionsChange({ mapType: mapType || null });
    }, [onOptionsChange]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.Select, { label: "Map", "data-test": "Choropleth.Editor.MapType", defaultValue: options.mapType, onChange: handleMapChange }, (0, lodash_1.map)(visualizationsSettings_1.visualizationsSettings.choroplethAvailableMaps, (_, mapType) => (
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message
            react_1.default.createElement(editor_1.Select.Option, { key: mapType, "data-test": `Choropleth.Editor.MapType.${mapType}` }, (0, lodash_1.get)(visualizationsSettings_1.visualizationsSettings, `choroplethAvailableMaps.${mapType}.name`, mapType)))))),
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(Grid.Row, { gutter: 15 },
                react_1.default.createElement(Grid.Col, { span: 12 },
                    react_1.default.createElement(editor_1.Select, { label: "Key Column", className: "w-100", "data-test": "Choropleth.Editor.KeyColumn", disabled: data.columns.length === 0, defaultValue: options.keyColumn, onChange: (keyColumn) => onOptionsChange({ keyColumn }) }, (0, lodash_1.map)(data.columns, ({ name }) => (
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message
                    react_1.default.createElement(editor_1.Select.Option, { key: name, "data-test": `Choropleth.Editor.KeyColumn.${name}` }, name))))),
                react_1.default.createElement(Grid.Col, { span: 12 },
                    react_1.default.createElement(editor_1.Select, { label: "Target Field", className: "w-100", "data-test": "Choropleth.Editor.TargetField", disabled: isLoadingGeoJson || targetFields.length === 0, loading: isLoadingGeoJson, value: options.targetField, onChange: (targetField) => onOptionsChange({ targetField }) }, (0, lodash_1.map)(targetFields, field => (
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message
                    react_1.default.createElement(editor_1.Select.Option, { key: field, "data-test": `Choropleth.Editor.TargetField.${field}` }, fieldNames[field] || field))))))),
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.Select, { label: "Value Column", "data-test": "Choropleth.Editor.ValueColumn", disabled: data.columns.length === 0, defaultValue: options.valueColumn, onChange: (valueColumn) => onOptionsChange({ valueColumn }) }, (0, lodash_1.map)(data.columns, ({ name }) => (
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message
            react_1.default.createElement(editor_1.Select.Option, { key: name, "data-test": `Choropleth.Editor.ValueColumn.${name}` }, name)))))));
}
GeneralSettings.propTypes = prop_types_1.EditorPropTypes;
