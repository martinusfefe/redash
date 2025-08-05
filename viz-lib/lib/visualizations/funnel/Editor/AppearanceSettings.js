"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AppearanceSettings;
const react_1 = __importDefault(require("react"));
const use_debounce_1 = require("use-debounce");
const editor_1 = require("../../../components/visualizations/editor");
const prop_types_1 = require("../../../visualizations/prop-types");
function AppearanceSettings({ options, onOptionsChange }) {
    const [onOptionsChangeDebounced] = (0, use_debounce_1.useDebouncedCallback)(onOptionsChange, 200);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.Input, { layout: "horizontal", label: react_1.default.createElement(react_1.default.Fragment, null,
                    "Number Values Format",
                    react_1.default.createElement(editor_1.ContextHelp.NumberFormatSpecs, null)), "data-test": "Funnel.NumberFormat", defaultValue: options.numberFormat, onChange: (event) => onOptionsChangeDebounced({ numberFormat: event.target.value }) })),
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.Input, { layout: "horizontal", label: react_1.default.createElement(react_1.default.Fragment, null,
                    "Percent Values Format",
                    react_1.default.createElement(editor_1.ContextHelp.NumberFormatSpecs, null)), "data-test": "Funnel.PercentFormat", defaultValue: options.percentFormat, onChange: (event) => onOptionsChangeDebounced({ percentFormat: event.target.value }) })),
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.InputNumber, { layout: "horizontal", label: "Items Count Limit", "data-test": "Funnel.ItemsLimit", min: 2, defaultValue: options.itemsLimit, onChange: (itemsLimit) => onOptionsChangeDebounced({ itemsLimit }) })),
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.InputNumber, { layout: "horizontal", label: "Min Percent Value", "data-test": "Funnel.PercentRangeMin", min: 0, defaultValue: options.percentValuesRange.min, onChange: (min) => onOptionsChangeDebounced({ percentValuesRange: { min } }) })),
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.InputNumber, { layout: "horizontal", label: "Max Percent Value", "data-test": "Funnel.PercentRangeMax", min: 0, defaultValue: options.percentValuesRange.max, onChange: (max) => onOptionsChangeDebounced({ percentValuesRange: { max } }) }))));
}
AppearanceSettings.propTypes = prop_types_1.EditorPropTypes;
