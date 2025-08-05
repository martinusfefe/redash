"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DOMPurify = void 0;
const lodash_1 = require("lodash");
const dompurify_1 = __importDefault(require("dompurify"));
exports.DOMPurify = dompurify_1.default;
dompurify_1.default.setConfig({
    ADD_ATTR: ["target"],
});
dompurify_1.default.addHook("afterSanitizeAttributes", function (node) {
    // Fix elements with `target` attribute:
    // - allow only `target="_blank"
    // - add `rel="noopener noreferrer"` to prevent https://www.owasp.org/index.php/Reverse_Tabnabbing
    const target = node.getAttribute("target");
    if ((0, lodash_1.isString)(target) && target.toLowerCase() === "_blank") {
        node.setAttribute("rel", "noopener noreferrer");
    }
    else {
        node.removeAttribute("target");
    }
});
exports.default = dompurify_1.default.sanitize;
