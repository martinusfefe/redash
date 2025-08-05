function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import { isString, isObject, isFinite, isNumber, merge } from "lodash";
import React from "react";
import { useDebouncedCallback } from "use-debounce";
import * as Grid from "antd/lib/grid";
import { Section, Select, Input, InputNumber, ContextHelp } from "../../../components/visualizations/editor";
function toNumber(value) {
  value = isNumber(value) ? value : parseFloat(value);
  return isFinite(value) ? value : null;
}
export default function AxisSettings(_ref) {
  var id = _ref.id,
    options = _ref.options,
    features = _ref.features,
    onChange = _ref.onChange;
  function optionsChanged(newOptions) {
    onChange(merge({}, options, newOptions));
  }
  var _useDebouncedCallback = useDebouncedCallback(text => {
      var title = isString(text) && text !== "" ? {
        text
      } : null;
      optionsChanged({
        title
      });
    }, 200),
    _useDebouncedCallback2 = _slicedToArray(_useDebouncedCallback, 1),
    handleNameChange = _useDebouncedCallback2[0];
  var _useDebouncedCallback3 = useDebouncedCallback(opts => optionsChanged(opts), 200),
    _useDebouncedCallback4 = _slicedToArray(_useDebouncedCallback3, 1),
    handleMinMaxChange = _useDebouncedCallback4[0];
  var _useDebouncedCallback5 = useDebouncedCallback(opts => optionsChanged(opts), 200),
    _useDebouncedCallback6 = _slicedToArray(_useDebouncedCallback5, 1),
    handleTickFormatChange = _useDebouncedCallback6[0];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(Select, {
    label: "Scale",
    "data-test": "Chart.".concat(id, ".Type"),
    defaultValue: options.type,
    onChange: type => optionsChanged({
      type
    })
  }, features.autoDetectType &&
  /*#__PURE__*/
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message
  React.createElement(Select.Option, {
    value: "-",
    "data-test": "Chart.".concat(id, ".Type.Auto")
  }, "Auto Detect"), /*#__PURE__*/React.createElement(Select.Option, {
    value: "datetime",
    "data-test": "Chart.".concat(id, ".Type.DateTime")
  }, "Datetime"), /*#__PURE__*/React.createElement(Select.Option, {
    value: "linear",
    "data-test": "Chart.".concat(id, ".Type.Linear")
  }, "Linear"), /*#__PURE__*/React.createElement(Select.Option, {
    value: "logarithmic",
    "data-test": "Chart.".concat(id, ".Type.Logarithmic")
  }, "Logarithmic"), /*#__PURE__*/React.createElement(Select.Option, {
    value: "category",
    "data-test": "Chart.".concat(id, ".Type.Category")
  }, "Category"))), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(Input, {
    label: "Name",
    "data-test": "Chart.".concat(id, ".Name"),
    defaultValue: isObject(options.title) ? options.title.text : null,
    onChange: event => handleNameChange(event.target.value)
  })), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(Input, {
    label: /*#__PURE__*/React.createElement(React.Fragment, null, "Tick Format", /*#__PURE__*/React.createElement(ContextHelp.TickFormatSpecs, null)),
    "data-test": "Chart.".concat(id, ".TickFormat"),
    defaultValue: options.tickFormat,
    onChange: event => handleTickFormatChange({
      tickFormat: event.target.value
    })
  })), features.range &&
  /*#__PURE__*/
  // @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message
  React.createElement(Section, null, /*#__PURE__*/React.createElement(Grid.Row, {
    gutter: 15,
    type: "flex",
    align: "middle"
  }, /*#__PURE__*/React.createElement(Grid.Col, {
    span: 12
  }, /*#__PURE__*/React.createElement(InputNumber, {
    label: "Min Value",
    placeholder: "Auto",
    "data-test": "Chart.".concat(id, ".RangeMin"),
    defaultValue: toNumber(options.rangeMin),
    onChange: value => handleMinMaxChange({
      rangeMin: toNumber(value)
    })
  })), /*#__PURE__*/React.createElement(Grid.Col, {
    span: 12
  }, /*#__PURE__*/React.createElement(InputNumber, {
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