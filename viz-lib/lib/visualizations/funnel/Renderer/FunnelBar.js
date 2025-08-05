"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FunnelBar;
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
require("./funnel-bar.less");
function FunnelBar({ color, value, align, className, children }) {
    return (react_1.default.createElement("div", { className: (0, classnames_1.default)("funnel-bar", `funnel-bar-${align}`, className) },
        react_1.default.createElement("div", { className: "funnel-bar-value", style: { backgroundColor: color, width: value + "%" } }),
        react_1.default.createElement("div", { className: "funnel-bar-label" }, children)));
}
FunnelBar.defaultProps = {
    color: "#dadada",
    value: 0.0,
    align: "left",
    className: null,
    children: null,
};
