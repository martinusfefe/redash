"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = initImageColumn;
const lodash_1 = require("lodash");
const react_1 = __importDefault(require("react"));
const use_debounce_1 = require("use-debounce");
const editor_1 = require("../../../components/visualizations/editor");
const value_format_1 = require("../../../lib/value-format");
function Editor({ column, onChange }) {
    const [onChangeDebounced] = (0, use_debounce_1.useDebouncedCallback)(onChange, 200);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.Input, { label: "URL template", "data-test": "Table.ColumnEditor.Image.UrlTemplate", defaultValue: column.imageUrlTemplate, onChange: (event) => onChangeDebounced({ imageUrlTemplate: event.target.value }) })),
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.ControlLabel
            // @ts-expect-error ts-migrate(2322) FIXME: Type 'Element' is not assignable to type 'null | u... Remove this comment to see the full error message
            , { 
                // @ts-expect-error ts-migrate(2322) FIXME: Type 'Element' is not assignable to type 'null | u... Remove this comment to see the full error message
                label: react_1.default.createElement(react_1.default.Fragment, null,
                    "Size",
                    react_1.default.createElement(editor_1.ContextHelp, { placement: "topLeft", arrowPointAtCenter: true },
                        react_1.default.createElement("div", { style: { marginBottom: 5 } }, "Any positive integer value that specifies size in pixels."),
                        react_1.default.createElement("div", null, "Leave empty to use default value."))) },
                react_1.default.createElement("div", { className: "image-dimension-selector" },
                    react_1.default.createElement(editor_1.Input, { "data-test": "Table.ColumnEditor.Image.Width", placeholder: "Width", defaultValue: column.imageWidth, onChange: (event) => onChangeDebounced({ imageWidth: event.target.value }) }),
                    react_1.default.createElement("span", { className: "image-dimension-selector-spacer" }, "\u00D7"),
                    react_1.default.createElement(editor_1.Input, { "data-test": "Table.ColumnEditor.Image.Height", placeholder: "Height", defaultValue: column.imageHeight, onChange: (event) => onChangeDebounced({ imageHeight: event.target.value }) })))),
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.Input, { label: "Title template", "data-test": "Table.ColumnEditor.Image.TitleTemplate", defaultValue: column.imageTitleTemplate, onChange: (event) => onChangeDebounced({ imageTitleTemplate: event.target.value }) })),
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
                react_1.default.createElement("div", null, "This syntax is applicable to URL, Title and Size options.")))));
}
function initImageColumn(column) {
    function prepareData(row) {
        row = (0, lodash_1.extend)({ "@": row[column.name] }, row);
        const src = (0, lodash_1.trim)((0, value_format_1.formatSimpleTemplate)(column.imageUrlTemplate, row));
        if (src === "") {
            return {};
        }
        const width = parseInt((0, value_format_1.formatSimpleTemplate)(column.imageWidth, row), 10);
        const height = parseInt((0, value_format_1.formatSimpleTemplate)(column.imageHeight, row), 10);
        const title = (0, lodash_1.trim)((0, value_format_1.formatSimpleTemplate)(column.imageTitleTemplate, row));
        const result = { src };
        if (Number.isFinite(width) && width > 0) {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'width' does not exist on type '{ src: st... Remove this comment to see the full error message
            result.width = width;
        }
        if (Number.isFinite(height) && height > 0) {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'height' does not exist on type '{ src: s... Remove this comment to see the full error message
            result.height = height;
        }
        if (title !== "") {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'text' does not exist on type '{ src: str... Remove this comment to see the full error message
            result.text = title; // `text` is used for search
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{ src: st... Remove this comment to see the full error message
            result.title = title;
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'alt' does not exist on type '{ src: stri... Remove this comment to see the full error message
            result.alt = title;
        }
        return result;
    }
    function ImageColumn({ row }) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'text' does not exist on type '{}'.
        // eslint-disable-line react/prop-types
        const { text, ...props } = prepareData(row);
        return react_1.default.createElement("img", { alt: "", ...props });
    }
    ImageColumn.prepareData = prepareData;
    return ImageColumn;
}
initImageColumn.friendlyName = "Image";
initImageColumn.Editor = Editor;
