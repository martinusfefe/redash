function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import { isFinite } from "lodash";
import React, { useState, useEffect } from "react";
import cx from "classnames";
import resizeObserver from "../../services/resizeObserver";
import { RendererPropTypes } from "../prop-types";
import { getCounterData } from "./utils";
import "./render.less";
function getCounterStyles(scale) {
  return {
    msTransform: "scale(".concat(scale, ")"),
    MozTransform: "scale(".concat(scale, ")"),
    WebkitTransform: "scale(".concat(scale, ")"),
    transform: "scale(".concat(scale, ")")
  };
}
function getCounterScale(container) {
  var inner = container.firstChild;
  var scale = Math.min(container.offsetWidth / inner.offsetWidth, container.offsetHeight / inner.offsetHeight);
  return Number(isFinite(scale) ? scale : 1).toFixed(2); // keep only two decimal places
}

export default function Renderer(_ref) {
  var data = _ref.data,
    options = _ref.options,
    visualizationName = _ref.visualizationName;
  var _useState = useState("1.00"),
    _useState2 = _slicedToArray(_useState, 2),
    scale = _useState2[0],
    setScale = _useState2[1];
  var _useState3 = useState(null),
    _useState4 = _slicedToArray(_useState3, 2),
    container = _useState4[0],
    setContainer = _useState4[1];
  useEffect(() => {
    if (container) {
      var unwatch = resizeObserver(container, () => {
        setScale(getCounterScale(container));
      });
      return unwatch;
    }
  }, [container]);
  useEffect(() => {
    if (container) {
      // update scaling when options or data change (new formatting, values, etc.
      // may change inner container dimensions which will not be tracked by `resizeObserver`);
      setScale(getCounterScale(container));
    }
  }, [data, options, container]);
  var _getCounterData = getCounterData(data.rows, options, visualizationName),
    showTrend = _getCounterData.showTrend,
    trendPositive = _getCounterData.trendPositive,
    counterValue = _getCounterData.counterValue,
    counterValueTooltip = _getCounterData.counterValueTooltip,
    targetValue = _getCounterData.targetValue,
    targetValueTooltip = _getCounterData.targetValueTooltip,
    counterLabel = _getCounterData.counterLabel;
  return /*#__PURE__*/React.createElement("div", {
    className: cx("counter-visualization-container", {
      "trend-positive": showTrend && trendPositive,
      "trend-negative": showTrend && !trendPositive
    })
  }, /*#__PURE__*/React.createElement("div", {
    className: "counter-visualization-content",
    ref: setContainer
  }, /*#__PURE__*/React.createElement("div", {
    style: getCounterStyles(scale)
  }, /*#__PURE__*/React.createElement("div", {
    className: "counter-visualization-value",
    title: counterValueTooltip
  }, counterValue), targetValue && /*#__PURE__*/React.createElement("div", {
    className: "counter-visualization-target",
    title: targetValueTooltip
  }, "(", targetValue, ")"), /*#__PURE__*/React.createElement("div", {
    className: "counter-visualization-label"
  }, counterLabel))));
}
Renderer.propTypes = RendererPropTypes;
//# sourceMappingURL=Renderer.js.map