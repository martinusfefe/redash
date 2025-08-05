function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import React from "react";
import { useDebouncedCallback } from "use-debounce";
import { Section, Input, Checkbox, TextArea, ContextHelp } from "../../../components/visualizations/editor";
import { EditorPropTypes } from "../../prop-types";
function TemplateFormatHint() {
  // eslint-disable-line react/prop-types
  return (
    /*#__PURE__*/
    // @ts-expect-error ts-migrate(2746) FIXME: This JSX tag's 'children' prop expects a single ch... Remove this comment to see the full error message
    React.createElement(ContextHelp, {
      placement: "topLeft",
      arrowPointAtCenter: true
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        paddingBottom: 5
      }
    }, "All query result columns can be referenced using ", /*#__PURE__*/React.createElement("code", null, "{{ column_name }}"), " syntax."), /*#__PURE__*/React.createElement("div", {
      style: {
        paddingBottom: 5
      }
    }, "Leave this field empty to use default template."))
  );
}
export default function FormatSettings(_ref) {
  var options = _ref.options,
    onOptionsChange = _ref.onOptionsChange;
  var _useDebouncedCallback = useDebouncedCallback(onOptionsChange, 200),
    _useDebouncedCallback2 = _slicedToArray(_useDebouncedCallback, 1),
    onOptionsChangeDebounced = _useDebouncedCallback2[0];
  var templateFormatHint = /*#__PURE__*/React.createElement(TemplateFormatHint, null);
  return /*#__PURE__*/React.createElement("div", {
    className: "map-visualization-editor-format-settings"
  }, /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(Checkbox, {
    "data-test": "Map.Editor.TooltipEnabled",
    checked: options.tooltip.enabled,
    onChange: event => onOptionsChange({
      tooltip: {
        enabled: event.target.checked
      }
    })
  }, "Show tooltip")), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(Input, {
    label: /*#__PURE__*/React.createElement(React.Fragment, null, "Tooltip template ", templateFormatHint),
    "data-test": "Map.Editor.TooltipTemplate",
    disabled: !options.tooltip.enabled,
    placeholder: "Default template",
    defaultValue: options.tooltip.template,
    onChange: event => onOptionsChangeDebounced({
      tooltip: {
        template: event.target.value
      }
    })
  })), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(Checkbox, {
    "data-test": "Map.Editor.PopupEnabled",
    checked: options.popup.enabled,
    onChange: event => onOptionsChange({
      popup: {
        enabled: event.target.checked
      }
    })
  }, "Show popup")), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(TextArea, {
    label: /*#__PURE__*/React.createElement(React.Fragment, null, "Popup template ", templateFormatHint),
    "data-test": "Map.Editor.PopupTemplate",
    disabled: !options.popup.enabled,
    rows: 4,
    placeholder: "Default template",
    defaultValue: options.popup.template,
    onChange: event => onOptionsChangeDebounced({
      popup: {
        template: event.target.value
      }
    })
  })));
}
FormatSettings.propTypes = EditorPropTypes;
//# sourceMappingURL=FormatSettings.js.map