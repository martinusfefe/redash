"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = OptionsSettings;
const lodash_1 = require("lodash");
const react_1 = __importDefault(require("react"));
const editor_1 = require("@/components/visualizations/editor");
const prop_types_1 = require("@/visualizations/prop-types");
const CohortTimeIntervals = {
    daily: "Daily",
    weekly: "Weekly",
    monthly: "Monthly",
};
const CohortModes = {
    diagonal: "Fill gaps with zeros",
    simple: "Show data as is",
};
function OptionsSettings({ options, onOptionsChange }) {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.Select, { layout: "horizontal", label: "Time Interval", "data-test": "Cohort.TimeInterval", value: options.timeInterval, onChange: (timeInterval) => onOptionsChange({ timeInterval }) }, (0, lodash_1.map)(CohortTimeIntervals, (name, value) => (
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message
            react_1.default.createElement(editor_1.Select.Option, { key: value, "data-test": "Cohort.TimeInterval." + value }, name))))),
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.Select, { layout: "horizontal", label: "Mode", "data-test": "Cohort.Mode", value: options.mode, onChange: (mode) => onOptionsChange({ mode }) }, (0, lodash_1.map)(CohortModes, (name, value) => (
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message
            react_1.default.createElement(editor_1.Select.Option, { key: value, "data-test": "Cohort.Mode." + value }, name)))))));
}
OptionsSettings.propTypes = prop_types_1.EditorPropTypes;
