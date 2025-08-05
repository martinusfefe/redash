"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const prop_types_1 = __importDefault(require("prop-types"));
const sanitize_1 = __importDefault(require("../services/sanitize"));
const HtmlContent = react_1.default.memo(function HtmlContent({ children, ...props }) {
    return (react_1.default.createElement("div", { ...props, 
        // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'ReactNode' is not assignable to ... Remove this comment to see the full error message
        dangerouslySetInnerHTML: { __html: (0, sanitize_1.default)(children) } }));
});
// @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'Named... Remove this comment to see the full error message
HtmlContent.propTypes = {
    children: prop_types_1.default.string,
};
// @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultProps' does not exist on type 'Na... Remove this comment to see the full error message
HtmlContent.defaultProps = {
    children: "",
};
exports.default = HtmlContent;
