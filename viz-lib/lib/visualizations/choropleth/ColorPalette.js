"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const ColorPalette_1 = __importDefault(require("@/visualizations/ColorPalette"));
exports.default = (0, lodash_1.extend)({
    White: "#ffffff",
    Black: "#000000",
    "Light Gray": "#dddddd",
}, ColorPalette_1.default);
