function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import { includes } from "lodash";
import React from "react";
import { useDebouncedCallback } from "use-debounce";
import { Section, Input, Checkbox, ContextHelp } from "../../../components/visualizations/editor";
import { EditorPropTypes } from "../../prop-types";
export default function DataLabelsSettings(_ref) {
  var options = _ref.options,
    onOptionsChange = _ref.onOptionsChange;
  var isShowDataLabelsAvailable = includes(["line", "area", "column", "scatter", "pie", "heatmap"], options.globalSeriesType);
  var _useDebouncedCallback = useDebouncedCallback(onOptionsChange, 200),
    _useDebouncedCallback2 = _slicedToArray(_useDebouncedCallback, 1),
    debouncedOnOptionsChange = _useDebouncedCallback2[0];
  return /*#__PURE__*/React.createElement(React.Fragment, null, isShowDataLabelsAvailable &&
  /*#__PURE__*/
  // @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message
  React.createElement(Section, null, /*#__PURE__*/React.createElement(Checkbox, {
    "data-test": "Chart.DataLabels.ShowDataLabels",
    defaultChecked: options.showDataLabels,
    onChange: event => onOptionsChange({
      showDataLabels: event.target.checked
    })
  }, "Show Data Labels")), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(Input, {
    label: /*#__PURE__*/React.createElement(React.Fragment, null, "Number Values Format", /*#__PURE__*/React.createElement(ContextHelp.NumberFormatSpecs, null)),
    "data-test": "Chart.DataLabels.NumberFormat",
    defaultValue: options.numberFormat,
    onChange: e => debouncedOnOptionsChange({
      numberFormat: e.target.value
    })
  })), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(Input, {
    label: /*#__PURE__*/React.createElement(React.Fragment, null, "Percent Values Format", /*#__PURE__*/React.createElement(ContextHelp.NumberFormatSpecs, null)),
    "data-test": "Chart.DataLabels.PercentFormat",
    defaultValue: options.percentFormat,
    onChange: e => debouncedOnOptionsChange({
      percentFormat: e.target.value
    })
  })), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(Input, {
    label: /*#__PURE__*/React.createElement(React.Fragment, null, "Date/Time Values Format", /*#__PURE__*/React.createElement(ContextHelp.DateTimeFormatSpecs, null)),
    "data-test": "Chart.DataLabels.DateTimeFormat",
    defaultValue: options.dateTimeFormat,
    onChange: e => debouncedOnOptionsChange({
      dateTimeFormat: e.target.value
    })
  })), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(Input, {
    label: /*#__PURE__*/React.createElement(React.Fragment, null, "Data Labels", /*#__PURE__*/React.createElement(ContextHelp, {
      placement: "topRight",
      arrowPointAtCenter: true
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        paddingBottom: 5
      }
    }, "Use special names to access additional properties:"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("code", null, "{{ @@name }}"), " series name;"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("code", null, "{{ @@x }}"), " x-value;"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("code", null, "{{ @@y }}"), " y-value;"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("code", null, "{{ @@yPercent }}"), " relative y-value;"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("code", null, "{{ @@yError }}"), " y deviation;"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("code", null, "{{ @@size }}"), " bubble size;"), /*#__PURE__*/React.createElement("div", {
      style: {
        paddingTop: 5
      }
    }, "Also, all query result columns can be referenced", /*#__PURE__*/React.createElement("br", null), "using", /*#__PURE__*/React.createElement("code", {
      style: {
        whiteSpace: "nowrap"
      }
    }, "{{ column_name }}"), " syntax."))),
    "data-test": "Chart.DataLabels.TextFormat",
    placeholder: "(auto)",
    defaultValue: options.textFormat,
    onChange: e => debouncedOnOptionsChange({
      textFormat: e.target.value
    })
  })));
}
DataLabelsSettings.propTypes = EditorPropTypes;
//# sourceMappingURL=DataLabelsSettings.js.map