function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import { isString, map, filter, get } from "lodash";
import React, { useMemo, useCallback } from "react";
import * as Grid from "antd/lib/grid";
import { EditorPropTypes } from "../../prop-types";
import { Section, Select } from "../../../components/visualizations/editor";
import { visualizationsSettings } from "../../visualizationsSettings";
import useLoadGeoJson from "../hooks/useLoadGeoJson";
import { getGeoJsonFields } from "./utils";
export default function GeneralSettings(_ref) {
  var options = _ref.options,
    data = _ref.data,
    onOptionsChange = _ref.onOptionsChange;
  var _useLoadGeoJson = useLoadGeoJson(options.mapType),
    _useLoadGeoJson2 = _slicedToArray(_useLoadGeoJson, 2),
    geoJson = _useLoadGeoJson2[0],
    isLoadingGeoJson = _useLoadGeoJson2[1];
  var geoJsonFields = useMemo(() => getGeoJsonFields(geoJson), [geoJson]);

  // While geoJson is loading - show last selected field in select
  var targetFields = isLoadingGeoJson ? filter([options.targetField], isString) : geoJsonFields;
  var fieldNames = get(visualizationsSettings, "choroplethAvailableMaps.".concat(options.mapType, ".fieldNames"), {});
  var handleMapChange = useCallback(mapType => {
    onOptionsChange({
      mapType: mapType || null
    });
  }, [onOptionsChange]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(Select, {
    label: "Map",
    "data-test": "Choropleth.Editor.MapType",
    defaultValue: options.mapType,
    onChange: handleMapChange
  }, map(visualizationsSettings.choroplethAvailableMaps, (_, mapType) =>
  /*#__PURE__*/
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message
  React.createElement(Select.Option, {
    key: mapType,
    "data-test": "Choropleth.Editor.MapType.".concat(mapType)
  }, get(visualizationsSettings, "choroplethAvailableMaps.".concat(mapType, ".name"), mapType))))), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(Grid.Row, {
    gutter: 15
  }, /*#__PURE__*/React.createElement(Grid.Col, {
    span: 12
  }, /*#__PURE__*/React.createElement(Select, {
    label: "Key Column",
    className: "w-100",
    "data-test": "Choropleth.Editor.KeyColumn",
    disabled: data.columns.length === 0,
    defaultValue: options.keyColumn,
    onChange: keyColumn => onOptionsChange({
      keyColumn
    })
  }, map(data.columns, _ref2 => {
    var name = _ref2.name;
    return (
      /*#__PURE__*/
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message
      React.createElement(Select.Option, {
        key: name,
        "data-test": "Choropleth.Editor.KeyColumn.".concat(name)
      }, name)
    );
  }))), /*#__PURE__*/React.createElement(Grid.Col, {
    span: 12
  }, /*#__PURE__*/React.createElement(Select, {
    label: "Target Field",
    className: "w-100",
    "data-test": "Choropleth.Editor.TargetField",
    disabled: isLoadingGeoJson || targetFields.length === 0,
    loading: isLoadingGeoJson,
    value: options.targetField,
    onChange: targetField => onOptionsChange({
      targetField
    })
  }, map(targetFields, field =>
  /*#__PURE__*/
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message
  React.createElement(Select.Option, {
    key: field,
    "data-test": "Choropleth.Editor.TargetField.".concat(field)
  }, fieldNames[field] || field)))))), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(Select, {
    label: "Value Column",
    "data-test": "Choropleth.Editor.ValueColumn",
    disabled: data.columns.length === 0,
    defaultValue: options.valueColumn,
    onChange: valueColumn => onOptionsChange({
      valueColumn
    })
  }, map(data.columns, _ref3 => {
    var name = _ref3.name;
    return (
      /*#__PURE__*/
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message
      React.createElement(Select.Option, {
        key: name,
        "data-test": "Choropleth.Editor.ValueColumn.".concat(name)
      }, name)
    );
  }))));
}
GeneralSettings.propTypes = EditorPropTypes;
//# sourceMappingURL=GeneralSettings.js.map