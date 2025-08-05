"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ColorsSettings;
const lodash_1 = require("lodash");
const react_1 = __importDefault(require("react"));
const editor_1 = require("@/components/visualizations/editor");
const prop_types_1 = require("@/visualizations/prop-types");
const ColorPalette_1 = __importDefault(require("@/visualizations/ColorPalette"));
const ColorPalette = {
    White: "#FFFFFF",
    ...ColorPalette_1.default,
};
const minSteps = 3;
const maxSteps = 20;
function validateSteps(value) {
    value = (0, lodash_1.isFinite)(value) ? value : parseInt(value, 10);
    value = (0, lodash_1.isFinite)(value) ? value : 0;
    return Math.max(minSteps, Math.min(value, maxSteps));
}
function ColorsSettings({ options, onOptionsChange }) {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.ColorPicker, { layout: "horizontal", label: "Min Color", presetColors: ColorPalette, interactive: true, color: options.colors.min, onChange: (min) => onOptionsChange({ colors: { min } }), 
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'Label' does not exist on type '({ classN... Remove this comment to see the full error message
                addonAfter: react_1.default.createElement(editor_1.ColorPicker.Label, { color: options.colors.min, presetColors: ColorPalette }) })),
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.ColorPicker, { layout: "horizontal", label: "Max Color", presetColors: ColorPalette, interactive: true, color: options.colors.max, onChange: (max) => onOptionsChange({ colors: { max } }), 
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'Label' does not exist on type '({ classN... Remove this comment to see the full error message
                addonAfter: react_1.default.createElement(editor_1.ColorPicker.Label, { color: options.colors.max, presetColors: ColorPalette }) })),
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.InputNumber, { layout: "horizontal", label: "Steps", min: minSteps, max: maxSteps, value: options.colors.steps, onChange: (value) => onOptionsChange({ colors: { steps: validateSteps(value) } }) }))));
}
ColorsSettings.propTypes = prop_types_1.EditorPropTypes;
