"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const input_1 = __importDefault(require("antd/lib/input"));
const withControlLabel_1 = __importDefault(require("./withControlLabel"));
require("./TextArea.less");
function TextArea({ className, ...otherProps }) {
    return react_1.default.createElement(input_1.default.TextArea, { className: (0, classnames_1.default)("visualization-editor-text-area", className), ...otherProps });
}
exports.default = (0, withControlLabel_1.default)(TextArea);
