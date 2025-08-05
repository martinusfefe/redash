function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import { map } from "lodash";
import React from "react";
import { useDebouncedCallback } from "use-debounce";
import * as Grid from "antd/lib/grid";
import { Section, Select, Input, Checkbox, TextAlignmentSelect } from "../../../components/visualizations/editor";
import ColumnTypes from "../columns";
export default function ColumnEditor(_ref) {
  var column = _ref.column,
    onChange = _ref.onChange;
  function handleChange(changes) {
    onChange(_objectSpread(_objectSpread({}, column), changes));
  }
  var _useDebouncedCallback = useDebouncedCallback(handleChange, 200),
    _useDebouncedCallback2 = _slicedToArray(_useDebouncedCallback, 1),
    handleChangeDebounced = _useDebouncedCallback2[0];

  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  var AdditionalOptions = ColumnTypes[column.displayAs].Editor || null;
  return /*#__PURE__*/React.createElement("div", {
    className: "table-visualization-editor-column"
  }, /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(Grid.Row, {
    gutter: 15,
    type: "flex",
    align: "middle"
  }, /*#__PURE__*/React.createElement(Grid.Col, {
    span: 16
  }, /*#__PURE__*/React.createElement(Input, {
    "data-test": "Table.Column.".concat(column.name, ".Title"),
    defaultValue: column.title,
    onChange: event => handleChangeDebounced({
      title: event.target.value
    })
  })), /*#__PURE__*/React.createElement(Grid.Col, {
    span: 8
  }, /*#__PURE__*/React.createElement(TextAlignmentSelect, {
    "data-test": "Table.Column.".concat(column.name, ".TextAlignment"),
    defaultValue: column.alignContent,
    onChange: event => handleChange({
      alignContent: event.target.value
    })
  })))), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(Checkbox, {
    "data-test": "Table.Column.".concat(column.name, ".UseForSearch")
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'allowSearch' does not exist on type '{ n... Remove this comment to see the full error message
    ,
    defaultChecked: column.allowSearch,
    onChange: event => handleChange({
      allowSearch: event.target.checked
    })
  }, "Use for search")), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(Input, {
    label: "Description"
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'description' does not exist on type '{ n... Remove this comment to see the full error message
    ,
    defaultValue: column.description,
    onChange: event => handleChangeDebounced({
      description: event.target.value
    })
  })), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(Select, {
    label: "Display as:",
    "data-test": "Table.Column.".concat(column.name, ".DisplayAs"),
    defaultValue: column.displayAs,
    onChange: displayAs => handleChange({
      displayAs
    })
  }, map(ColumnTypes, (_ref2, key) => {
    var friendlyName = _ref2.friendlyName;
    return (
      /*#__PURE__*/
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message
      React.createElement(Select.Option, {
        key: key,
        "data-test": "Table.Column.".concat(column.name, ".DisplayAs.").concat(key)
      }, friendlyName)
    );
  }))), AdditionalOptions && /*#__PURE__*/React.createElement(AdditionalOptions, {
    column: column,
    onChange: handleChange
  }));
}
ColumnEditor.defaultProps = {
  onChange: () => {}
};
//# sourceMappingURL=ColumnEditor.js.map