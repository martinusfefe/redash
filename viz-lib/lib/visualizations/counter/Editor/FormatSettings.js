"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FormatSettings;
const react_1 = __importDefault(require("react"));
const editor_1 = require("@/components/visualizations/editor");
const prop_types_1 = require("@/visualizations/prop-types");
const utils_1 = require("../utils");
function FormatSettings({ options, data, onOptionsChange }) {
    const inputsEnabled = (0, utils_1.isValueNumber)(data.rows, options);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.InputNumber, { layout: "horizontal", label: "Formatting Decimal Place", "data-test": "Counter.Formatting.DecimalPlace", defaultValue: options.stringDecimal, disabled: !inputsEnabled, onChange: (stringDecimal) => onOptionsChange({ stringDecimal }) })),
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.Input, { layout: "horizontal", label: "Formatting Decimal Character", "data-test": "Counter.Formatting.DecimalCharacter", defaultValue: options.stringDecChar, disabled: !inputsEnabled, onChange: (e) => onOptionsChange({ stringDecChar: e.target.value }) })),
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.Input, { layout: "horizontal", label: "Formatting Thousands Separator", "data-test": "Counter.Formatting.ThousandsSeparator", defaultValue: options.stringThouSep, disabled: !inputsEnabled, onChange: (e) => onOptionsChange({ stringThouSep: e.target.value }) })),
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.Input, { layout: "horizontal", label: "Formatting String Prefix", "data-test": "Counter.Formatting.StringPrefix", defaultValue: options.stringPrefix, disabled: !inputsEnabled, onChange: (e) => onOptionsChange({ stringPrefix: e.target.value }) })),
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.Input, { layout: "horizontal", label: "Formatting String Suffix", "data-test": "Counter.Formatting.StringSuffix", defaultValue: options.stringSuffix, disabled: !inputsEnabled, onChange: (e) => onOptionsChange({ stringSuffix: e.target.value }) })),
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.Switch
            // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
            , { "data-test": "Counter.Formatting.FormatTargetValue", 
                // @ts-expect-error ts-migrate(2322) FIXME: Type 'any' is not assignable to type 'never'.
                defaultChecked: options.formatTargetValue, 
                // @ts-expect-error ts-migrate(2322) FIXME: Type '(formatTargetValue: any) => any' is not assi... Remove this comment to see the full error message
                onChange: (formatTargetValue) => onOptionsChange({ formatTargetValue }) }, "Format Target Value"))));
}
FormatSettings.propTypes = prop_types_1.EditorPropTypes;
