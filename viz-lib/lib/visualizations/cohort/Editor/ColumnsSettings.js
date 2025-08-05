"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ColumnsSettings;
const lodash_1 = require("lodash");
const react_1 = __importDefault(require("react"));
const editor_1 = require("../../../components/visualizations/editor");
const prop_types_1 = require("../../../visualizations/prop-types");
function ColumnsSettings({ options, data, onOptionsChange }) {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.Select, { layout: "horizontal", label: "Date (Bucket)", "data-test": "Cohort.DateColumn", value: options.dateColumn, onChange: (dateColumn) => onOptionsChange({ dateColumn }) }, (0, lodash_1.map)(data.columns, ({ name }) => (
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message
            react_1.default.createElement(editor_1.Select.Option, { key: name, "data-test": "Cohort.DateColumn." + name }, name))))),
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.Select, { layout: "horizontal", label: "Stage", "data-test": "Cohort.StageColumn", value: options.stageColumn, onChange: (stageColumn) => onOptionsChange({ stageColumn }) }, (0, lodash_1.map)(data.columns, ({ name }) => (
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message
            react_1.default.createElement(editor_1.Select.Option, { key: name, "data-test": "Cohort.StageColumn." + name }, name))))),
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.Select, { layout: "horizontal", label: "Bucket Population Size", "data-test": "Cohort.TotalColumn", value: options.totalColumn, onChange: (totalColumn) => onOptionsChange({ totalColumn }) }, (0, lodash_1.map)(data.columns, ({ name }) => (
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message
            react_1.default.createElement(editor_1.Select.Option, { key: name, "data-test": "Cohort.TotalColumn." + name }, name))))),
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.Select, { layout: "horizontal", label: "Stage Value", "data-test": "Cohort.ValueColumn", value: options.valueColumn, onChange: (valueColumn) => onOptionsChange({ valueColumn }) }, (0, lodash_1.map)(data.columns, ({ name }) => (
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message
            react_1.default.createElement(editor_1.Select.Option, { key: name, "data-test": "Cohort.ValueColumn." + name }, name)))))));
}
ColumnsSettings.propTypes = prop_types_1.EditorPropTypes;
