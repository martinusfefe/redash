"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = HeatmapColorsSettings;
const lodash_1 = require("lodash");
const react_1 = __importDefault(require("react"));
const editor_1 = require("../../../components/visualizations/editor");
const prop_types_1 = require("../../../visualizations/prop-types");
const ColorPalette_1 = __importDefault(require("../../../visualizations/ColorPalette"));
const ColorSchemes = [
    "Blackbody",
    "Bluered",
    "Blues",
    "Earth",
    "Electric",
    "Greens",
    "Greys",
    "Hot",
    "Jet",
    "Picnic",
    "Portland",
    "Rainbow",
    "RdBu",
    "Reds",
    "Viridis",
    "YlGnBu",
    "YlOrRd",
    "Custom...",
];
function HeatmapColorsSettings({ options, onOptionsChange }) {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.Select, { label: "Color Scheme", "data-test": "Chart.Colors.Heatmap.ColorScheme", placeholder: "Choose Color Scheme...", allowClear: true, value: options.colorScheme || undefined, onChange: (value) => onOptionsChange({ colorScheme: value || null }) }, (0, lodash_1.map)(ColorSchemes, scheme => (
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message
            react_1.default.createElement(editor_1.Select.Option, { key: scheme, value: scheme, "data-test": `Chart.Colors.Heatmap.ColorScheme.${scheme}` }, scheme))))),
        options.colorScheme === "Custom..." && (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(editor_1.Section, null,
                react_1.default.createElement(editor_1.ColorPicker, { layout: "horizontal", label: "Min Color:", "data-test": "Chart.Colors.Heatmap.MinColor", interactive: true, placement: "topLeft", presetColors: ColorPalette_1.default, color: options.heatMinColor, onChange: (heatMinColor) => onOptionsChange({ heatMinColor }), 
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'Label' does not exist on type '({ classN... Remove this comment to see the full error message
                    addonAfter: react_1.default.createElement(editor_1.ColorPicker.Label, { color: options.heatMinColor, presetColors: ColorPalette_1.default }) })),
            react_1.default.createElement(editor_1.Section, null,
                react_1.default.createElement(editor_1.ColorPicker, { layout: "horizontal", label: "Max Color:", "data-test": "Chart.Colors.Heatmap.MaxColor", interactive: true, placement: "topRight", presetColors: ColorPalette_1.default, color: options.heatMaxColor, onChange: (heatMaxColor) => onOptionsChange({ heatMaxColor }), 
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'Label' does not exist on type '({ classN... Remove this comment to see the full error message
                    addonAfter: react_1.default.createElement(editor_1.ColorPicker.Label, { color: options.heatMaxColor, presetColors: ColorPalette_1.default }) }))))));
}
HeatmapColorsSettings.propTypes = prop_types_1.EditorPropTypes;
