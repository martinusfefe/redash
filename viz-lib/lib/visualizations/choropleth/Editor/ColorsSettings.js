"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ColorsSettings;
const react_1 = __importDefault(require("react"));
const use_debounce_1 = require("use-debounce");
const editor_1 = require("@/components/visualizations/editor");
const prop_types_1 = require("@/visualizations/prop-types");
const ColorPalette_1 = __importDefault(require("../ColorPalette"));
function ColorsSettings({ options, onOptionsChange }) {
    const [onOptionsChangeDebounced] = (0, use_debounce_1.useDebouncedCallback)(onOptionsChange, 200);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.Select, { layout: "horizontal", label: "Clustering Mode", "data-test": "Choropleth.Editor.ClusteringMode", defaultValue: options.clusteringMode, onChange: (clusteringMode) => onOptionsChange({ clusteringMode }) },
                react_1.default.createElement(editor_1.Select.Option, { value: "q", "data-test": "Choropleth.Editor.ClusteringMode.q" }, "quantile"),
                react_1.default.createElement(editor_1.Select.Option, { value: "e", "data-test": "Choropleth.Editor.ClusteringMode.e" }, "equidistant"),
                react_1.default.createElement(editor_1.Select.Option, { value: "k", "data-test": "Choropleth.Editor.ClusteringMode.k" }, "k-means"))),
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.InputNumber, { layout: "horizontal", label: "Steps", "data-test": "Choropleth.Editor.ColorSteps", min: 3, max: 11, defaultValue: options.steps, onChange: (steps) => onOptionsChangeDebounced({ steps }) })),
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.ColorPicker, { layout: "horizontal", label: "Min Color", interactive: true, presetColors: ColorPalette_1.default, placement: "topRight", color: options.colors.min, triggerProps: { "data-test": "Choropleth.Editor.Colors.Min" }, onChange: (min) => onOptionsChange({ colors: { min } }), 
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'Label' does not exist on type '({ classN... Remove this comment to see the full error message
                addonAfter: react_1.default.createElement(editor_1.ColorPicker.Label, { color: options.colors.min, presetColors: ColorPalette_1.default }) })),
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.ColorPicker, { layout: "horizontal", label: "Max Color", interactive: true, presetColors: ColorPalette_1.default, placement: "topRight", color: options.colors.max, triggerProps: { "data-test": "Choropleth.Editor.Colors.Max" }, onChange: (max) => onOptionsChange({ colors: { max } }), 
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'Label' does not exist on type '({ classN... Remove this comment to see the full error message
                addonAfter: react_1.default.createElement(editor_1.ColorPicker.Label, { color: options.colors.max, presetColors: ColorPalette_1.default }) })),
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.ColorPicker, { layout: "horizontal", label: "No Value Color", interactive: true, presetColors: ColorPalette_1.default, placement: "topRight", color: options.colors.noValue, triggerProps: { "data-test": "Choropleth.Editor.Colors.NoValue" }, onChange: (noValue) => onOptionsChange({ colors: { noValue } }), 
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'Label' does not exist on type '({ classN... Remove this comment to see the full error message
                addonAfter: react_1.default.createElement(editor_1.ColorPicker.Label, { color: options.colors.noValue, presetColors: ColorPalette_1.default }) })),
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.ColorPicker, { layout: "horizontal", label: "Background Color", interactive: true, presetColors: ColorPalette_1.default, placement: "topRight", color: options.colors.background, triggerProps: { "data-test": "Choropleth.Editor.Colors.Background" }, onChange: (background) => onOptionsChange({ colors: { background } }), 
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'Label' does not exist on type '({ classN... Remove this comment to see the full error message
                addonAfter: react_1.default.createElement(editor_1.ColorPicker.Label, { color: options.colors.background, presetColors: ColorPalette_1.default }) })),
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.ColorPicker, { layout: "horizontal", label: "Borders Color", interactive: true, presetColors: ColorPalette_1.default, placement: "topRight", color: options.colors.borders, triggerProps: { "data-test": "Choropleth.Editor.Colors.Borders" }, onChange: (borders) => onOptionsChange({ colors: { borders } }), 
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'Label' does not exist on type '({ classN... Remove this comment to see the full error message
                addonAfter: react_1.default.createElement(editor_1.ColorPicker.Label, { color: options.colors.borders, presetColors: ColorPalette_1.default }) }))));
}
ColorsSettings.propTypes = prop_types_1.EditorPropTypes;
