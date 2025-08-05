function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import { includes, map, extend, fromPairs } from "lodash";
import React, { useMemo, useCallback } from "react";
import { useDebouncedCallback } from "use-debounce";
import Table from "antd/lib/table";
import Input from "antd/lib/input";
import Radio from "antd/lib/radio";
// @ts-expect-error ts-migrate(2724) FIXME: Module '"../../../../node_modules/react-sortable-h... Remove this comment to see the full error message
import { sortableElement } from "react-sortable-hoc";
import { SortableContainer, DragHandle } from "../../../components/sortable";
import { EditorPropTypes } from "../../prop-types";
import ChartTypeSelect from "./ChartTypeSelect";
import getChartData from "../getChartData";
var SortableBodyRow = sortableElement(props => /*#__PURE__*/React.createElement("tr", props));
function getTableColumns(options, updateSeriesOption, debouncedUpdateSeriesOption) {
  var result = [{
    title: "Order",
    dataIndex: "zIndex",
    render: (unused, item) => /*#__PURE__*/React.createElement("span", {
      className: "series-settings-order"
    }, /*#__PURE__*/React.createElement(DragHandle, null), item.zIndex + 1)
  }, {
    title: "Label",
    dataIndex: "name",
    render: (unused, item) => /*#__PURE__*/React.createElement(Input, {
      "data-test": "Chart.Series.".concat(item.key, ".Label"),
      placeholder: item.key,
      defaultValue: item.name,
      onChange: event => debouncedUpdateSeriesOption(item.key, "name", event.target.value)
    })
  }];
  if (!includes(["pie", "heatmap"], options.globalSeriesType)) {
    if (!options.swappedAxes) {
      result.push({
        title: "Y Axis",
        dataIndex: "yAxis",
        render: (unused, item) => /*#__PURE__*/React.createElement(Radio.Group, {
          className: "series-settings-y-axis",
          value: item.yAxis === 1 ? 1 : 0,
          onChange: event => updateSeriesOption(item.key, "yAxis", event.target.value)
        }, /*#__PURE__*/React.createElement(Radio, {
          value: 0,
          "data-test": "Chart.Series.".concat(item.key, ".UseLeftAxis")
        }, "left"), /*#__PURE__*/React.createElement(Radio, {
          value: 1,
          "data-test": "Chart.Series.".concat(item.key, ".UseRightAxis")
        }, "right"))
      });
    }
    result.push({
      title: "Type",
      dataIndex: "type",
      render: (unused, item) => /*#__PURE__*/React.createElement(ChartTypeSelect, {
        "data-test": "Chart.Series.".concat(item.key, ".Type"),
        dropdownMatchSelectWidth: false,
        value: item.type
        // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
        ,
        hiddenChartTypes: ["pie", "heatmap", "bubble", "box"],
        onChange: value => updateSeriesOption(item.key, "type", value)
      })
    });
  }
  return result;
}
export default function SeriesSettings(_ref) {
  var options = _ref.options,
    data = _ref.data,
    onOptionsChange = _ref.onOptionsChange;
  var series = useMemo(() => map(getChartData(data.rows, options),
  // returns sorted series
  (_ref2, zIndex) => {
    var name = _ref2.name;
    return extend({
      key: name,
      type: options.globalSeriesType
    }, options.seriesOptions[name], {
      zIndex
    });
  }), [options, data]);
  var handleSortEnd = useCallback(_ref3 => {
    var oldIndex = _ref3.oldIndex,
      newIndex = _ref3.newIndex;
    var seriesOptions = [...series];
    seriesOptions.splice(newIndex, 0, ...seriesOptions.splice(oldIndex, 1));
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'key' does not exist on type 'Boolean'.
    onOptionsChange({
      seriesOptions: fromPairs(map(seriesOptions, (_ref4, zIndex) => {
        var key = _ref4.key;
        return [key, {
          zIndex
        }];
      }))
    });
  }, [onOptionsChange, series]);
  var updateSeriesOption = useCallback((key, prop, value) => {
    onOptionsChange({
      seriesOptions: {
        [key]: {
          [prop]: value
        }
      }
    });
  }, [onOptionsChange]);
  var _useDebouncedCallback = useDebouncedCallback(updateSeriesOption, 200),
    _useDebouncedCallback2 = _slicedToArray(_useDebouncedCallback, 1),
    debouncedUpdateSeriesOption = _useDebouncedCallback2[0];
  var columns = useMemo(() => getTableColumns(options, updateSeriesOption, debouncedUpdateSeriesOption), [options, updateSeriesOption, debouncedUpdateSeriesOption]);
  return /*#__PURE__*/React.createElement(SortableContainer, {
    axis: "y",
    lockAxis: "y",
    lockToContainerEdges: true,
    useDragHandle: true,
    helperClass: "chart-editor-series-dragged-item",
    helperContainer: container => container.querySelector("tbody"),
    onSortEnd: handleSortEnd,
    containerProps: {
      className: "chart-editor-series"
    }
  }, /*#__PURE__*/React.createElement(Table
  // @ts-expect-error ts-migrate(2322) FIXME: Type 'boolean[]' is not assignable to type 'object... Remove this comment to see the full error message
  , {
    dataSource: series,
    columns: columns,
    components: {
      body: {
        row: SortableBodyRow
      }
    }
    // @ts-expect-error ts-migrate(2322) FIXME: Type '(item: object) => { index: any; }' is not as... Remove this comment to see the full error message
    ,
    onRow: item => ({
      index: item.zIndex
    }),
    pagination: false
  }));
}
SeriesSettings.propTypes = EditorPropTypes;
//# sourceMappingURL=SeriesSettings.js.map