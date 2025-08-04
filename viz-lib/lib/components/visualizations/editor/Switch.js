var _excluded = ["id", "children", "disabled"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import React, { useMemo } from "react";
import AntSwitch from "antd/lib/switch";
import Typography from "antd/lib/typography";
import "./Switch.less";
// @ts-expect-error ts-migrate(2700) FIXME: Rest types may only be created from object types.
export default function Switch(_ref) {
  var id = _ref.id,
    children = _ref.children,
    disabled = _ref.disabled,
    props = _objectWithoutProperties(_ref, _excluded);
  var fallbackId = useMemo(() => "visualization-editor-control-".concat(Math.random().toString(36).substr(2, 10)), []);
  id = id || fallbackId;
  if (children) {
    return /*#__PURE__*/React.createElement("label", {
      htmlFor: id,
      className: "switch-with-label"
    }, /*#__PURE__*/React.createElement(AntSwitch, _extends({
      id: id,
      disabled: disabled
    }, props)), /*#__PURE__*/React.createElement(Typography.Text, {
      className: "switch-text",
      disabled: disabled
    }, children));
  }
  return /*#__PURE__*/React.createElement(AntSwitch, props);
}
Switch.defaultProps = {
  id: null,
  disabled: false,
  children: null
};
//# sourceMappingURL=Switch.js.map