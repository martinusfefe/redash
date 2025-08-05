"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Swatch;
const lodash_1 = require("lodash");
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const tooltip_1 = __importDefault(require("antd/lib/tooltip"));
require("./swatch.less");
// @ts-expect-error ts-migrate(2700) FIXME: Rest types may only be created from object types.
function Swatch({ className, color, title, size, style, ...props }) {
    const result = (react_1.default.createElement("span", { className: (0, classnames_1.default)("color-swatch", className), 
        // @ts-expect-error ts-migrate(2698) FIXME: Spread types may only be created from object types... Remove this comment to see the full error message
        style: { backgroundColor: color, width: size, ...style }, ...props }));
    if ((0, lodash_1.isString)(title) && title !== "") {
        return (react_1.default.createElement(tooltip_1.default, { title: title, mouseEnterDelay: 0, mouseLeaveDelay: 0 }, result));
    }
    return result;
}
Swatch.defaultProps = {
    className: null,
    style: null,
    title: null,
    color: "transparent",
    size: 12,
};
