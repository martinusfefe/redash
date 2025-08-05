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
exports.default = DefaultColorsSettings;
const lodash_1 = require("lodash");
const react_1 = __importStar(require("react"));
const table_1 = __importDefault(require("antd/lib/table"));
const ColorPicker_1 = __importDefault(require("../../../components/ColorPicker"));
const prop_types_1 = require("../../../visualizations/prop-types");
const ColorPalette_1 = require("../../../visualizations/ColorPalette");
const getChartData_1 = __importDefault(require("../getChartData"));
const editor_1 = require("../../../components/visualizations/editor");
function DefaultColorsSettings({ options, data, onOptionsChange }) {
    const colors = (0, react_1.useMemo)(() => ({
        Automatic: null,
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        ...ColorPalette_1.AllColorPalettes[options.color_scheme],
    }), [options.color_scheme]);
    const series = (0, react_1.useMemo)(() => (0, lodash_1.map)((0, getChartData_1.default)(data.rows, options), ({ name }) => ({
        key: name,
        color: (options.seriesOptions[name] || {}).color || null,
    })), [options, data]);
    const updateSeriesOption = (0, react_1.useCallback)((key, prop, value) => {
        onOptionsChange({
            seriesOptions: {
                [key]: {
                    [prop]: value,
                },
            },
        });
    }, [onOptionsChange]);
    const columns = [
        {
            title: "Series",
            dataIndex: "key",
        },
        {
            title: "Color",
            dataIndex: "color",
            width: "1%",
            render: (unused, item) => (react_1.default.createElement(ColorPicker_1.default
            // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
            , { "data-test": `Chart.Series.${item.key}.Color`, 
                // @ts-expect-error ts-migrate(2322) FIXME: Type 'boolean' is not assignable to type 'never'.
                interactive: true, 
                // @ts-expect-error ts-migrate(2322) FIXME: Type '{ "Indian Red": string; "Green 2": string; "... Remove this comment to see the full error message
                presetColors: colors, 
                // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
                placement: "topRight", 
                // @ts-expect-error ts-migrate(2322) FIXME: Type 'any' is not assignable to type 'never'.
                color: item.color, 
                // @ts-expect-error ts-migrate(2322) FIXME: Type '(value: any) => void' is not assignable to t... Remove this comment to see the full error message
                onChange: (value) => updateSeriesOption(item.key, "color", value), 
                // @ts-expect-error ts-migrate(2322) FIXME: Type 'Element' is not assignable to type 'never'.
                addonAfter: react_1.default.createElement(ColorPicker_1.default.Label, { color: item.color, presetColors: colors }) })),
        },
    ];
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.Select, { label: "Color Scheme", defaultValue: options.color_scheme, "data-test": "ColorScheme", onChange: (val) => onOptionsChange({ color_scheme: val }) }, Object.keys(ColorPalette_1.AllColorPalettes).map(option => (
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message
            react_1.default.createElement(editor_1.Select.Option, { "data-test": `ColorOption${option}`, key: option, value: option }, option))))),
        react_1.default.createElement(table_1.default, { showHeader: false, dataSource: series, columns: columns, pagination: false })));
}
DefaultColorsSettings.propTypes = prop_types_1.EditorPropTypes;
