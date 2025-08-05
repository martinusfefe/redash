var _excluded = ["tabs", "options", "data", "onOptionsChange"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import { isFunction, map, filter, extend, merge } from "lodash";
import React from "react";
import Tabs from "antd/lib/tabs";
export var UpdateOptionsStrategy = {
  replace: (existingOptions, newOptions) => merge({}, newOptions),
  shallowMerge: (existingOptions, newOptions) => extend({}, existingOptions, newOptions),
  deepMerge: (existingOptions, newOptions) => merge({}, existingOptions, newOptions)
};

/*
(ts-migrate) TODO: Migrate the remaining prop types
...EditorPropTypes
*/

// @ts-expect-error ts-migrate(2339) FIXME: Property 'options' does not exist on type 'Props'.
export function TabbedEditor(_ref) {
  var tabs = _ref.tabs,
    options = _ref.options,
    data = _ref.data,
    onOptionsChange = _ref.onOptionsChange,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var optionsChanged = function optionsChanged(newOptions) {
    var updateStrategy = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : UpdateOptionsStrategy.deepMerge;
    onOptionsChange(updateStrategy(options, newOptions));
  };

  // @ts-expect-error ts-migrate(2322) FIXME: Type '(number | ((() => string) & (() => string)) ... Remove this comment to see the full error message
  tabs = filter(tabs, tab => isFunction(tab.isAvailable) ? tab.isAvailable(options, data) : true);
  return /*#__PURE__*/React.createElement(Tabs, {
    animated: false,
    tabBarGutter: 20
  }, map(tabs, _ref2 => {
    var key = _ref2.key,
      title = _ref2.title,
      Component = _ref2.component;
    return /*#__PURE__*/React.createElement(Tabs.TabPane, {
      key: key,
      tab: /*#__PURE__*/React.createElement("span", {
        "data-test": "VisualizationEditor.Tabs.".concat(key)
      }, isFunction(title) ? title(options) : title)
    }, /*#__PURE__*/React.createElement(Component, _extends({
      options: options,
      data: data,
      onOptionsChange: optionsChanged
    }, restProps)));
  }));
}
TabbedEditor.defaultProps = {
  tabs: []
};
export default function createTabbedEditor(tabs) {
  return function TabbedEditorWrapper(props) {
    return /*#__PURE__*/React.createElement(TabbedEditor, _extends({}, props, {
      tabs: tabs
    }));
  };
}
//# sourceMappingURL=createTabbedEditor.js.map