function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import { toString } from "lodash";
import React, { useState, useEffect, useMemo } from "react";
import cx from "classnames";
import Popover from "antd/lib/popover";
import Card from "antd/lib/card";
import Tooltip from "antd/lib/tooltip";
import chooseTextColorForBackground from "../../lib/chooseTextColorForBackground";
import CloseOutlinedIcon from "@ant-design/icons/CloseOutlined";
import CheckOutlinedIcon from "@ant-design/icons/CheckOutlined";
import ColorInput from "./Input";
import Swatch from "./Swatch";
import Label from "./Label";
import { validateColor } from "./utils";
import "./index.less";
export default function ColorPicker(_ref) {
  var color = _ref.color,
    placement = _ref.placement,
    presetColors = _ref.presetColors,
    presetColumns = _ref.presetColumns,
    interactive = _ref.interactive,
    children = _ref.children,
    onChange = _ref.onChange,
    triggerProps = _ref.triggerProps,
    addonBefore = _ref.addonBefore,
    addonAfter = _ref.addonAfter;
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    visible = _useState2[0],
    setVisible = _useState2[1];
  var validatedColor = useMemo(() => validateColor(color), [color]);
  var _useState3 = useState(""),
    _useState4 = _slicedToArray(_useState3, 2),
    currentColor = _useState4[0],
    setCurrentColor = _useState4[1];
  function handleApply() {
    setVisible(false);
    if (!interactive) {
      // @ts-expect-error ts-migrate(2349) FIXME: This expression is not callable.
      onChange(currentColor);
    }
  }
  function handleCancel() {
    setVisible(false);
  }
  var actions = [];
  if (!interactive) {
    actions.push( /*#__PURE__*/React.createElement(Tooltip, {
      key: "cancel",
      title: "Cancel"
    }, /*#__PURE__*/React.createElement(CloseOutlinedIcon, {
      onClick: handleCancel
    })));
    actions.push( /*#__PURE__*/React.createElement(Tooltip, {
      key: "apply",
      title: "Apply"
    }, /*#__PURE__*/React.createElement(CheckOutlinedIcon, {
      onClick: handleApply
    })));
  }
  function handleInputChange(newColor) {
    setCurrentColor(newColor);
    if (interactive) {
      // @ts-expect-error ts-migrate(2349) FIXME: This expression is not callable.
      onChange(newColor);
    }
  }
  useEffect(() => {
    if (visible) {
      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'string | null' is not assignable... Remove this comment to see the full error message
      setCurrentColor(validatedColor);
    }
  }, [validatedColor, visible]);
  return /*#__PURE__*/React.createElement("span", {
    className: "color-picker-wrapper"
  }, addonBefore, /*#__PURE__*/React.createElement(Popover, {
    arrowPointAtCenter: true,
    overlayClassName: "color-picker ".concat(interactive ? "color-picker-interactive" : "color-picker-with-actions")
    // @ts-expect-error ts-migrate(2322) FIXME: Type '{ "--color-picker-selected-color": string; }... Remove this comment to see the full error message
    ,
    overlayStyle: {
      "--color-picker-selected-color": currentColor
    },
    content: /*#__PURE__*/React.createElement(Card, {
      "data-test": "ColorPicker",
      className: "color-picker-panel",
      bordered: false,
      title: toString(currentColor).toUpperCase(),
      headStyle: {
        backgroundColor: currentColor,
        // @ts-expect-error ts-migrate(2322) FIXME: Type 'string | null | undefined' is not assignable... Remove this comment to see the full error message
        color: chooseTextColorForBackground(currentColor)
      },
      actions: actions
    }, /*#__PURE__*/React.createElement(ColorInput
    // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
    , {
      color: currentColor,
      presetColors: presetColors,
      presetColumns: presetColumns
      // @ts-expect-error ts-migrate(2322) FIXME: Type '(newColor: any) => void' is not assignable t... Remove this comment to see the full error message
      ,
      onChange: handleInputChange
      // @ts-expect-error ts-migrate(2322) FIXME: Type '() => void' is not assignable to type 'never... Remove this comment to see the full error message
      ,
      onPressEnter: handleApply
    })),
    trigger: "click",
    placement: placement,
    visible: visible,
    onVisibleChange: setVisible
  }, children || /*#__PURE__*/React.createElement(Swatch, _extends({
    color: validatedColor,
    size: 30
  }, triggerProps, {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'className' does not exist on type 'never... Remove this comment to see the full error message
    className: cx("color-picker-trigger", triggerProps.className)
  }))), addonAfter);
}
ColorPicker.defaultProps = {
  color: "#FFFFFF",
  placement: "top",
  presetColors: null,
  presetColumns: 8,
  interactive: false,
  triggerProps: {},
  children: null,
  addonBefore: null,
  addonAfter: null,
  onChange: () => {}
};
ColorPicker.Input = ColorInput;
ColorPicker.Swatch = Swatch;
ColorPicker.Label = Label;
//# sourceMappingURL=index.js.map