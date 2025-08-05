"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = AxisSettings;
var _lodash = require("lodash");
var _react = _interopRequireDefault(require("react"));
var _useDebounce = require("use-debounce");
var Grid = _interopRequireWildcard(require("antd/lib/grid"));
var _editor = require("../../../components/visualizations/editor");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function toNumber(value) {
  value = (0, _lodash.isNumber)(value) ? value : parseFloat(value);
  return (0, _lodash.isFinite)(value) ? value : null;
}
function AxisSettings(_ref) {
  var id = _ref.id,
    options = _ref.options,
    features = _ref.features,
    onChange = _ref.onChange;
  function optionsChanged(newOptions) {
    onChange((0, _lodash.merge)({}, options, newOptions));
  }
  var _useDebouncedCallback = (0, _useDebounce.useDebouncedCallback)(text => {
      var title = (0, _lodash.isString)(text) && text !== "" ? {
        text
      } : null;
      optionsChanged({
        title
      });
    }, 200),
    _useDebouncedCallback2 = _slicedToArray(_useDebouncedCallback, 1),
    handleNameChange = _useDebouncedCallback2[0];
  var _useDebouncedCallback3 = (0, _useDebounce.useDebouncedCallback)(opts => optionsChanged(opts), 200),
    _useDebouncedCallback4 = _slicedToArray(_useDebouncedCallback3, 1),
    handleMinMaxChange = _useDebouncedCallback4[0];
  var _useDebouncedCallback5 = (0, _useDebounce.useDebouncedCallback)(opts => optionsChanged(opts), 200),
    _useDebouncedCallback6 = _slicedToArray(_useDebouncedCallback5, 1),
    handleTickFormatChange = _useDebouncedCallback6[0];
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Select, {
    label: "Scale",
    "data-test": "Chart.".concat(id, ".Type"),
    defaultValue: options.type,
    onChange: type => optionsChanged({
      type
    })
  }, features.autoDetectType &&
  /*#__PURE__*/
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message
  _react.default.createElement(_editor.Select.Option, {
    value: "-",
    "data-test": "Chart.".concat(id, ".Type.Auto")
  }, "Auto Detect"), /*#__PURE__*/_react.default.createElement(_editor.Select.Option, {
    value: "datetime",
    "data-test": "Chart.".concat(id, ".Type.DateTime")
  }, "Datetime"), /*#__PURE__*/_react.default.createElement(_editor.Select.Option, {
    value: "linear",
    "data-test": "Chart.".concat(id, ".Type.Linear")
  }, "Linear"), /*#__PURE__*/_react.default.createElement(_editor.Select.Option, {
    value: "logarithmic",
    "data-test": "Chart.".concat(id, ".Type.Logarithmic")
  }, "Logarithmic"), /*#__PURE__*/_react.default.createElement(_editor.Select.Option, {
    value: "category",
    "data-test": "Chart.".concat(id, ".Type.Category")
  }, "Category"))), /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Input, {
    label: "Name",
    "data-test": "Chart.".concat(id, ".Name"),
    defaultValue: (0, _lodash.isObject)(options.title) ? options.title.text : null,
    onChange: event => handleNameChange(event.target.value)
  })), /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Input, {
    label: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, "Tick Format", /*#__PURE__*/_react.default.createElement(_editor.ContextHelp.TickFormatSpecs, null)),
    "data-test": "Chart.".concat(id, ".TickFormat"),
    defaultValue: options.tickFormat,
    onChange: event => handleTickFormatChange({
      tickFormat: event.target.value
    })
  })), features.range &&
  /*#__PURE__*/
  // @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message
  _react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(Grid.Row, {
    gutter: 15,
    type: "flex",
    align: "middle"
  }, /*#__PURE__*/_react.default.createElement(Grid.Col, {
    span: 12
  }, /*#__PURE__*/_react.default.createElement(_editor.InputNumber, {
    label: "Min Value",
    placeholder: "Auto",
    "data-test": "Chart.".concat(id, ".RangeMin"),
    defaultValue: toNumber(options.rangeMin),
    onChange: value => handleMinMaxChange({
      rangeMin: toNumber(value)
    })
  })), /*#__PURE__*/_react.default.createElement(Grid.Col, {
    span: 12
  }, /*#__PURE__*/_react.default.createElement(_editor.InputNumber, {
    label: "Max Value",
    placeholder: "Auto",
    "data-test": "Chart.".concat(id, ".RangeMax"),
    defaultValue: toNumber(options.rangeMax),
    onChange: value => handleMinMaxChange({
      rangeMax: toNumber(value)
    })
  })))));
}
AxisSettings.defaultProps = {
  features: {},
  onChange: () => {}
};
//# sourceMappingURL=AxisSettings.js.map