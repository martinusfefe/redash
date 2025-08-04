function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import { each, map } from "lodash";
import React, { useMemo, useCallback } from "react";
import Table from "antd/lib/table";
import ColorPicker from "../../../components/ColorPicker";
import { EditorPropTypes } from "../../prop-types";
import { AllColorPalettes } from "../../ColorPalette";
import getChartData from "../getChartData";
import { Section, Select } from "../../../components/visualizations/editor";
function getUniqueValues(chartData) {
  var uniqueValuesNames = new Set();
  each(chartData, series => {
    each(series.data, row => {
      uniqueValuesNames.add(row.x);
    });
  });
  return [...uniqueValuesNames];
}
export default function PieColorsSettings(_ref) {
  var options = _ref.options,
    data = _ref.data,
    onOptionsChange = _ref.onOptionsChange;
  var colors = useMemo(() => _objectSpread({
    Automatic: null
  }, AllColorPalettes[options.color_scheme]), [options.color_scheme]);
  var series = useMemo(() => map(getUniqueValues(getChartData(data.rows, options)), value => ({
    key: value,
    // @ts-expect-error ts-migrate(2538) FIXME: Type 'unknown' cannot be used as an index type.
    color: (options.valuesOptions[value] || {}).color || null
  })), [options, data]);
  var updateValuesOption = useCallback((key, prop, value) => {
    onOptionsChange({
      valuesOptions: {
        [key]: {
          [prop]: value
        }
      }
    });
  }, [onOptionsChange]);
  var columns = [{
    title: "Values",
    dataIndex: "key"
  }, {
    title: "Color",
    dataIndex: "color",
    width: "1%",
    render: (unused, item) => /*#__PURE__*/React.createElement(ColorPicker
    // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
    , {
      "data-test": "Chart.Series.".concat(item.key, ".Color")
      // @ts-expect-error ts-migrate(2322) FIXME: Type 'boolean' is not assignable to type 'never'.
      ,
      interactive: true
      // @ts-expect-error ts-migrate(2322) FIXME: Type '{ "Indian Red": string; "Green 2": string; "... Remove this comment to see the full error message
      ,
      presetColors: colors
      // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
      ,
      placement: "topRight"
      // @ts-expect-error ts-migrate(2322) FIXME: Type 'any' is not assignable to type 'never'.
      ,
      color: item.color
      // @ts-expect-error ts-migrate(2322) FIXME: Type '(value: any) => void' is not assignable to t... Remove this comment to see the full error message
      ,
      onChange: value => updateValuesOption(item.key, "color", value)
      // @ts-expect-error ts-migrate(2322) FIXME: Type 'Element' is not assignable to type 'never'.
      ,
      addonAfter: /*#__PURE__*/React.createElement(ColorPicker.Label, {
        color: item.color,
        presetColors: colors
      })
    })
  }];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(Select, {
    label: "Color Scheme",
    defaultValue: options.color_scheme,
    "data-test": "ColorScheme",
    onChange: val => onOptionsChange({
      color_scheme: val
    })
  }, Object.keys(AllColorPalettes).map(option =>
  /*#__PURE__*/
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message
  React.createElement(Select.Option, {
    "data-test": "ColorOption".concat(option),
    key: option,
    value: option
  }, option)))), /*#__PURE__*/React.createElement(Table, {
    showHeader: false,
    dataSource: series,
    columns: columns,
    pagination: false
  }));
}
PieColorsSettings.propTypes = EditorPropTypes;
//# sourceMappingURL=PieColorsSettings.js.map