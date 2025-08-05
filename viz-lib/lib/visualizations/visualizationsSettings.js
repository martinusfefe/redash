"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.visualizationsSettings = void 0;
exports.updateVisualizationsSettings = updateVisualizationsSettings;
const react_1 = __importDefault(require("react"));
const lodash_1 = require("lodash");
const tooltip_1 = __importDefault(require("antd/lib/tooltip"));
function HelpTrigger({ title, href, className, children }) {
    return (react_1.default.createElement(tooltip_1.default, { title: react_1.default.createElement(react_1.default.Fragment, null,
            title,
            react_1.default.createElement("i", { className: "fa fa-external-link", style: { marginLeft: 5 } })) },
        react_1.default.createElement("a", { className: className, href: href, target: "_blank", rel: "noopener noreferrer" }, children)));
}
HelpTrigger.defaultValues = {
    title: null,
    className: null,
    children: null,
};
function Link(props) {
    return react_1.default.createElement("a", { ...props });
}
exports.visualizationsSettings = {
    HelpTriggerComponent: HelpTrigger,
    LinkComponent: Link,
    dateFormat: "DD/MM/YYYY",
    dateTimeFormat: "DD/MM/YYYY HH:mm",
    integerFormat: "0,0",
    floatFormat: "0,0.00",
    nullValue: "null",
    booleanValues: ["false", "true"],
    tableCellMaxJSONSize: 50000,
    allowCustomJSVisualizations: false,
    hidePlotlyModeBar: false,
    choroplethAvailableMaps: {},
};
function updateVisualizationsSettings(options) {
    (0, lodash_1.extend)(exports.visualizationsSettings, options);
}
