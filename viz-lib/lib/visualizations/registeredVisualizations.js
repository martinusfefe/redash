function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import { find, flatten, each } from "lodash";
import PropTypes from "prop-types";
import boxPlotVisualization from "./box-plot";
import chartVisualization from "./chart";
import choroplethVisualization from "./choropleth";
import cohortVisualization from "./cohort";
import counterVisualization from "./counter";
import detailsVisualization from "./details";
import funnelVisualization from "./funnel";
import mapVisualization from "./map";
import pivotVisualization from "./pivot";
import sankeyVisualization from "./sankey";
import sunburstVisualization from "./sunburst";
import tableVisualization from "./table";
import wordCloudVisualization from "./word-cloud";
// @ts-expect-error ts-migrate(2322) FIXME: Type 'Requireable<InferProps<{ type: Validator<str... Remove this comment to see the full error message
var VisualizationConfig = PropTypes.shape({
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  getOptions: PropTypes.func.isRequired,
  isDefault: PropTypes.bool,
  isDeprecated: PropTypes.bool,
  Renderer: PropTypes.func.isRequired,
  Editor: PropTypes.func,
  // other config options
  autoHeight: PropTypes.bool,
  defaultRows: PropTypes.number,
  defaultColumns: PropTypes.number,
  minRows: PropTypes.number,
  maxRows: PropTypes.number,
  minColumns: PropTypes.number,
  maxColumns: PropTypes.number
});
var registeredVisualizations = {};
function validateVisualizationConfig(config) {
  var typeSpecs = {
    config: VisualizationConfig
  };
  var values = {
    config
  };
  PropTypes.checkPropTypes(typeSpecs, values, "prop", "registerVisualization");
}
function registerVisualization(config) {
  validateVisualizationConfig(config);
  config = _objectSpread(_objectSpread({
    Editor: () => null
  }, config), {}, {
    isDefault: config.isDefault && !config.isDeprecated
  });

  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  if (registeredVisualizations[config.type]) {
    throw new Error("Visualization ".concat(config.type, " already registered."));
  }

  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  registeredVisualizations[config.type] = config;
}
each(flatten([boxPlotVisualization, chartVisualization, choroplethVisualization, cohortVisualization, counterVisualization, detailsVisualization, funnelVisualization, mapVisualization, pivotVisualization, sankeyVisualization, sunburstVisualization, tableVisualization, wordCloudVisualization]), registerVisualization);
export default registeredVisualizations;
export function getDefaultVisualization() {
  // return any visualization explicitly marked as default, or any non-deprecated otherwise
  return (
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'isDefault' does not exist on type 'never... Remove this comment to see the full error message
    find(registeredVisualizations, visualization => visualization.isDefault) ||
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'isDeprecated' does not exist on type 'ne... Remove this comment to see the full error message
    find(registeredVisualizations, visualization => !visualization.isDeprecated)
  );
}
export function newVisualization() {
  var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  // @ts-expect-error ts-migrate(2538) FIXME: Type 'null' cannot be used as an index type.
  var visualization = type ? registeredVisualizations[type] : getDefaultVisualization();
  return {
    type: visualization.type,
    name: visualization.name,
    description: "",
    options
  };
}
//# sourceMappingURL=registeredVisualizations.js.map