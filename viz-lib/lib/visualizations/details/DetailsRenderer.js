function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import React, { useState } from "react";
import { map, mapValues, keyBy } from "lodash";
import moment from "moment";
import { RendererPropTypes } from "../prop-types";
import { visualizationsSettings } from "../visualizationsSettings";
import Descriptions from "antd/lib/descriptions";
import Pagination from "antd/lib/pagination";
import "./details.less";
function renderValue(value, type) {
  var formats = {
    date: visualizationsSettings.dateFormat,
    datetime: visualizationsSettings.dateTimeFormat
  };
  if (type === "date" || type === "datetime") {
    if (moment.isMoment(value)) {
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      return value.format(formats[type]);
    }
  }
  return "" + value;
}
export default function DetailsRenderer(_ref) {
  var data = _ref.data;
  var _useState = useState(0),
    _useState2 = _slicedToArray(_useState, 2),
    page = _useState2[0],
    setPage = _useState2[1];
  if (!data || !data.rows || data.rows.length === 0) {
    return null;
  }
  var types = mapValues(keyBy(data.columns, "name"), "type");

  // We use columsn to maintain order of columns in the view.
  var columns = data.columns.map(column => column.name);
  var row = data.rows[page];
  return /*#__PURE__*/React.createElement("div", {
    className: "details-viz"
  }, /*#__PURE__*/React.createElement(Descriptions, {
    size: "small",
    column: 1,
    bordered: true
  }, map(columns, key => /*#__PURE__*/React.createElement(Descriptions.Item, {
    key: key,
    label: key
  }, renderValue(row[key], types[key])))), data.rows.length > 1 && /*#__PURE__*/React.createElement("div", {
    className: "paginator-container"
  }, /*#__PURE__*/React.createElement(Pagination, {
    showSizeChanger: false,
    current: page + 1,
    defaultPageSize: 1,
    total: data.rows.length,
    onChange: p => setPage(p - 1)
  })));
}
DetailsRenderer.propTypes = RendererPropTypes;
//# sourceMappingURL=DetailsRenderer.js.map