"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = PieColorsSettings;
var _lodash = require("lodash");
var _react = _interopRequireWildcard(require("react"));
var _table = _interopRequireDefault(require("antd/lib/table"));
var _ColorPicker = _interopRequireDefault(require("../../../components/ColorPicker"));
var _propTypes = require("../../prop-types");
var _ColorPalette = require("../../ColorPalette");
var _getChartData = _interopRequireDefault(require("../getChartData"));
var _editor = require("../../../components/visualizations/editor");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function getUniqueValues(chartData) {
  var uniqueValuesNames = new Set();
  (0, _lodash.each)(chartData, series => {
    (0, _lodash.each)(series.data, row => {
      uniqueValuesNames.add(row.x);
    });
  });
  return [...uniqueValuesNames];
}
function PieColorsSettings(_ref) {
  var options = _ref.options,
    data = _ref.data,
    onOptionsChange = _ref.onOptionsChange;
  var colors = (0, _react.useMemo)(() => _objectSpread({
    Automatic: null
  }, _ColorPalette.AllColorPalettes[options.color_scheme]), [options.color_scheme]);
  var series = (0, _react.useMemo)(() => (0, _lodash.map)(getUniqueValues((0, _getChartData.default)(data.rows, options)), value => ({
    key: value,
    // @ts-expect-error ts-migrate(2538) FIXME: Type 'unknown' cannot be used as an index type.
    color: (options.valuesOptions[value] || {}).color || null
  })), [options, data]);
  var updateValuesOption = (0, _react.useCallback)((key, prop, value) => {
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
    render: (unused, item) => /*#__PURE__*/_react.default.createElement(_ColorPicker.default
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
      addonAfter: /*#__PURE__*/_react.default.createElement(_ColorPicker.default.Label, {
        color: item.color,
        presetColors: colors
      })
    })
  }];
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Select, {
    label: "Color Scheme",
    defaultValue: options.color_scheme,
    "data-test": "ColorScheme",
    onChange: val => onOptionsChange({
      color_scheme: val
    })
  }, Object.keys(_ColorPalette.AllColorPalettes).map(option =>
  /*#__PURE__*/
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message
  _react.default.createElement(_editor.Select.Option, {
    "data-test": "ColorOption".concat(option),
    key: option,
    value: option
  }, option)))), /*#__PURE__*/_react.default.createElement(_table.default, {
    showHeader: false,
    dataSource: series,
    columns: columns,
    pagination: false
  }));
}
PieColorsSettings.propTypes = _propTypes.EditorPropTypes;
//# sourceMappingURL=PieColorsSettings.js.map