import moment from "moment";
import { visualizationsSettings } from "../visualizations/visualizationsSettings";
function formatDateTime(value) {
  if (!value) {
    return "";
  }
  var parsed = moment(value);
  if (!parsed.isValid()) {
    return "-";
  }
  return parsed.format(visualizationsSettings.dateTimeFormat);
}
function formatDate(value) {
  if (!value) {
    return "";
  }
  var parsed = moment(value);
  if (!parsed.isValid()) {
    return "-";
  }
  return parsed.format(visualizationsSettings.dateFormat);
}
export function formatColumnValue(value) {
  var columnType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  if (moment.isMoment(value)) {
    if (columnType === "date") {
      return formatDate(value);
    }
    return formatDateTime(value);
  }
  if (typeof value === "boolean") {
    return value.toString();
  }
  return value;
}
//# sourceMappingURL=utils.js.map