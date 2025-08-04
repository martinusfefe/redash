import React from "react";
import cx from "classnames";
import "./funnel-bar.less";
export default function FunnelBar(_ref) {
  var color = _ref.color,
    value = _ref.value,
    align = _ref.align,
    className = _ref.className,
    children = _ref.children;
  return /*#__PURE__*/React.createElement("div", {
    className: cx("funnel-bar", "funnel-bar-".concat(align), className)
  }, /*#__PURE__*/React.createElement("div", {
    className: "funnel-bar-value",
    style: {
      backgroundColor: color,
      width: value + "%"
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "funnel-bar-label"
  }, children));
}
FunnelBar.defaultProps = {
  color: "#dadada",
  value: 0.0,
  align: "left",
  className: null,
  children: null
};
//# sourceMappingURL=FunnelBar.js.map