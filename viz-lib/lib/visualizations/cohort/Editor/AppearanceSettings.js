"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AppearanceSettings;
const react_1 = __importDefault(require("react"));
const use_debounce_1 = require("use-debounce");
const editor_1 = require("@/components/visualizations/editor");
const prop_types_1 = require("@/visualizations/prop-types");
function AppearanceSettings({ options, onOptionsChange }) {
    const [debouncedOnOptionsChange] = (0, use_debounce_1.useDebouncedCallback)(onOptionsChange, 200);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.Input, { layout: "horizontal", label: "Time Column Title", defaultValue: options.timeColumnTitle, onChange: (e) => debouncedOnOptionsChange({ timeColumnTitle: e.target.value }) })),
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.Input, { layout: "horizontal", label: "People Column Title", defaultValue: options.peopleColumnTitle, onChange: (e) => debouncedOnOptionsChange({ peopleColumnTitle: e.target.value }) })),
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.Input, { layout: "horizontal", label: react_1.default.createElement(react_1.default.Fragment, null,
                    "Stage Column Title",
                    react_1.default.createElement(editor_1.ContextHelp, { placement: "topRight", arrowPointAtCenter: true },
                        react_1.default.createElement("div", null,
                            "Use ",
                            react_1.default.createElement("code", null, "{{ @ }}"),
                            " to insert a stage number"))), defaultValue: options.stageColumnTitle, onChange: (e) => debouncedOnOptionsChange({ stageColumnTitle: e.target.value }) })),
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.Input, { layout: "horizontal", label: react_1.default.createElement(react_1.default.Fragment, null,
                    "Number Values Format",
                    react_1.default.createElement(editor_1.ContextHelp.NumberFormatSpecs, null)), defaultValue: options.numberFormat, onChange: (e) => debouncedOnOptionsChange({ numberFormat: e.target.value }) })),
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.Input, { layout: "horizontal", label: react_1.default.createElement(react_1.default.Fragment, null,
                    "Percent Values Format",
                    react_1.default.createElement(editor_1.ContextHelp.NumberFormatSpecs, null)), defaultValue: options.percentFormat, onChange: (e) => debouncedOnOptionsChange({ percentFormat: e.target.value }) })),
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.Input, { layout: "horizontal", label: "No Value Placeholder", defaultValue: options.noValuePlaceholder, onChange: (e) => debouncedOnOptionsChange({ noValuePlaceholder: e.target.value }) })),
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.Checkbox, { defaultChecked: options.showTooltips, onChange: event => onOptionsChange({ showTooltips: event.target.checked }) }, "Show Tooltips")),
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.Checkbox, { defaultChecked: options.percentValues, onChange: event => onOptionsChange({ percentValues: event.target.checked }) }, "Normalize Values to Percentage"))));
}
AppearanceSettings.propTypes = prop_types_1.EditorPropTypes;
