import React from "react";
import { extend } from "lodash";
import Tooltip from "antd/lib/tooltip";
function HelpTrigger(_ref) {
  var title = _ref.title,
    href = _ref.href,
    className = _ref.className,
    children = _ref.children;
  return /*#__PURE__*/React.createElement(Tooltip, {
    title: /*#__PURE__*/React.createElement(React.Fragment, null, title, /*#__PURE__*/React.createElement("i", {
      className: "fa fa-external-link",
      style: {
        marginLeft: 5
      }
    }))
  }, /*#__PURE__*/React.createElement("a", {
    className: className,
    href: href,
    target: "_blank",
    rel: "noopener noreferrer"
  }, children));
}
HelpTrigger.defaultValues = {
  title: null,
  className: null,
  children: null
};
function Link(props) {
  return /*#__PURE__*/React.createElement("a", props);
}
export var visualizationsSettings = {
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
  choroplethAvailableMaps: {}
};
export function updateVisualizationsSettings(options) {
  extend(visualizationsSettings, options);
}
//# sourceMappingURL=visualizationsSettings.js.map