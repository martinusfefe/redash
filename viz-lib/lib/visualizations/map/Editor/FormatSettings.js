"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FormatSettings;
const react_1 = __importDefault(require("react"));
const use_debounce_1 = require("use-debounce");
const editor_1 = require("../../../components/visualizations/editor");
const prop_types_1 = require("../../../visualizations/prop-types");
function TemplateFormatHint() {
    // eslint-disable-line react/prop-types
    return (
    // @ts-expect-error ts-migrate(2746) FIXME: This JSX tag's 'children' prop expects a single ch... Remove this comment to see the full error message
    react_1.default.createElement(editor_1.ContextHelp, { placement: "topLeft", arrowPointAtCenter: true },
        react_1.default.createElement("div", { style: { paddingBottom: 5 } },
            "All query result columns can be referenced using ",
            react_1.default.createElement("code", null, "{{ column_name }}"),
            " syntax."),
        react_1.default.createElement("div", { style: { paddingBottom: 5 } }, "Leave this field empty to use default template.")));
}
function FormatSettings({ options, onOptionsChange }) {
    const [onOptionsChangeDebounced] = (0, use_debounce_1.useDebouncedCallback)(onOptionsChange, 200);
    const templateFormatHint = react_1.default.createElement(TemplateFormatHint, null);
    return (react_1.default.createElement("div", { className: "map-visualization-editor-format-settings" },
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.Checkbox, { "data-test": "Map.Editor.TooltipEnabled", checked: options.tooltip.enabled, onChange: event => onOptionsChange({ tooltip: { enabled: event.target.checked } }) }, "Show tooltip")),
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.Input, { label: react_1.default.createElement(react_1.default.Fragment, null,
                    "Tooltip template ",
                    templateFormatHint), "data-test": "Map.Editor.TooltipTemplate", disabled: !options.tooltip.enabled, placeholder: "Default template", defaultValue: options.tooltip.template, onChange: (event) => onOptionsChangeDebounced({ tooltip: { template: event.target.value } }) })),
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.Checkbox, { "data-test": "Map.Editor.PopupEnabled", checked: options.popup.enabled, onChange: event => onOptionsChange({ popup: { enabled: event.target.checked } }) }, "Show popup")),
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.TextArea, { label: react_1.default.createElement(react_1.default.Fragment, null,
                    "Popup template ",
                    templateFormatHint), "data-test": "Map.Editor.PopupTemplate", disabled: !options.popup.enabled, rows: 4, placeholder: "Default template", defaultValue: options.popup.template, onChange: (event) => onOptionsChangeDebounced({ popup: { template: event.target.value } }) }))));
}
FormatSettings.propTypes = prop_types_1.EditorPropTypes;
