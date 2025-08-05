import React, { useMemo } from "react";
import { RendererPropTypes } from "../prop-types";
import prepareData from "./prepareData";
import "./renderer.less";
import Cornelius from "./Cornelius";
export default function Renderer(_ref) {
  var data = _ref.data,
    options = _ref.options;
  var _useMemo = useMemo(() => prepareData(data, options), [data, options]),
    cohortData = _useMemo.data,
    initialDate = _useMemo.initialDate;
  var corneliusOptions = useMemo(() => ({
    initialDate,
    timeInterval: options.timeInterval,
    noValuePlaceholder: options.noValuePlaceholder,
    rawNumberOnHover: options.showTooltips,
    displayAbsoluteValues: !options.percentValues,
    timeColumnTitle: options.timeColumnTitle,
    peopleColumnTitle: options.peopleColumnTitle,
    stageColumnTitle: options.stageColumnTitle,
    numberFormat: options.numberFormat,
    percentFormat: options.percentFormat,
    colors: options.colors
  }), [options, initialDate]);
  if (cohortData.length === 0) {
    return null;
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "cohort-visualization-container"
  }, /*#__PURE__*/React.createElement(Cornelius, {
    data: cohortData,
    options: corneliusOptions
  }));
}
Renderer.propTypes = RendererPropTypes;
//# sourceMappingURL=Renderer.js.map