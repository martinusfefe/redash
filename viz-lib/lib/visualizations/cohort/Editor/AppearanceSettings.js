function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import React from "react";
import { useDebouncedCallback } from "use-debounce";
import { Section, Input, Checkbox, ContextHelp } from "../../../components/visualizations/editor";
import { EditorPropTypes } from "../../prop-types";
export default function AppearanceSettings(_ref) {
  var options = _ref.options,
    onOptionsChange = _ref.onOptionsChange;
  var _useDebouncedCallback = useDebouncedCallback(onOptionsChange, 200),
    _useDebouncedCallback2 = _slicedToArray(_useDebouncedCallback, 1),
    debouncedOnOptionsChange = _useDebouncedCallback2[0];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(Input, {
    layout: "horizontal",
    label: "Time Column Title",
    defaultValue: options.timeColumnTitle,
    onChange: e => debouncedOnOptionsChange({
      timeColumnTitle: e.target.value
    })
  })), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(Input, {
    layout: "horizontal",
    label: "People Column Title",
    defaultValue: options.peopleColumnTitle,
    onChange: e => debouncedOnOptionsChange({
      peopleColumnTitle: e.target.value
    })
  })), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(Input, {
    layout: "horizontal",
    label: /*#__PURE__*/React.createElement(React.Fragment, null, "Stage Column Title", /*#__PURE__*/React.createElement(ContextHelp, {
      placement: "topRight",
      arrowPointAtCenter: true
    }, /*#__PURE__*/React.createElement("div", null, "Use ", /*#__PURE__*/React.createElement("code", null, "{{ @ }}"), " to insert a stage number"))),
    defaultValue: options.stageColumnTitle,
    onChange: e => debouncedOnOptionsChange({
      stageColumnTitle: e.target.value
    })
  })), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(Input, {
    layout: "horizontal",
    label: /*#__PURE__*/React.createElement(React.Fragment, null, "Number Values Format", /*#__PURE__*/React.createElement(ContextHelp.NumberFormatSpecs, null)),
    defaultValue: options.numberFormat,
    onChange: e => debouncedOnOptionsChange({
      numberFormat: e.target.value
    })
  })), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(Input, {
    layout: "horizontal",
    label: /*#__PURE__*/React.createElement(React.Fragment, null, "Percent Values Format", /*#__PURE__*/React.createElement(ContextHelp.NumberFormatSpecs, null)),
    defaultValue: options.percentFormat,
    onChange: e => debouncedOnOptionsChange({
      percentFormat: e.target.value
    })
  })), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(Input, {
    layout: "horizontal",
    label: "No Value Placeholder",
    defaultValue: options.noValuePlaceholder,
    onChange: e => debouncedOnOptionsChange({
      noValuePlaceholder: e.target.value
    })
  })), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(Checkbox, {
    defaultChecked: options.showTooltips,
    onChange: event => onOptionsChange({
      showTooltips: event.target.checked
    })
  }, "Show Tooltips")), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(Checkbox, {
    defaultChecked: options.percentValues,
    onChange: event => onOptionsChange({
      percentValues: event.target.checked
    })
  }, "Normalize Values to Percentage")));
}
AppearanceSettings.propTypes = EditorPropTypes;
//# sourceMappingURL=AppearanceSettings.js.map