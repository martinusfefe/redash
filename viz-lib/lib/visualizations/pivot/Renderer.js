function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import React, { useState, useEffect, useMemo } from "react";
import { get, find, pick, map, mapValues } from "lodash";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import PivotTableUI from "react-pivottable/PivotTableUI";
import { RendererPropTypes } from "../prop-types";
import { formatColumnValue } from "../../lib/utils";
import "react-pivottable/pivottable.css";
import "./renderer.less";
var VALID_OPTIONS = ["rows", "cols", "vals", "aggregatorName", "valueFilter", "sorters", "rowOrder", "colOrder", "derivedAttributes", "rendererName", "hiddenAttributes", "hiddenFromAggregators", "hiddenFromDragDrop", "menuLimit", "unusedOrientationCutoff", "controls", "rendererOptions"];
function formatRows(_ref) {
  var rows = _ref.rows,
    columns = _ref.columns;
  return map(rows, row => mapValues(row, (value, key) => formatColumnValue(value, find(columns, {
    name: key
  }).type)));
}
export default function Renderer(_ref2) {
  var data = _ref2.data,
    options = _ref2.options,
    onOptionsChange = _ref2.onOptionsChange;
  var _useState = useState(_objectSpread({}, options)),
    _useState2 = _slicedToArray(_useState, 2),
    config = _useState2[0],
    setConfig = _useState2[1];
  var dataRows = useMemo(() => formatRows(data), [data]);
  useEffect(() => {
    setConfig(_objectSpread({}, options));
  }, [options]);
  var onChange = updatedOptions => {
    var validOptions = pick(updatedOptions, VALID_OPTIONS);
    setConfig(_objectSpread({}, validOptions));
    onOptionsChange(validOptions);
  };

  // Legacy behavior: hideControls when controls.enabled is true
  var hideControls = get(options, "controls.enabled");
  var hideRowTotals = !get(options, "rendererOptions.table.rowTotals");
  var hideColumnTotals = !get(options, "rendererOptions.table.colTotals");
  return /*#__PURE__*/React.createElement("div", {
    className: "pivot-table-visualization-container",
    "data-hide-controls": hideControls || null,
    "data-hide-row-totals": hideRowTotals || null,
    "data-hide-column-totals": hideColumnTotals || null,
    "data-test": "PivotTableVisualization"
  }, /*#__PURE__*/React.createElement(PivotTableUI, _extends({}, pick(config, VALID_OPTIONS), {
    data: dataRows,
    onChange: onChange
  })));
}
Renderer.propTypes = RendererPropTypes;
Renderer.defaultProps = {
  onOptionsChange: () => {}
};
//# sourceMappingURL=Renderer.js.map