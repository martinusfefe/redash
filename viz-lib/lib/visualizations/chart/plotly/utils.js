import { isUndefined } from "lodash";
import moment from "moment";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'plot... Remove this comment to see the full error message
import plotlyCleanNumber from "plotly.js/src/lib/clean_number";
export function cleanNumber(value) {
  return isUndefined(value) ? value : plotlyCleanNumber(value);
}
export function getSeriesAxis(series, options) {
  var seriesOptions = options.seriesOptions[series.name] || {
    type: options.globalSeriesType
  };
  if (seriesOptions.yAxis === 1 && (!options.series.stacking || seriesOptions.type === "line")) {
    return "y2";
  }
  return "y";
}
export function normalizeValue(value, axisType) {
  var dateTimeFormat = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "YYYY-MM-DD HH:mm:ss";
  if (axisType === "datetime" && moment.utc(value).isValid()) {
    value = moment.utc(value);
  }
  if (moment.isMoment(value)) {
    return value.format(dateTimeFormat);
  }
  return value;
}
//# sourceMappingURL=utils.js.map