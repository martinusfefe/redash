"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GeneralSettings;
const lodash_1 = require("lodash");
const react_1 = __importDefault(require("react"));
const editor_1 = require("@/components/visualizations/editor");
const prop_types_1 = require("@/visualizations/prop-types");
function GeneralSettings({ options, data, visualizationName, onOptionsChange }) {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.Input, { layout: "horizontal", label: "Counter Label", "data-test": "Counter.General.Label", defaultValue: options.counterLabel, placeholder: visualizationName, onChange: (e) => onOptionsChange({ counterLabel: e.target.value }) })),
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.Select, { layout: "horizontal", label: "Counter Value Column Name", "data-test": "Counter.General.ValueColumn", defaultValue: options.counterColName, disabled: options.countRow, onChange: (counterColName) => onOptionsChange({ counterColName }) }, (0, lodash_1.map)(data.columns, col => (
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message
            react_1.default.createElement(editor_1.Select.Option, { key: col.name, "data-test": "Counter.General.ValueColumn." + col.name }, col.name))))),
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.InputNumber, { layout: "horizontal", label: "Counter Value Row Number", "data-test": "Counter.General.ValueRowNumber", defaultValue: options.rowNumber, disabled: options.countRow, onChange: (rowNumber) => onOptionsChange({ rowNumber }) })),
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.Select, { layout: "horizontal", label: "Target Value Column Name", "data-test": "Counter.General.TargetValueColumn", defaultValue: options.targetColName, onChange: (targetColName) => onOptionsChange({ targetColName }) },
                react_1.default.createElement(editor_1.Select.Option, { value: "" }, "No target value"),
                (0, lodash_1.map)(data.columns, col => (
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message
                react_1.default.createElement(editor_1.Select.Option, { key: col.name, "data-test": "Counter.General.TargetValueColumn." + col.name }, col.name))))),
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.InputNumber, { layout: "horizontal", label: "Target Value Row Number", "data-test": "Counter.General.TargetValueRowNumber", defaultValue: options.targetRowNumber, onChange: (targetRowNumber) => onOptionsChange({ targetRowNumber }) })),
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.Switch
            // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
            , { "data-test": "Counter.General.CountRows", 
                // @ts-expect-error ts-migrate(2322) FIXME: Type 'any' is not assignable to type 'never'.
                defaultChecked: options.countRow, 
                // @ts-expect-error ts-migrate(2322) FIXME: Type '(countRow: any) => any' is not assignable to... Remove this comment to see the full error message
                onChange: (countRow) => onOptionsChange({ countRow }) }, "Count Rows"))));
}
GeneralSettings.propTypes = prop_types_1.EditorPropTypes;
