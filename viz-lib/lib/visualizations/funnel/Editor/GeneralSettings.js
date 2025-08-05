function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import { map } from "lodash";
import React, { useMemo } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Section, Select, Input, Checkbox } from "../../../components/visualizations/editor";
import { EditorPropTypes } from "../../prop-types";
export default function GeneralSettings(_ref) {
  var options = _ref.options,
    data = _ref.data,
    onOptionsChange = _ref.onOptionsChange;
  var columnNames = useMemo(() => map(data.columns, c => c.name), [data]);
  var _useDebouncedCallback = useDebouncedCallback(onOptionsChange, 200),
    _useDebouncedCallback2 = _slicedToArray(_useDebouncedCallback, 1),
    onOptionsChangeDebounced = _useDebouncedCallback2[0];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(Select, {
    layout: "horizontal",
    label: "Step Column",
    "data-test": "Funnel.StepColumn",
    placeholder: "Choose column...",
    defaultValue: options.stepCol.colName || undefined,
    onChange: colName => onOptionsChange({
      stepCol: {
        colName: colName || null
      }
    })
  }, map(columnNames, col =>
  /*#__PURE__*/
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message
  React.createElement(Select.Option, {
    key: col,
    "data-test": "Funnel.StepColumn.".concat(col)
  }, col)))), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(Input, {
    layout: "horizontal",
    label: "Step Column Title",
    "data-test": "Funnel.StepColumnTitle",
    defaultValue: options.stepCol.displayAs,
    onChange: event => onOptionsChangeDebounced({
      stepCol: {
        displayAs: event.target.value
      }
    })
  })), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(Select, {
    layout: "horizontal",
    label: "Value Column",
    "data-test": "Funnel.ValueColumn",
    placeholder: "Choose column...",
    defaultValue: options.valueCol.colName || undefined,
    onChange: colName => onOptionsChange({
      valueCol: {
        colName: colName || null
      }
    })
  }, map(columnNames, col =>
  /*#__PURE__*/
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message
  React.createElement(Select.Option, {
    key: col,
    "data-test": "Funnel.ValueColumn.".concat(col)
  }, col)))), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(Input, {
    layout: "horizontal",
    label: "Value Column Title",
    "data-test": "Funnel.ValueColumnTitle",
    defaultValue: options.valueCol.displayAs,
    onChange: event => onOptionsChangeDebounced({
      valueCol: {
        displayAs: event.target.value
      }
    })
  })), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(Checkbox, {
    "data-test": "Funnel.CustomSort",
    checked: !options.autoSort,
    onChange: event => onOptionsChange({
      autoSort: !event.target.checked
    })
  }, "Custom Sorting")), !options.autoSort && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(Select, {
    layout: "horizontal",
    label: "Sort Column",
    "data-test": "Funnel.SortColumn",
    allowClear: true,
    placeholder: "Choose column...",
    defaultValue: options.sortKeyCol.colName || undefined,
    onChange: colName => onOptionsChange({
      sortKeyCol: {
        colName: colName || null
      }
    })
  }, map(columnNames, col =>
  /*#__PURE__*/
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message
  React.createElement(Select.Option, {
    key: col,
    "data-test": "Funnel.SortColumn.".concat(col)
  }, col)))), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(Select, {
    layout: "horizontal",
    label: "Sort Order",
    "data-test": "Funnel.SortDirection",
    disabled: !options.sortKeyCol.colName,
    defaultValue: options.sortKeyCol.reverse ? "desc" : "asc",
    onChange: order => onOptionsChange({
      sortKeyCol: {
        reverse: order === "desc"
      }
    })
  }, /*#__PURE__*/React.createElement(Select.Option, {
    value: "asc",
    "data-test": "Funnel.SortDirection.Ascending"
  }, "ascending"), /*#__PURE__*/React.createElement(Select.Option, {
    value: "desc",
    "data-test": "Funnel.SortDirection.Descending"
  }, "descending")))));
}
GeneralSettings.propTypes = EditorPropTypes;
//# sourceMappingURL=GeneralSettings.js.map