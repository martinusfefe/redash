"use strict";
/* eslint-disable react/prop-types */
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
exports.default = JsonViewInteractive;
const lodash_1 = require("lodash");
const react_1 = __importStar(require("react"));
const classnames_1 = __importDefault(require("classnames"));
require("./json-view-interactive.less");
function JsonBlock({ value, children, openingBrace, closingBrace, withKeys }) {
    const [isExpanded, setIsExpanded] = (0, react_1.useState)(false);
    const objectKeys = (0, lodash_1.keys)(value);
    const count = objectKeys.length;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        count > 0 && (react_1.default.createElement("span", { className: "jvi-toggle", onClick: () => setIsExpanded(!isExpanded) },
            react_1.default.createElement("i", { className: (0, classnames_1.default)("fa", { "fa-caret-right": !isExpanded, "fa-caret-down": isExpanded }) }))),
        react_1.default.createElement("span", { className: "jvi-punctuation jvi-braces" }, openingBrace),
        !isExpanded && count > 0 && (react_1.default.createElement("span", { className: "jvi-punctuation jvi-ellipsis", onClick: () => setIsExpanded(true) }, "\u2026")),
        isExpanded && (react_1.default.createElement("span", { className: "jvi-block" }, (0, lodash_1.map)(objectKeys, (key, index) => {
            const isFirst = index === 0;
            const isLast = index === count - 1;
            const comma = isLast ? null : react_1.default.createElement("span", { className: "jvi-punctuation jvi-comma" }, ",");
            return (react_1.default.createElement("span", { key: "item-" + key, className: (0, classnames_1.default)("jvi-item", { "jvi-nested-first": isFirst, "jvi-nested-last": isLast }) },
                withKeys && (react_1.default.createElement("span", { className: "jvi-object-key" },
                    react_1.default.createElement(JsonValue, { value: key },
                        react_1.default.createElement("span", { className: "jvi-punctuation" }, ": ")))),
                react_1.default.createElement(JsonValue, { value: value[key] }, comma)));
        }))),
        react_1.default.createElement("span", { className: "jvi-punctuation jvi-braces" }, closingBrace),
        children,
        !isExpanded && react_1.default.createElement("span", { className: "jvi-comment" }, " // " + count + " " + (count === 1 ? "item" : "items"))));
}
function JsonValue({ value, children }) {
    if (value === null || value === false || value === true || (0, lodash_1.isFinite)(value)) {
        return (react_1.default.createElement("span", { className: "jvi-value jvi-primitive" },
            "" + value,
            children));
    }
    if ((0, lodash_1.isString)(value)) {
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("span", { className: "jvi-punctuation jvi-string" }, "\""),
            react_1.default.createElement("span", { className: "jvi-value jvi-string" }, value),
            react_1.default.createElement("span", { className: "jvi-punctuation jvi-string" }, "\""),
            children));
    }
    if ((0, lodash_1.isArray)(value)) {
        return (react_1.default.createElement(JsonBlock, { value: value, openingBrace: "[", closingBrace: "]" }, children));
    }
    if ((0, lodash_1.isObject)(value)) {
        return (react_1.default.createElement(JsonBlock, { value: value, openingBrace: "{", closingBrace: "}", withKeys: true }, children));
    }
    return null;
}
function JsonViewInteractive({ value }) {
    return (react_1.default.createElement("span", { className: "jvi-item jvi-root" },
        react_1.default.createElement(JsonValue, { value: value })));
}
JsonViewInteractive.defaultProps = {
    // `null` will be rendered as "null" because it is a valid JSON value, so use `undefined` for no value
    value: undefined,
};
