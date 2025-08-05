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
const use_debounce_1 = require("use-debounce");
const Grid = __importStar(require("antd/lib/grid"));
const editor_1 = require("@/components/visualizations/editor");
const prop_types_1 = require("@/visualizations/prop-types");
const useLoadGeoJson_1 = __importDefault(require("../hooks/useLoadGeoJson"));
const utils_1 = require("./utils");
function TemplateFormatHint({ geoJsonProperties }) {
    return (
    // @ts-expect-error ts-migrate(2746) FIXME: This JSX tag's 'children' prop expects a single ch... Remove this comment to see the full error message
    react_1.default.createElement(editor_1.ContextHelp, { placement: "topLeft", arrowPointAtCenter: true },
        react_1.default.createElement("div", { style: { paddingBottom: 5 } },
            react_1.default.createElement("div", null,
                "All query result columns can be referenced using ",
                react_1.default.createElement("code", null, "{{ column_name }}"),
                " syntax."),
            react_1.default.createElement("div", null,
                "Use ",
                react_1.default.createElement("code", null, "{{ @@value }}"),
                " to access formatted value.")),
        geoJsonProperties.length > 0 && (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("div", { className: "p-b-5" }, "GeoJSON properties could be accessed by these names:"),
            react_1.default.createElement("div", { style: { maxHeight: 300, overflow: "auto" } }, (0, lodash_1.map)(geoJsonProperties, property => (react_1.default.createElement("div", { key: property },
                react_1.default.createElement("code", null, `{{ @@${property}}}`)))))))));
}
TemplateFormatHint.defaultProps = {
    geoJsonProperties: [],
};
function GeneralSettings({ options, onOptionsChange }) {
    const [onOptionsChangeDebounced] = (0, use_debounce_1.useDebouncedCallback)(onOptionsChange, 200);
    const [geoJson] = (0, useLoadGeoJson_1.default)(options.mapType);
    const geoJsonFields = (0, react_1.useMemo)(() => (0, utils_1.getGeoJsonFields)(geoJson), [geoJson]);
    const templateFormatHint = react_1.default.createElement(TemplateFormatHint, { geoJsonProperties: geoJsonFields });
    return (react_1.default.createElement("div", { className: "choropleth-visualization-editor-format-settings" },
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(Grid.Row, { gutter: 15 },
                react_1.default.createElement(Grid.Col, { span: 12 },
                    react_1.default.createElement(editor_1.Input, { label: react_1.default.createElement(react_1.default.Fragment, null,
                            "Value Format",
                            react_1.default.createElement(editor_1.ContextHelp.NumberFormatSpecs, null)), "data-test": "Choropleth.Editor.ValueFormat", defaultValue: options.valueFormat, onChange: (event) => onOptionsChangeDebounced({ valueFormat: event.target.value }) })),
                react_1.default.createElement(Grid.Col, { span: 12 },
                    react_1.default.createElement(editor_1.Input, { label: "Value Placeholder", "data-test": "Choropleth.Editor.ValuePlaceholder", defaultValue: options.noValuePlaceholder, onChange: (event) => onOptionsChangeDebounced({ noValuePlaceholder: event.target.value }) })))),
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.Checkbox, { "data-test": "Choropleth.Editor.LegendVisibility", checked: options.legend.visible, onChange: event => onOptionsChange({ legend: { visible: event.target.checked } }) }, "Show Legend")),
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(Grid.Row, { gutter: 15 },
                react_1.default.createElement(Grid.Col, { span: 12 },
                    react_1.default.createElement(editor_1.Select, { label: "Legend Position", "data-test": "Choropleth.Editor.LegendPosition", disabled: !options.legend.visible, defaultValue: options.legend.position, onChange: (position) => onOptionsChange({ legend: { position } }) },
                        react_1.default.createElement(editor_1.Select.Option, { value: "top-left", "data-test": "Choropleth.Editor.LegendPosition.TopLeft" }, "top / left"),
                        react_1.default.createElement(editor_1.Select.Option, { value: "top-right", "data-test": "Choropleth.Editor.LegendPosition.TopRight" }, "top / right"),
                        react_1.default.createElement(editor_1.Select.Option, { value: "bottom-left", "data-test": "Choropleth.Editor.LegendPosition.BottomLeft" }, "bottom / left"),
                        react_1.default.createElement(editor_1.Select.Option, { value: "bottom-right", "data-test": "Choropleth.Editor.LegendPosition.BottomRight" }, "bottom / right"))),
                react_1.default.createElement(Grid.Col, { span: 12 },
                    react_1.default.createElement(editor_1.TextAlignmentSelect, { "data-test": "Choropleth.Editor.LegendTextAlignment", label: "Legend Text Alignment", disabled: !options.legend.visible, defaultValue: options.legend.alignText, onChange: (event) => onOptionsChange({ legend: { alignText: event.target.value } }) })))),
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.Checkbox, { "data-test": "Choropleth.Editor.TooltipEnabled", checked: options.tooltip.enabled, onChange: event => onOptionsChange({ tooltip: { enabled: event.target.checked } }) }, "Show Tooltip")),
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.Input, { label: react_1.default.createElement(react_1.default.Fragment, null,
                    "Tooltip Template ",
                    templateFormatHint), "data-test": "Choropleth.Editor.TooltipTemplate", disabled: !options.tooltip.enabled, defaultValue: options.tooltip.template, onChange: (event) => onOptionsChangeDebounced({ tooltip: { template: event.target.value } }) })),
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.Checkbox, { "data-test": "Choropleth.Editor.PopupEnabled", checked: options.popup.enabled, onChange: event => onOptionsChange({ popup: { enabled: event.target.checked } }) }, "Show Popup")),
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.TextArea, { label: react_1.default.createElement(react_1.default.Fragment, null,
                    "Popup Template ",
                    templateFormatHint), "data-test": "Choropleth.Editor.PopupTemplate", disabled: !options.popup.enabled, rows: 4, defaultValue: options.popup.template, onChange: (event) => onOptionsChangeDebounced({ popup: { template: event.target.value } }) }))));
}
GeneralSettings.propTypes = prop_types_1.EditorPropTypes;
