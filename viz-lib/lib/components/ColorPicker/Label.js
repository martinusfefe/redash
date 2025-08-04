var _excluded = ["className", "color", "presetColors"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import React, { useMemo } from "react";
import cx from "classnames";
import { validateColor, getColorName } from "./utils";
import "./label.less";
// @ts-expect-error ts-migrate(2700) FIXME: Rest types may only be created from object types.
export default function Label(_ref) {
  var className = _ref.className,
    color = _ref.color,
    presetColors = _ref.presetColors,
    props = _objectWithoutProperties(_ref, _excluded);
  var name = useMemo(() => getColorName(validateColor(color), presetColors), [color, presetColors]);
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cx("color-label", className)
  }, props), name);
}
Label.defaultProps = {
  className: null,
  color: "#FFFFFF",
  presetColors: null
};
//# sourceMappingURL=Label.js.map