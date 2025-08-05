"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateColor = validateColor;
exports.getColorName = getColorName;
const lodash_1 = require("lodash");
const tinycolor2_1 = __importDefault(require("tinycolor2"));
function validateColor(value, fallback = null) {
    value = (0, tinycolor2_1.default)(value);
    return value.isValid() ? "#" + value.toHex().toUpperCase() : fallback;
}
function getColorName(color, presetColors) {
    if ((0, lodash_1.isArray)(presetColors)) {
        return color;
    }
    return (0, lodash_1.findKey)(presetColors, v => validateColor(v) === color) || color;
}
