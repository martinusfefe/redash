function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import _ from "lodash";
import { visualizationsSettings } from "../visualizationsSettings";
var DEFAULT_OPTIONS = {
  itemsPerPage: 25,
  paginationSize: "default" // not editable through Editor
};

var filterTypes = ["filter", "multi-filter", "multiFilter"];
function getColumnNameWithoutType(column) {
  var typeSplit;
  if (column.indexOf("::") !== -1) {
    typeSplit = "::";
  } else if (column.indexOf("__") !== -1) {
    typeSplit = "__";
  } else {
    return column;
  }
  var parts = column.split(typeSplit);
  if (parts[0] === "" && parts.length === 2) {
    return parts[1];
  }
  if (!_.includes(filterTypes, parts[1])) {
    return column;
  }
  return parts[0];
}
function getColumnContentAlignment(type) {
  return ["integer", "float", "boolean", "date", "datetime"].indexOf(type) >= 0 ? "right" : "left";
}
function getDefaultColumnsOptions(columns) {
  var displayAs = {
    integer: "number",
    float: "number",
    boolean: "boolean",
    date: "datetime",
    datetime: "datetime"
  };
  return _.map(columns, (col, index) => ({
    name: col.name,
    type: col.type,
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    displayAs: displayAs[col.type] || "string",
    visible: true,
    order: 100000 + index,
    title: getColumnNameWithoutType(col.name),
    allowSearch: false,
    alignContent: getColumnContentAlignment(col.type),
    // `string` cell options
    allowHTML: false,
    highlightLinks: false
  }));
}
function getDefaultFormatOptions(column) {
  var dateTimeFormat = {
    date: visualizationsSettings.dateFormat || "DD/MM/YYYY",
    datetime: visualizationsSettings.dateTimeFormat || "DD/MM/YYYY HH:mm"
  };
  var numberFormat = {
    integer: visualizationsSettings.integerFormat || "0,0",
    float: visualizationsSettings.floatFormat || "0,0.00"
  };
  return {
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    dateTimeFormat: dateTimeFormat[column.type],
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    numberFormat: numberFormat[column.type],
    nullValue: visualizationsSettings.nullValue,
    booleanValues: visualizationsSettings.booleanValues || ["false", "true"],
    // `image` cell options
    imageUrlTemplate: "{{ @ }}",
    imageTitleTemplate: "{{ @ }}",
    imageWidth: "",
    imageHeight: "",
    // `link` cell options
    linkUrlTemplate: "{{ @ }}",
    linkTextTemplate: "{{ @ }}",
    linkTitleTemplate: "{{ @ }}",
    linkOpenInNewTab: true
  };
}
function wereColumnsReordered(queryColumns, visualizationColumns) {
  queryColumns = _.map(queryColumns, col => col.name);
  visualizationColumns = _.map(visualizationColumns, col => col.name);

  // Some columns may be removed - so skip them (but keep original order)
  visualizationColumns = _.filter(visualizationColumns, col => _.includes(queryColumns, col));
  // Pick query columns that were previously saved with viz (but keep order too)
  queryColumns = _.filter(queryColumns, col => _.includes(visualizationColumns, col));

  // Both array now have the same size as they both contains only common columns
  // (in fact, it was an intersection, that kept order of items on both arrays).
  // Now check for equality item-by-item; if common columns are in the same order -
  // they were not reordered in editor
  for (var i = 0; i < queryColumns.length; i += 1) {
    if (visualizationColumns[i] !== queryColumns[i]) {
      return true;
    }
  }
  return false;
}
function getColumnsOptions(columns, visualizationColumns) {
  var options = getDefaultColumnsOptions(columns);
  if (wereColumnsReordered(columns, visualizationColumns)) {
    visualizationColumns = _.fromPairs(_.map(visualizationColumns, (col, index) => [col.name, _.extend({}, col, {
      order: index
    })]));
  } else {
    visualizationColumns = _.fromPairs(_.map(visualizationColumns, col => [col.name, _.omit(col, "order")]));
  }
  _.each(options, col => _.extend(col, visualizationColumns[col.name]));
  return _.sortBy(options, "order");
}
export default function getOptions(options, _ref) {
  var columns = _ref.columns;
  options = _objectSpread(_objectSpread({}, DEFAULT_OPTIONS), options);
  options.columns = _.map(getColumnsOptions(columns, options.columns), col => _objectSpread(_objectSpread({}, getDefaultFormatOptions(col)), col));
  return options;
}
//# sourceMappingURL=getOptions.js.map