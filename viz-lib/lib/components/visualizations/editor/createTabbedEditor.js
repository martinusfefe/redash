"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateOptionsStrategy = void 0;
exports.TabbedEditor = TabbedEditor;
exports.default = createTabbedEditor;
const lodash_1 = require("lodash");
const react_1 = __importDefault(require("react"));
const tabs_1 = __importDefault(require("antd/lib/tabs"));
exports.UpdateOptionsStrategy = {
    replace: (existingOptions, newOptions) => (0, lodash_1.merge)({}, newOptions),
    shallowMerge: (existingOptions, newOptions) => (0, lodash_1.extend)({}, existingOptions, newOptions),
    deepMerge: (existingOptions, newOptions) => (0, lodash_1.merge)({}, existingOptions, newOptions),
};
// @ts-expect-error ts-migrate(2339) FIXME: Property 'options' does not exist on type 'Props'.
function TabbedEditor({ tabs, options, data, onOptionsChange, ...restProps }) {
    const optionsChanged = (newOptions, updateStrategy = exports.UpdateOptionsStrategy.deepMerge) => {
        onOptionsChange(updateStrategy(options, newOptions));
    };
    // @ts-expect-error ts-migrate(2322) FIXME: Type '(number | ((() => string) & (() => string)) ... Remove this comment to see the full error message
    tabs = (0, lodash_1.filter)(tabs, tab => ((0, lodash_1.isFunction)(tab.isAvailable) ? tab.isAvailable(options, data) : true));
    return (react_1.default.createElement(tabs_1.default, { animated: false, tabBarGutter: 20 }, (0, lodash_1.map)(tabs, ({ key, title, component: Component }) => (react_1.default.createElement(tabs_1.default.TabPane, { key: key, tab: react_1.default.createElement("span", { "data-test": `VisualizationEditor.Tabs.${key}` }, (0, lodash_1.isFunction)(title) ? title(options) : title) },
        react_1.default.createElement(Component, { options: options, data: data, onOptionsChange: optionsChanged, ...restProps }))))));
}
TabbedEditor.defaultProps = {
    tabs: [],
};
function createTabbedEditor(tabs) {
    return function TabbedEditorWrapper(props) {
        return react_1.default.createElement(TabbedEditor, { ...props, tabs: tabs });
    };
}
