var _excluded = ["className"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import { pickBy, startsWith } from "lodash";
import React from "react";
import cx from "classnames";
import Radio from "antd/lib/radio";
import Tooltip from "antd/lib/tooltip";
import AlignLeftOutlinedIcon from "@ant-design/icons/AlignLeftOutlined";
import AlignCenterOutlinedIcon from "@ant-design/icons/AlignCenterOutlined";
import AlignRightOutlinedIcon from "@ant-design/icons/AlignRightOutlined";
import "./index.less";
// @ts-expect-error ts-migrate(2700) FIXME: Rest types may only be created from object types.
export default function TextAlignmentSelect(_ref) {
  var className = _ref.className,
    props = _objectWithoutProperties(_ref, _excluded);
  return (
    /*#__PURE__*/
    // Antd RadioGroup does not use any custom attributes
    React.createElement("div", pickBy(props, (v, k) => startsWith(k, "data-")), /*#__PURE__*/React.createElement(Radio.Group, _extends({
      className: cx("text-alignment-select", className)
    }, props), /*#__PURE__*/React.createElement(Tooltip, {
      title: "Align left",
      mouseEnterDelay: 0,
      mouseLeaveDelay: 0
    }, /*#__PURE__*/React.createElement(Radio.Button, {
      value: "left",
      "data-test": "TextAlignmentSelect.Left"
    }, /*#__PURE__*/React.createElement(AlignLeftOutlinedIcon, null))), /*#__PURE__*/React.createElement(Tooltip, {
      title: "Align center",
      mouseEnterDelay: 0,
      mouseLeaveDelay: 0
    }, /*#__PURE__*/React.createElement(Radio.Button, {
      value: "center",
      "data-test": "TextAlignmentSelect.Center"
    }, /*#__PURE__*/React.createElement(AlignCenterOutlinedIcon, null))), /*#__PURE__*/React.createElement(Tooltip, {
      title: "Align right",
      mouseEnterDelay: 0,
      mouseLeaveDelay: 0
    }, /*#__PURE__*/React.createElement(Radio.Button, {
      value: "right",
      "data-test": "TextAlignmentSelect.Right"
    }, /*#__PURE__*/React.createElement(AlignRightOutlinedIcon, null)))))
  );
}
TextAlignmentSelect.defaultProps = {
  className: null
};
//# sourceMappingURL=index.js.map