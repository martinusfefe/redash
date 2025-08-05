"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = initDateTimeColumn;
const react_1 = __importDefault(require("react"));
const use_debounce_1 = require("use-debounce");
const editor_1 = require("@/components/visualizations/editor");
const value_format_1 = require("@/lib/value-format");
function Editor({ column, onChange }) {
    const [onChangeDebounced] = (0, use_debounce_1.useDebouncedCallback)(onChange, 200);
    return (
    // @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message
    react_1.default.createElement(editor_1.Section, null,
        react_1.default.createElement(editor_1.Input, { label: react_1.default.createElement(react_1.default.Fragment, null,
                "Date/Time format",
                react_1.default.createElement(editor_1.ContextHelp.DateTimeFormatSpecs, null)), "data-test": "Table.ColumnEditor.DateTime.Format", defaultValue: column.dateTimeFormat, onChange: (event) => onChangeDebounced({ dateTimeFormat: event.target.value }) })));
}
function initDateTimeColumn(column) {
    const format = (0, value_format_1.createDateTimeFormatter)(column.dateTimeFormat);
    function prepareData(row) {
        return {
            text: format(row[column.name]),
        };
    }
    function DateTimeColumn({ row }) {
        // eslint-disable-line react/prop-types
        const { text } = prepareData(row);
        return text;
    }
    DateTimeColumn.prepareData = prepareData;
    return DateTimeColumn;
}
initDateTimeColumn.friendlyName = "Date/Time";
initDateTimeColumn.Editor = Editor;
