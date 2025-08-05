function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import { map } from "lodash";
import React from "react";
import Collapse from "antd/lib/collapse";
import Tooltip from "antd/lib/tooltip";
import Typography from "antd/lib/typography";
// @ts-expect-error ts-migrate(2724) FIXME: Module '"../../../../node_modules/react-sortable-h... Remove this comment to see the full error message
import { sortableElement } from "react-sortable-hoc";
import { SortableContainer, DragHandle } from "../../../components/sortable";
import { EditorPropTypes } from "../../prop-types";
import EyeOutlinedIcon from "@ant-design/icons/EyeOutlined";
import EyeInvisibleOutlinedIcon from "@ant-design/icons/EyeInvisibleOutlined";
import ColumnEditor from "./ColumnEditor";
var Text = Typography.Text;
var SortableItem = sortableElement(Collapse.Panel);
export default function ColumnsSettings(_ref) {
  var options = _ref.options,
    onOptionsChange = _ref.onOptionsChange;
  function handleColumnChange(newColumn, event) {
    if (event) {
      event.stopPropagation();
    }
    var columns = map(options.columns, c => c.name === newColumn.name ? newColumn : c);
    onOptionsChange({
      columns
    });
  }
  function handleColumnsReorder(_ref2) {
    var oldIndex = _ref2.oldIndex,
      newIndex = _ref2.newIndex;
    var columns = [...options.columns];
    columns.splice(newIndex, 0, ...columns.splice(oldIndex, 1));
    onOptionsChange({
      columns
    });
  }
  return /*#__PURE__*/React.createElement(SortableContainer, {
    axis: "y",
    lockAxis: "y",
    useDragHandle: true,
    helperClass: "table-editor-columns-dragged-item",
    helperContainer: container => container.firstChild,
    onSortEnd: handleColumnsReorder,
    containerProps: {
      className: "table-visualization-editor-columns"
    }
  }, /*#__PURE__*/React.createElement(Collapse, {
    bordered: false,
    defaultActiveKey: [],
    expandIconPosition: "right"
  }, map(options.columns, (column, index) => /*#__PURE__*/React.createElement(SortableItem, {
    key: column.name,
    index: index,
    header: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(DragHandle, null), /*#__PURE__*/React.createElement("span", {
      "data-test": "Table.Column.".concat(column.name, ".Name")
    }, column.name, column.title !== "" && column.title !== column.name && /*#__PURE__*/React.createElement(Text, {
      type: "secondary",
      style: {
        marginLeft: 5
      }
    }, /*#__PURE__*/React.createElement("i", null, "(", column.title, ")")))),
    extra: /*#__PURE__*/React.createElement(Tooltip, {
      title: "Toggle visibility",
      mouseEnterDelay: 0,
      mouseLeaveDelay: 0
    }, column.visible ? /*#__PURE__*/React.createElement(EyeOutlinedIcon, {
      "data-test": "Table.Column.".concat(column.name, ".Visibility"),
      onClick: event => handleColumnChange(_objectSpread(_objectSpread({}, column), {}, {
        visible: !column.visible
      }), event)
    }) : /*#__PURE__*/React.createElement(EyeInvisibleOutlinedIcon, {
      "data-test": "Table.Column.".concat(column.name, ".Visibility"),
      onClick: event => handleColumnChange(_objectSpread(_objectSpread({}, column), {}, {
        visible: !column.visible
      }), event)
    }))
  }, /*#__PURE__*/React.createElement(ColumnEditor, {
    column: column,
    onChange: handleColumnChange
  })))));
}
ColumnsSettings.propTypes = EditorPropTypes;
//# sourceMappingURL=ColumnsSettings.js.map