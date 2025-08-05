"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Section;
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
require("./Section.less");
// @ts-expect-error ts-migrate(2700) FIXME: Rest types may only be created from object types.
function SectionTitle({ className, children, ...props }) {
    if (!children) {
        return null;
    }
    return (react_1.default.createElement("h4", { className: (0, classnames_1.default)("visualization-editor-section-title", className), ...props }, children));
}
SectionTitle.defaultProps = {
    className: null,
    children: null,
};
// @ts-expect-error ts-migrate(2700) FIXME: Rest types may only be created from object types.
function Section({ className, children, ...props }) {
    return (react_1.default.createElement("div", { className: (0, classnames_1.default)("visualization-editor-section", className), ...props }, children));
}
Section.defaultProps = {
    className: null,
    children: null,
};
Section.Title = SectionTitle;
