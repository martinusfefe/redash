"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Editor;
const lodash_1 = require("lodash");
const react_1 = __importDefault(require("react"));
const editor_1 = require("../../components/visualizations/editor");
const prop_types_1 = require("../../visualizations/prop-types");
function Editor({ options, onOptionsChange }) {
    const updateOptions = (updates) => {
        onOptionsChange((0, lodash_1.merge)({}, options, updates));
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.Switch
            // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
            , { "data-test": "PivotEditor.HideControls", 
                // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
                id: "pivot-show-controls", 
                // @ts-expect-error ts-migrate(2322) FIXME: Type 'boolean' is not assignable to type 'never'.
                defaultChecked: !options.controls.enabled, 
                // @ts-expect-error ts-migrate(2322) FIXME: Type '(enabled: any) => void' is not assignable to... Remove this comment to see the full error message
                onChange: (enabled) => updateOptions({ controls: { enabled: !enabled } }) }, "Show Pivot Controls")),
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.Switch
            // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
            , { 
                // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
                id: "pivot-show-row-totals", 
                // @ts-expect-error ts-migrate(2322) FIXME: Type 'any' is not assignable to type 'never'.
                defaultChecked: options.rendererOptions.table.rowTotals, 
                // @ts-expect-error ts-migrate(2322) FIXME: Type '(rowTotals: any) => void' is not assignable ... Remove this comment to see the full error message
                onChange: (rowTotals) => updateOptions({ rendererOptions: { table: { rowTotals } } }) }, "Show Row Totals")),
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.Switch
            // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
            , { 
                // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
                id: "pivot-show-column-totals", 
                // @ts-expect-error ts-migrate(2322) FIXME: Type 'any' is not assignable to type 'never'.
                defaultChecked: options.rendererOptions.table.colTotals, 
                // @ts-expect-error ts-migrate(2322) FIXME: Type '(colTotals: any) => void' is not assignable ... Remove this comment to see the full error message
                onChange: (colTotals) => updateOptions({ rendererOptions: { table: { colTotals } } }) }, "Show Column Totals"))));
}
Editor.propTypes = prop_types_1.EditorPropTypes;
