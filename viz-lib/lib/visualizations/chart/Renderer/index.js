var _excluded = ["options"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import React from "react";
import { RendererPropTypes } from "../../prop-types";
import PlotlyChart from "./PlotlyChart";
import CustomPlotlyChart from "./CustomPlotlyChart";
import { visualizationsSettings } from "../../visualizationsSettings";
import "./renderer.less";
export default function Renderer(_ref) {
  var options = _ref.options,
    props = _objectWithoutProperties(_ref, _excluded);
  if (options.globalSeriesType === "custom" && visualizationsSettings.allowCustomJSVisualizations) {
    return /*#__PURE__*/React.createElement(CustomPlotlyChart, _extends({
      options: options
    }, props));
  }
  return /*#__PURE__*/React.createElement(PlotlyChart, _extends({
    options: options
  }, props));
}
Renderer.propTypes = RendererPropTypes;
//# sourceMappingURL=index.js.map