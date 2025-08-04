/* eslint-disable react/prop-types */
import React from "react";
import createTabbedEditor from "../../../components/visualizations/editor/createTabbedEditor";
import GeneralSettings from "./GeneralSettings";
import XAxisSettings from "./XAxisSettings";
import YAxisSettings from "./YAxisSettings";
import SeriesSettings from "./SeriesSettings";
import ColorsSettings from "./ColorsSettings";
import DataLabelsSettings from "./DataLabelsSettings";
import CustomChartSettings from "./CustomChartSettings";
import "./editor.less";
var isCustomChart = options => options.globalSeriesType === "custom";
var isPieChart = options => options.globalSeriesType === "pie";
export default createTabbedEditor([{
  key: "General",
  title: "General",
  component: props => /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(GeneralSettings, props), isCustomChart(props.options) && /*#__PURE__*/React.createElement(CustomChartSettings, props))
}, {
  key: "XAxis",
  title: _ref => {
    var swappedAxes = _ref.swappedAxes;
    return !swappedAxes ? "X Axis" : "Y Axis";
  },
  component: XAxisSettings,
  isAvailable: options => !isCustomChart(options) && !isPieChart(options)
}, {
  key: "YAxis",
  title: _ref2 => {
    var swappedAxes = _ref2.swappedAxes;
    return !swappedAxes ? "Y Axis" : "X Axis";
  },
  component: YAxisSettings,
  isAvailable: options => !isCustomChart(options) && !isPieChart(options)
}, {
  key: "Series",
  title: "Series",
  component: SeriesSettings,
  isAvailable: options => !isCustomChart(options)
}, {
  key: "Colors",
  title: "Colors",
  component: ColorsSettings,
  isAvailable: options => !isCustomChart(options)
}, {
  key: "DataLabels",
  title: "Data Labels",
  component: DataLabelsSettings,
  isAvailable: options => !isCustomChart(options)
}]);
//# sourceMappingURL=index.js.map