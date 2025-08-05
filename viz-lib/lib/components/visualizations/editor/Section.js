"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Section;
var _react = _interopRequireDefault(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
require("./Section.less");
var _excluded = ["className", "children"],
  _excluded2 = ["className", "children"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
// @ts-expect-error ts-migrate(2700) FIXME: Rest types may only be created from object types.
function SectionTitle(_ref) {
  var className = _ref.className,
    children = _ref.children,
    props = _objectWithoutProperties(_ref, _excluded);
  if (!children) {
    return null;
  }
  return /*#__PURE__*/_react.default.createElement("h4", _extends({
    className: (0, _classnames.default)("visualization-editor-section-title", className)
  }, props), children);
}
SectionTitle.defaultProps = {
  className: null,
  children: null
};
// @ts-expect-error ts-migrate(2700) FIXME: Rest types may only be created from object types.
function Section(_ref2) {
  var className = _ref2.className,
    children = _ref2.children,
    props = _objectWithoutProperties(_ref2, _excluded2);
  return /*#__PURE__*/_react.default.createElement("div", _extends({
    className: (0, _classnames.default)("visualization-editor-section", className)
  }, props), children);
}
Section.defaultProps = {
  className: null,
  children: null
};
Section.Title = SectionTitle;
//# sourceMappingURL=Section.js.map