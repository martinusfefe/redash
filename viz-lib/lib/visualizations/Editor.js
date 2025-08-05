var _excluded = ["type", "options", "data"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import React, { useMemo } from "react";
import registeredVisualizations from "./registeredVisualizations";

/*
(ts-migrate) TODO: Migrate the remaining prop types
...EditorPropTypes
*/

export default function Editor(_ref) {
  var type = _ref.type,
    optionsProp = _ref.options,
    data = _ref.data,
    otherProps = _objectWithoutProperties(_ref, _excluded);
  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  var _registeredVisualizat = registeredVisualizations[type],
    Editor = _registeredVisualizat.Editor,
    getOptions = _registeredVisualizat.getOptions;
  var options = useMemo(() => getOptions(optionsProp, data), [optionsProp, data]);
  return /*#__PURE__*/React.createElement(Editor, _extends({
    options: options,
    data: data
  }, otherProps));
}
//# sourceMappingURL=Editor.js.map