"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Input;
const lodash_1 = require("lodash");
const react_1 = __importStar(require("react"));
const tinycolor2_1 = __importDefault(require("tinycolor2"));
const input_1 = __importDefault(require("antd/lib/input"));
const typography_1 = __importDefault(require("antd/lib/typography"));
const Swatch_1 = __importDefault(require("./Swatch"));
require("./input.less");
function preparePresets(presetColors, presetColumns) {
    presetColors = (0, lodash_1.isArray)(presetColors) ? (0, lodash_1.map)(presetColors, v => [null, v]) : (0, lodash_1.toPairs)(presetColors);
    presetColors = (0, lodash_1.map)(presetColors, ([title, value]) => {
        if ((0, lodash_1.isNil)(value)) {
            return [title, null];
        }
        value = (0, tinycolor2_1.default)(value);
        if (value.isValid()) {
            return [title, "#" + value.toHex().toUpperCase()];
        }
        return null;
    });
    return (0, lodash_1.chunk)((0, lodash_1.filter)(presetColors), presetColumns);
}
function validateColor(value, callback, prefix = "#") {
    if ((0, lodash_1.isNil)(value)) {
        callback(null);
    }
    value = (0, tinycolor2_1.default)(value);
    if (value.isValid()) {
        callback(prefix + value.toHex().toUpperCase());
    }
}
function Input({ color, presetColors, presetColumns, onChange, onPressEnter }) {
    const [inputValue, setInputValue] = (0, react_1.useState)("");
    const [isInputFocused, setIsInputFocused] = (0, react_1.useState)(false);
    const presets = preparePresets(presetColors, presetColumns);
    function handleInputChange(value) {
        setInputValue(value);
        validateColor(value, onChange);
    }
    (0, react_1.useEffect)(() => {
        if (!isInputFocused) {
            validateColor(color, setInputValue, "");
        }
    }, [color, isInputFocused]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        (0, lodash_1.map)(presets, (group, index) => (react_1.default.createElement("div", { className: "color-picker-input-swatches", key: `preset-row-${index}` }, (0, lodash_1.map)(group, ([title, value]) => (
        // @ts-expect-error ts-migrate(2322) FIXME: Type 'any' is not assignable to type 'never'.
        react_1.default.createElement(Swatch_1.default, { key: value, color: value, title: title, size: 30, onClick: () => validateColor(value, onChange) })))))),
        react_1.default.createElement("div", { className: "color-picker-input" },
            react_1.default.createElement(input_1.default, { "data-test": "ColorPicker.CustomColor", addonBefore: react_1.default.createElement(typography_1.default.Text, { type: "secondary" }, "#"), value: inputValue, onChange: e => handleInputChange(e.target.value), onFocus: () => setIsInputFocused(true), onBlur: () => setIsInputFocused(false), onPressEnter: onPressEnter }))));
}
Input.defaultProps = {
    color: "#FFFFFF",
    presetColors: null,
    presetColumns: 8,
    onChange: () => { },
    onPressEnter: () => { },
};
