function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import React from "react";
import { useDebouncedCallback } from "use-debounce";
import { Section, Input, ContextHelp } from "../../../components/visualizations/editor";
import { createDateTimeFormatter } from "../../../lib/value-format";
function Editor(_ref) {
  var column = _ref.column,
    onChange = _ref.onChange;
  var _useDebouncedCallback = useDebouncedCallback(onChange, 200),
    _useDebouncedCallback2 = _slicedToArray(_useDebouncedCallback, 1),
    onChangeDebounced = _useDebouncedCallback2[0];
  return (
    /*#__PURE__*/
    // @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message
    React.createElement(Section, null, /*#__PURE__*/React.createElement(Input, {
      label: /*#__PURE__*/React.createElement(React.Fragment, null, "Date/Time format", /*#__PURE__*/React.createElement(ContextHelp.DateTimeFormatSpecs, null)),
      "data-test": "Table.ColumnEditor.DateTime.Format",
      defaultValue: column.dateTimeFormat,
      onChange: event => onChangeDebounced({
        dateTimeFormat: event.target.value
      })
    }))
  );
}
export default function initDateTimeColumn(column) {
  var format = createDateTimeFormatter(column.dateTimeFormat);
  function prepareData(row) {
    return {
      text: format(row[column.name])
    };
  }
  function DateTimeColumn(_ref2) {
    var row = _ref2.row;
    // eslint-disable-line react/prop-types
    var _prepareData = prepareData(row),
      text = _prepareData.text;
    return text;
  }
  DateTimeColumn.prepareData = prepareData;
  return DateTimeColumn;
}
initDateTimeColumn.friendlyName = "Date/Time";
initDateTimeColumn.Editor = Editor;
//# sourceMappingURL=datetime.js.map