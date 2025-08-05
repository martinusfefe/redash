"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = initLinkColumn;
const lodash_1 = require("lodash");
const react_1 = __importDefault(require("react"));
const use_debounce_1 = require("use-debounce");
const editor_1 = require("@/components/visualizations/editor");
const value_format_1 = require("@/lib/value-format");
function Editor({ column, onChange }) {
    const [onChangeDebounced] = (0, use_debounce_1.useDebouncedCallback)(onChange, 200);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.Input, { label: "URL template", "data-test": "Table.ColumnEditor.Link.UrlTemplate", defaultValue: column.linkUrlTemplate, onChange: (event) => onChangeDebounced({ linkUrlTemplate: event.target.value }) })),
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.Input, { label: "Text template", "data-test": "Table.ColumnEditor.Link.TextTemplate", defaultValue: column.linkTextTemplate, onChange: (event) => onChangeDebounced({ linkTextTemplate: event.target.value }) })),
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.Input, { label: "Title template", "data-test": "Table.ColumnEditor.Link.TitleTemplate", defaultValue: column.linkTitleTemplate, onChange: (event) => onChangeDebounced({ linkTitleTemplate: event.target.value }) })),
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.Checkbox, { "data-test": "Table.ColumnEditor.Link.OpenInNewTab", checked: column.linkOpenInNewTab, onChange: event => onChange({ linkOpenInNewTab: event.target.checked }) }, "Open in new tab")),
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.ContextHelp, { placement: "topLeft", arrowPointAtCenter: true, 
                // @ts-expect-error ts-migrate(2322) FIXME: Type 'Element' is not assignable to type 'null | u... Remove this comment to see the full error message
                icon: react_1.default.createElement("span", { style: { cursor: "default" } },
                    "Format specs ",
                    editor_1.ContextHelp.defaultIcon) },
                react_1.default.createElement("div", null,
                    "All columns can be referenced using ",
                    react_1.default.createElement("code", null, "{{ column_name }}"),
                    " syntax."),
                react_1.default.createElement("div", null,
                    "Use ",
                    react_1.default.createElement("code", null, "{{ @ }}"),
                    " to reference current (this) column."),
                react_1.default.createElement("div", null, "This syntax is applicable to URL, Text and Title options.")))));
}
function initLinkColumn(column) {
    function prepareData(row) {
        row = (0, lodash_1.extend)({ "@": row[column.name] }, row);
        const href = (0, lodash_1.trim)((0, value_format_1.formatSimpleTemplate)(column.linkUrlTemplate, row));
        if (href === "") {
            return {};
        }
        const title = (0, lodash_1.trim)((0, value_format_1.formatSimpleTemplate)(column.linkTitleTemplate, row));
        const text = (0, lodash_1.trim)((0, value_format_1.formatSimpleTemplate)(column.linkTextTemplate, row));
        const result = {
            href,
            text: text !== "" ? text : href,
        };
        if (title !== "") {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{ href: s... Remove this comment to see the full error message
            result.title = title;
        }
        if (column.linkOpenInNewTab) {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'target' does not exist on type '{ href: ... Remove this comment to see the full error message
            result.target = "_blank";
        }
        return result;
    }
    function LinkColumn({ row }) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'text' does not exist on type '{}'.
        // eslint-disable-line react/prop-types
        const { text, ...props } = prepareData(row);
        return react_1.default.createElement("a", { ...props }, text);
    }
    LinkColumn.prepareData = prepareData;
    return LinkColumn;
}
initLinkColumn.friendlyName = "Link";
initLinkColumn.Editor = Editor;
