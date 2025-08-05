"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Renderer;
var _react = _interopRequireDefault(require("react"));
var _propTypes = require("../../prop-types");
var _PlotlyChart = _interopRequireDefault(require("./PlotlyChart"));
var _CustomPlotlyChart = _interopRequireDefault(require("./CustomPlotlyChart"));
var _visualizationsSettings = require("../../visualizationsSettings");
require("./renderer.less");
var _excluded = ["options"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function Renderer(_ref) {
  var options = _ref.options,
    props = _objectWithoutProperties(_ref, _excluded);
  if (options.globalSeriesType === "custom" && _visualizationsSettings.visualizationsSettings.allowCustomJSVisualizations) {
    return /*#__PURE__*/_react.default.createElement(_CustomPlotlyChart.default, _extends({
      options: options
    }, props));
  }
  return /*#__PURE__*/_react.default.createElement(_PlotlyChart.default, _extends({
    options: options
  }, props));
}
Renderer.propTypes = _propTypes.RendererPropTypes;
//# sourceMappingURL=index.js.map