var _excluded = ["type", "data", "options", "visualizationName", "addonBefore", "addonAfter"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import { isEqual } from "lodash";
import React, { useEffect, useRef } from "react";
import ErrorBoundary, { ErrorMessage } from "../components/ErrorBoundary";
import registeredVisualizations from "./registeredVisualizations";

/*
(ts-migrate) TODO: Migrate the remaining prop types
...RendererPropTypes
*/

export default function Renderer(_ref) {
  var type = _ref.type,
    data = _ref.data,
    optionsProp = _ref.options,
    visualizationName = _ref.visualizationName,
    addonBefore = _ref.addonBefore,
    addonAfter = _ref.addonAfter,
    otherProps = _objectWithoutProperties(_ref, _excluded);
  var lastOptions = useRef();
  var errorHandlerRef = useRef();

  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  var _registeredVisualizat = registeredVisualizations[type],
    Renderer = _registeredVisualizat.Renderer,
    getOptions = _registeredVisualizat.getOptions;

  // Avoid unnecessary updates (which may be expensive or cause issues with
  // internal state of some visualizations like Table) - compare options deeply
  // and use saved reference if nothing changed
  // More details: https://github.com/getredash/redash/pull/3963#discussion_r306935810
  var options = getOptions(optionsProp, data);
  if (isEqual(lastOptions.current, options)) {
    options = lastOptions.current;
  }
  lastOptions.current = options;
  useEffect(() => {
    if (errorHandlerRef.current) {
      // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
      errorHandlerRef.current.reset();
    }
  }, [optionsProp, data]);
  return /*#__PURE__*/React.createElement("div", {
    className: "visualization-renderer"
  }, addonBefore, /*#__PURE__*/React.createElement(ErrorBoundary, {
    ref: errorHandlerRef,
    renderError: () => /*#__PURE__*/React.createElement(ErrorMessage, null, "Error while rendering visualization.")
  }, /*#__PURE__*/React.createElement("div", {
    className: "visualization-renderer-wrapper"
  }, /*#__PURE__*/React.createElement(Renderer, _extends({
    options: options,
    data: data,
    visualizationName: visualizationName
  }, otherProps)))), addonAfter);
}
//# sourceMappingURL=Renderer.js.map