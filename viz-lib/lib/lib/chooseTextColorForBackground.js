"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = chooseTextColorForBackground;
const lodash_1 = require("lodash");
const chroma_js_1 = __importDefault(require("chroma-js"));
function chooseTextColorForBackground(backgroundColor, textColors = ["#ffffff", "#333333"]) {
    try {
        backgroundColor = (0, chroma_js_1.default)(backgroundColor);
        return (0, lodash_1.maxBy)(textColors, color => chroma_js_1.default.contrast(backgroundColor, color));
    }
    catch (e) {
        return null;
    }
}
