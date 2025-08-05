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
exports.default = ColumnEditor;
const lodash_1 = require("lodash");
const react_1 = __importDefault(require("react"));
const use_debounce_1 = require("use-debounce");
const Grid = __importStar(require("antd/lib/grid"));
const editor_1 = require("@/components/visualizations/editor");
const columns_1 = __importDefault(require("../columns"));
function ColumnEditor({ column, onChange }) {
    function handleChange(changes) {
        onChange({ ...column, ...changes });
    }
    const [handleChangeDebounced] = (0, use_debounce_1.useDebouncedCallback)(handleChange, 200);
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    const AdditionalOptions = columns_1.default[column.displayAs].Editor || null;
    return (react_1.default.createElement("div", { className: "table-visualization-editor-column" },
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(Grid.Row, { gutter: 15, type: "flex", align: "middle" },
                react_1.default.createElement(Grid.Col, { span: 16 },
                    react_1.default.createElement(editor_1.Input, { "data-test": `Table.Column.${column.name}.Title`, defaultValue: column.title, onChange: (event) => handleChangeDebounced({ title: event.target.value }) })),
                react_1.default.createElement(Grid.Col, { span: 8 },
                    react_1.default.createElement(editor_1.TextAlignmentSelect, { "data-test": `Table.Column.${column.name}.TextAlignment`, defaultValue: column.alignContent, onChange: (event) => handleChange({ alignContent: event.target.value }) })))),
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.Checkbox, { "data-test": `Table.Column.${column.name}.UseForSearch`, 
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'allowSearch' does not exist on type '{ n... Remove this comment to see the full error message
                defaultChecked: column.allowSearch, onChange: event => handleChange({ allowSearch: event.target.checked }) }, "Use for search")),
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.Input, { label: "Description", 
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'description' does not exist on type '{ n... Remove this comment to see the full error message
                defaultValue: column.description, onChange: (event) => handleChangeDebounced({ description: event.target.value }) })),
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.Select, { label: "Display as:", "data-test": `Table.Column.${column.name}.DisplayAs`, defaultValue: column.displayAs, onChange: (displayAs) => handleChange({ displayAs }) }, (0, lodash_1.map)(columns_1.default, ({ friendlyName }, key) => (
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message
            react_1.default.createElement(editor_1.Select.Option, { key: key, "data-test": `Table.Column.${column.name}.DisplayAs.${key}` }, friendlyName))))),
        AdditionalOptions && react_1.default.createElement(AdditionalOptions, { column: column, onChange: handleChange })));
}
ColumnEditor.defaultProps = {
    onChange: () => { },
};
