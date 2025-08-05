import { isString, isUndefined } from "lodash";
import React from "react";
import JsonViewInteractive from "../../../components/json-view-interactive/JsonViewInteractive";
import { visualizationsSettings } from "../../visualizationsSettings";
export default function initJsonColumn(column) {
  function prepareData(row) {
    var text = row[column.name];
    if (isString(text) && text.length <= visualizationsSettings.tableCellMaxJSONSize) {
      try {
        return {
          text,
          value: JSON.parse(text)
        };
      } catch (e) {
        // ignore `JSON.parse` error and return default value
      }
    }
    return {
      text,
      value: undefined
    };
  }
  function JsonColumn(_ref) {
    var row = _ref.row;
    // eslint-disable-line react/prop-types
    var _prepareData = prepareData(row),
      text = _prepareData.text,
      value = _prepareData.value;
    if (isUndefined(value)) {
      return /*#__PURE__*/React.createElement("div", {
        className: "json-cell-invalid"
      }, "" + text);
    }
    return /*#__PURE__*/React.createElement("div", {
      className: "json-cell-valid"
    }, /*#__PURE__*/React.createElement(JsonViewInteractive, {
      value: value
    }));
  }
  JsonColumn.prepareData = prepareData;
  return JsonColumn;
}
initJsonColumn.friendlyName = "JSON";
//# sourceMappingURL=json.js.map