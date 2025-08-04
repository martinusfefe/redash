function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import { isNil, isArray, chunk, map, filter, toPairs } from "lodash";
import React, { useState, useEffect } from "react";
import tinycolor from "tinycolor2";
import TextInput from "antd/lib/input";
import Typography from "antd/lib/typography";
import Swatch from "./Swatch";
import "./input.less";
function preparePresets(presetColors, presetColumns) {
  presetColors = isArray(presetColors) ? map(presetColors, v => [null, v]) : toPairs(presetColors);
  presetColors = map(presetColors, _ref => {
    var _ref2 = _slicedToArray(_ref, 2),
      title = _ref2[0],
      value = _ref2[1];
    if (isNil(value)) {
      return [title, null];
    }
    value = tinycolor(value);
    if (value.isValid()) {
      return [title, "#" + value.toHex().toUpperCase()];
    }
    return null;
  });
  return chunk(filter(presetColors), presetColumns);
}
function validateColor(value, callback) {
  var prefix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "#";
  if (isNil(value)) {
    callback(null);
  }
  value = tinycolor(value);
  if (value.isValid()) {
    callback(prefix + value.toHex().toUpperCase());
  }
}
export default function Input(_ref3) {
  var color = _ref3.color,
    presetColors = _ref3.presetColors,
    presetColumns = _ref3.presetColumns,
    onChange = _ref3.onChange,
    onPressEnter = _ref3.onPressEnter;
  var _useState = useState(""),
    _useState2 = _slicedToArray(_useState, 2),
    inputValue = _useState2[0],
    setInputValue = _useState2[1];
  var _useState3 = useState(false),
    _useState4 = _slicedToArray(_useState3, 2),
    isInputFocused = _useState4[0],
    setIsInputFocused = _useState4[1];
  var presets = preparePresets(presetColors, presetColumns);
  function handleInputChange(value) {
    setInputValue(value);
    validateColor(value, onChange);
  }
  useEffect(() => {
    if (!isInputFocused) {
      validateColor(color, setInputValue, "");
    }
  }, [color, isInputFocused]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, map(presets, (group, index) => /*#__PURE__*/React.createElement("div", {
    className: "color-picker-input-swatches",
    key: "preset-row-".concat(index)
  }, map(group, _ref4 => {
    var _ref5 = _slicedToArray(_ref4, 2),
      title = _ref5[0],
      value = _ref5[1];
    return (
      /*#__PURE__*/
      // @ts-expect-error ts-migrate(2322) FIXME: Type 'any' is not assignable to type 'never'.
      React.createElement(Swatch, {
        key: value,
        color: value,
        title: title,
        size: 30,
        onClick: () => validateColor(value, onChange)
      })
    );
  }))), /*#__PURE__*/React.createElement("div", {
    className: "color-picker-input"
  }, /*#__PURE__*/React.createElement(TextInput, {
    "data-test": "ColorPicker.CustomColor",
    addonBefore: /*#__PURE__*/React.createElement(Typography.Text, {
      type: "secondary"
    }, "#"),
    value: inputValue,
    onChange: e => handleInputChange(e.target.value),
    onFocus: () => setIsInputFocused(true),
    onBlur: () => setIsInputFocused(false),
    onPressEnter: onPressEnter
  })));
}
Input.defaultProps = {
  color: "#FFFFFF",
  presetColors: null,
  presetColumns: 8,
  onChange: () => {},
  onPressEnter: () => {}
};
//# sourceMappingURL=Input.js.map