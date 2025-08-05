function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import { isFinite } from "lodash";
import React from "react";
import { Section, ColorPicker, InputNumber } from "../../../components/visualizations/editor";
import { EditorPropTypes } from "../../prop-types";
import DefaultColorPalette from "../../ColorPalette";
var ColorPalette = _objectSpread({
  White: "#FFFFFF"
}, DefaultColorPalette);
var minSteps = 3;
var maxSteps = 20;
function validateSteps(value) {
  value = isFinite(value) ? value : parseInt(value, 10);
  value = isFinite(value) ? value : 0;
  return Math.max(minSteps, Math.min(value, maxSteps));
}
export default function ColorsSettings(_ref) {
  var options = _ref.options,
    onOptionsChange = _ref.onOptionsChange;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(ColorPicker, {
    layout: "horizontal",
    label: "Min Color",
    presetColors: ColorPalette,
    interactive: true,
    color: options.colors.min,
    onChange: min => onOptionsChange({
      colors: {
        min
      }
    })
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'Label' does not exist on type '({ classN... Remove this comment to see the full error message
    ,
    addonAfter: /*#__PURE__*/React.createElement(ColorPicker.Label, {
      color: options.colors.min,
      presetColors: ColorPalette
    })
  })), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(ColorPicker, {
    layout: "horizontal",
    label: "Max Color",
    presetColors: ColorPalette,
    interactive: true,
    color: options.colors.max,
    onChange: max => onOptionsChange({
      colors: {
        max
      }
    })
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'Label' does not exist on type '({ classN... Remove this comment to see the full error message
    ,
    addonAfter: /*#__PURE__*/React.createElement(ColorPicker.Label, {
      color: options.colors.max,
      presetColors: ColorPalette
    })
  })), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(InputNumber, {
    layout: "horizontal",
    label: "Steps",
    min: minSteps,
    max: maxSteps,
    value: options.colors.steps,
    onChange: value => onOptionsChange({
      colors: {
        steps: validateSteps(value)
      }
    })
  })));
}
ColorsSettings.propTypes = EditorPropTypes;
//# sourceMappingURL=ColorsSettings.js.map