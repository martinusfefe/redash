"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTextFormatter = createTextFormatter;
exports.createDateTimeFormatter = createDateTimeFormatter;
exports.createBooleanFormatter = createBooleanFormatter;
exports.createNumberFormatter = createNumberFormatter;
exports.formatSimpleTemplate = formatSimpleTemplate;
const react_1 = __importDefault(require("react"));
const server_1 = __importDefault(require("react-dom/server"));
const moment_1 = __importDefault(require("moment/moment"));
const numeral_1 = __importDefault(require("numeral"));
const lodash_1 = require("lodash");
const visualizationsSettings_1 = require("@/visualizations/visualizationsSettings");
numeral_1.default.options.scalePercentBy100 = false;
// eslint-disable-next-line
const urlPattern = /(^|[\s\n]|<br\/?>)((?:https?|ftp):\/\/[\-A-Z0-9+\u0026\u2019@#\/%?=()~_|!:,.;]*[\-A-Z0-9+\u0026@#\/%=~()_|])/gi;
const hasOwnProperty = Object.prototype.hasOwnProperty;
function NullValueComponent() {
    return react_1.default.createElement("span", { className: "display-as-null" }, visualizationsSettings_1.visualizationsSettings.nullValue);
}
function createTextFormatter(highlightLinks) {
    if (highlightLinks) {
        return (value) => {
            if (value === null) {
                return react_1.default.createElement(NullValueComponent, null);
            }
            if ((0, lodash_1.isString)(value)) {
                const Link = visualizationsSettings_1.visualizationsSettings.LinkComponent;
                value = value.replace(urlPattern, (unused, prefix, href) => {
                    const link = server_1.default.renderToStaticMarkup(react_1.default.createElement(Link, { href: href, target: "_blank", rel: "noopener noreferrer" }, href));
                    return prefix + link;
                });
            }
            return (0, lodash_1.toString)(value);
        };
    }
    return (value) => value === null ? react_1.default.createElement(NullValueComponent, null) : (0, lodash_1.toString)(value);
}
function toMoment(value) {
    if (moment_1.default.isMoment(value)) {
        return value;
    }
    if ((0, lodash_1.isFinite)(value)) {
        return (0, moment_1.default)(value);
    }
    // same as default `moment(value)`, but avoid fallback to `new Date()`
    return (0, moment_1.default)((0, lodash_1.toString)(value), [moment_1.default.ISO_8601, moment_1.default.RFC_2822]);
}
function createDateTimeFormatter(format) {
    if ((0, lodash_1.isString)(format) && format !== "") {
        return (value) => {
            if (value === null) {
                return react_1.default.createElement(NullValueComponent, null);
            }
            const wrapped = toMoment(value);
            return wrapped.isValid() ? wrapped.format(format) : (0, lodash_1.toString)(value);
        };
    }
    return (value) => value === null ? react_1.default.createElement(NullValueComponent, null) : (0, lodash_1.toString)(value);
}
function createBooleanFormatter(values) {
    if ((0, lodash_1.isArray)(values)) {
        if (values.length >= 2) {
            // Both `true` and `false` specified
            return (value) => {
                if (value === null) {
                    return react_1.default.createElement(NullValueComponent, null);
                }
                if ((0, lodash_1.isNil)(value)) {
                    return "";
                }
                return "" + values[value ? 1 : 0];
            };
        }
        else if (values.length === 1) {
            // Only `true`
            return (value) => (value ? values[0] : "");
        }
    }
    return (value) => {
        if (value === null) {
            return react_1.default.createElement(NullValueComponent, null);
        }
        if ((0, lodash_1.isNil)(value)) {
            return "";
        }
        return value ? "true" : "false";
    };
}
function createNumberFormatter(format, canReturnHTMLElement = false) {
    if ((0, lodash_1.isString)(format) && format !== "") {
        const n = (0, numeral_1.default)(0); // cache `numeral` instance
        return (value) => {
            if (canReturnHTMLElement && value === null) {
                return react_1.default.createElement(NullValueComponent, null);
            }
            if (value === "" || value === null) {
                return "";
            }
            return n.set(value).format(format);
        };
    }
    return (value) => (canReturnHTMLElement && value === null) ? react_1.default.createElement(NullValueComponent, null) : (0, lodash_1.toString)(value);
}
function formatSimpleTemplate(str, data) {
    if (!(0, lodash_1.isString)(str)) {
        return "";
    }
    return str.replace(/{{\s*([^\s]+?)\s*}}/g, (match, prop) => {
        if (hasOwnProperty.call(data, prop) && !(0, lodash_1.isUndefined)(data[prop])) {
            return data[prop];
        }
        return match;
    });
}
