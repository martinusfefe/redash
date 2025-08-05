"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = initBooleanColumn;
const react_1 = __importDefault(require("react"));
const use_debounce_1 = require("use-debounce");
const editor_1 = require("../../../components/visualizations/editor");
const value_format_1 = require("../../../lib/value-format");
function Editor({ column, onChange }) {
    function handleChange(index, value) {
        // @ts-expect-error ts-migrate(2488) FIXME: Type 'string[] | undefined' must have a '[Symbol.i... Remove this comment to see the full error message
        const booleanValues = [...column.booleanValues];
        booleanValues.splice(index, 1, value);
        onChange({ booleanValues });
    }
    const [handleChangeDebounced] = (0, use_debounce_1.useDebouncedCallback)(handleChange, 200);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.Input, { label: react_1.default.createElement(react_1.default.Fragment, null,
                    "Value for ",
                    react_1.default.createElement("code", null, "false")), "data-test": "Table.ColumnEditor.Boolean.False", 
                // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
                defaultValue: column.booleanValues[0], onChange: (event) => handleChangeDebounced(0, event.target.value) })),
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.Input, { label: react_1.default.createElement(react_1.default.Fragment, null,
                    "Value for ",
                    react_1.default.createElement("code", null, "true")), "data-test": "Table.ColumnEditor.Boolean.True", 
                // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
                defaultValue: column.booleanValues[1], onChange: (event) => handleChangeDebounced(1, event.target.value) }))));
}
function initBooleanColumn(column) {
    const format = (0, value_format_1.createBooleanFormatter)(column.booleanValues);
    function prepareData(row) {
        return {
            text: format(row[column.name]),
        };
    }
    function BooleanColumn({ row }) {
        // eslint-disable-line react/prop-types
        const { text } = prepareData(row);
        return text;
    }
    BooleanColumn.prepareData = prepareData;
    return BooleanColumn;
}
initBooleanColumn.friendlyName = "Boolean";
initBooleanColumn.Editor = Editor;
