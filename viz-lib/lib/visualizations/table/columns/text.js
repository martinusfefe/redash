"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = initTextColumn;
const react_1 = __importDefault(require("react"));
const HtmlContent_1 = __importDefault(require("../../../components/HtmlContent"));
const editor_1 = require("../../../components/visualizations/editor");
const value_format_1 = require("../../../lib/value-format");
function Editor({ column, onChange }) {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.Checkbox, { "data-test": "Table.ColumnEditor.Text.AllowHTML", checked: column.allowHTML, onChange: event => onChange({ allowHTML: event.target.checked }) }, "Allow HTML content")),
        column.allowHTML && (
        // @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.Checkbox, { "data-test": "Table.ColumnEditor.Text.HighlightLinks", checked: column.highlightLinks, onChange: event => onChange({ highlightLinks: event.target.checked }) }, "Highlight links")))));
}
function initTextColumn(column) {
    const format = (0, value_format_1.createTextFormatter)(column.allowHTML && column.highlightLinks);
    function prepareData(row) {
        return {
            text: format(row[column.name]),
        };
    }
    function TextColumn({ row }) {
        // eslint-disable-line react/prop-types
        const { text } = prepareData(row);
        return column.allowHTML ? react_1.default.createElement(HtmlContent_1.default, null, text) : text;
    }
    TextColumn.prepareData = prepareData;
    return TextColumn;
}
initTextColumn.friendlyName = "Text";
initTextColumn.Editor = Editor;
