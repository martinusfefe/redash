import { isNil, map, filter, difference } from "lodash";
import React, { useMemo } from "react";
import { Section, Select } from "../../../components/visualizations/editor";
import { EditorPropTypes } from "../../prop-types";
function getColumns(column, unusedColumns) {
  return filter([column, ...unusedColumns], v => !isNil(v));
}
export default function GeneralSettings(_ref) {
  var options = _ref.options,
    data = _ref.data,
    onOptionsChange = _ref.onOptionsChange;
  var unusedColumns = useMemo(() => difference(map(data.columns, c => c.name), [options.latColName, options.lonColName, options.classify]), [data, options.latColName, options.lonColName, options.classify]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(Select, {
    label: "Latitude Column Name",
    "data-test": "Map.Editor.LatitudeColumnName",
    value: options.latColName,
    onChange: latColName => onOptionsChange({
      latColName
    })
  }, map(getColumns(options.latColName, unusedColumns), col =>
  /*#__PURE__*/
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message
  React.createElement(Select.Option, {
    key: col,
    "data-test": "Map.Editor.LatitudeColumnName." + col
  }, col)))), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(Select, {
    label: "Longitude Column Name",
    "data-test": "Map.Editor.LongitudeColumnName",
    value: options.lonColName,
    onChange: lonColName => onOptionsChange({
      lonColName
    })
  }, map(getColumns(options.lonColName, unusedColumns), col =>
  /*#__PURE__*/
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message
  React.createElement(Select.Option, {
    key: col,
    "data-test": "Map.Editor.LongitudeColumnName." + col
  }, col)))), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(Select, {
    label: "Group By",
    "data-test": "Map.Editor.GroupBy",
    allowClear: true,
    placeholder: "none",
    value: options.classify || undefined,
    onChange: column => onOptionsChange({
      classify: column || null
    })
  }, map(getColumns(options.classify, unusedColumns), col =>
  /*#__PURE__*/
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message
  React.createElement(Select.Option, {
    key: col,
    "data-test": "Map.Editor.GroupBy." + col
  }, col)))));
}
GeneralSettings.propTypes = EditorPropTypes;
//# sourceMappingURL=GeneralSettings.js.map