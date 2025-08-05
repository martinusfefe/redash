"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ContextHelp;
const react_1 = __importDefault(require("react"));
const popover_1 = __importDefault(require("antd/lib/popover"));
const QuestionCircleFilled_1 = __importDefault(require("@ant-design/icons/QuestionCircleFilled"));
const visualizationsSettings_1 = require("@/visualizations/visualizationsSettings");
require("./context-help.less");
function ContextHelp({ icon, children, ...props }) {
    return (react_1.default.createElement(popover_1.default, { ...props, content: children }, icon || ContextHelp.defaultIcon));
}
ContextHelp.defaultProps = {
    icon: null,
    children: null,
};
ContextHelp.defaultIcon = react_1.default.createElement(QuestionCircleFilled_1.default, { className: "context-help-default-icon" });
function NumberFormatSpecs() {
    const { HelpTriggerComponent } = visualizationsSettings_1.visualizationsSettings;
    return (react_1.default.createElement(HelpTriggerComponent
    // @ts-expect-error ts-migrate(2322) FIXME: Type '{ children: Element; type: string; title: st... Remove this comment to see the full error message
    , { 
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ children: Element; type: string; title: st... Remove this comment to see the full error message
        type: "NUMBER_FORMAT_SPECS", title: "Formatting Numbers", href: "https://redash.io/help/user-guide/visualizations/formatting-numbers", className: "visualization-editor-context-help" }, ContextHelp.defaultIcon));
}
function DateTimeFormatSpecs() {
    const { HelpTriggerComponent } = visualizationsSettings_1.visualizationsSettings;
    return (react_1.default.createElement(HelpTriggerComponent, { title: "Formatting Dates and Times", href: "https://momentjs.com/docs/#/displaying/format/", className: "visualization-editor-context-help" }, ContextHelp.defaultIcon));
}
function TickFormatSpecs() {
    const { HelpTriggerComponent } = visualizationsSettings_1.visualizationsSettings;
    return (react_1.default.createElement(HelpTriggerComponent, { title: "Tick Formatting", href: "https://redash.io/help/user-guide/visualizations/formatting-axis", className: "visualization-editor-context-help" }, ContextHelp.defaultIcon));
}
ContextHelp.NumberFormatSpecs = NumberFormatSpecs;
ContextHelp.DateTimeFormatSpecs = DateTimeFormatSpecs;
ContextHelp.TickFormatSpecs = TickFormatSpecs;
