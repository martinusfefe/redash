function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import { map, each } from "lodash";
import * as d3 from "d3";
import React, { useState, useEffect } from "react";
import resizeObserver from "../../services/resizeObserver";
import { RendererPropTypes } from "../prop-types";
import box from "./d3box";
import "./renderer.less";
function calcIqr(k) {
  return d => {
    var q1 = d.quartiles[0];
    var q3 = d.quartiles[2];
    var iqr = (q3 - q1) * k;
    var i = -1;
    var j = d.length;
    i += 1;
    while (d[i] < q1 - iqr) {
      i += 1;
    }
    j -= 1;
    while (d[j] > q3 + iqr) {
      j -= 1;
    }
    return [i, j];
  };
}
function render(container, data, _ref) {
  var xAxisLabel = _ref.xAxisLabel,
    yAxisLabel = _ref.yAxisLabel;
  container = d3.select(container);
  var containerBounds = container.node().getBoundingClientRect();
  var containerWidth = Math.floor(containerBounds.width);
  var containerHeight = Math.floor(containerBounds.height);
  var margin = {
    top: 10,
    right: 50,
    bottom: 40,
    left: 50,
    inner: 25
  };
  var width = containerWidth - margin.right - margin.left;
  var height = containerHeight - margin.top - margin.bottom;
  var min = Infinity;
  var max = -Infinity;
  var mydata = [];
  var value = 0;
  var d = [];
  var columns = map(data.columns, col => col.name);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'scale' does not exist on type 'typeof im... Remove this comment to see the full error message
  var xscale = d3.scale.ordinal().domain(columns).rangeBands([0, containerWidth - margin.left - margin.right]);
  var boxWidth;
  if (columns.length > 1) {
    boxWidth = Math.min(xscale(columns[1]), 120.0);
  } else {
    boxWidth = 120.0;
  }
  margin.inner = boxWidth / 3.0;
  each(columns, (column, i) => {
    d = mydata[i] = [];
    each(data.rows, row => {
      value = row[column];
      d.push(value);
      if (value > max) max = Math.ceil(value);
      if (value < min) min = Math.floor(value);
    });
  });

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'scale' does not exist on type 'typeof im... Remove this comment to see the full error message
  var yscale = d3.scale.linear().domain([min * 0.99, max * 1.01]).range([height, 0]);
  var chart = box().whiskers(calcIqr(1.5))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'width' does not exist on type '{ (g: any... Remove this comment to see the full error message
  .width(boxWidth - 2 * margin.inner).height(height).domain([min * 0.99, max * 1.01]);
  var xAxis = d3.svg
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'axis' does not exist on type '(url: stri... Remove this comment to see the full error message
  .axis().scale(xscale).orient("bottom");
  var yAxis = d3.svg
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'axis' does not exist on type '(url: stri... Remove this comment to see the full error message
  .axis().scale(yscale).orient("left");
  var xLines = d3.svg
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'axis' does not exist on type '(url: stri... Remove this comment to see the full error message
  .axis().scale(xscale).tickSize(height).orient("bottom");
  var yLines = d3.svg
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'axis' does not exist on type '(url: stri... Remove this comment to see the full error message
  .axis().scale(yscale).tickSize(width).orient("right");
  function barOffset(i) {
    return xscale(columns[i]) + (xscale(columns[1]) - margin.inner) / 2.0;
  }
  container.selectAll("*").remove();
  var svg = container.append("svg").attr("width", containerWidth).attr("height", height + margin.bottom + margin.top);
  var plot = svg.append("g").attr("width", containerWidth - margin.left - margin.right).attr("transform", "translate(".concat(margin.left, ",").concat(margin.top, ")"));
  svg.append("text").attr("class", "box").attr("x", containerWidth / 2.0).attr("text-anchor", "middle").attr("y", height + margin.bottom).text(xAxisLabel);
  svg.append("text").attr("class", "box").attr("transform", "translate(10,".concat((height + margin.top + margin.bottom) / 2.0, ")rotate(-90)")).attr("text-anchor", "middle").text(yAxisLabel);
  plot.append("rect").attr("class", "grid-background").attr("width", width).attr("height", height);
  plot.append("g").attr("class", "grid").call(yLines);
  plot.append("g").attr("class", "grid").call(xLines);
  plot.append("g").attr("class", "x axis").attr("transform", "translate(0,".concat(height, ")")).call(xAxis);
  plot.append("g").attr("class", "y axis").call(yAxis);
  plot.selectAll(".box").data(mydata).enter().append("g").attr("class", "box").attr("width", boxWidth).attr("height", height).attr("transform", (_, i) => "translate(".concat(barOffset(i), ",", 0, ")")).call(chart);
}
export default function Renderer(_ref2) {
  var data = _ref2.data,
    options = _ref2.options;
  var _useState = useState(null),
    _useState2 = _slicedToArray(_useState, 2),
    container = _useState2[0],
    setContainer = _useState2[1];
  useEffect(() => {
    if (container) {
      render(container, data, options);
      var unwatch = resizeObserver(container, () => {
        render(container, data, options);
      });
      return unwatch;
    }
  }, [container, data, options]);

  // @ts-expect-error ts-migrate(2322) FIXME: Type 'Dispatch<SetStateAction<null>>' is not assig... Remove this comment to see the full error message
  return /*#__PURE__*/React.createElement("div", {
    className: "box-plot-deprecated-visualization-container",
    ref: setContainer
  });
}
Renderer.propTypes = RendererPropTypes;
//# sourceMappingURL=Renderer.js.map