function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import { map } from "lodash";
import React, { useMemo } from "react";
import { useDebouncedCallback } from "use-debounce";
import * as Grid from "antd/lib/grid";
import { Section, Select, Input, Checkbox, TextArea, TextAlignmentSelect, ContextHelp } from "../../../components/visualizations/editor";
import { EditorPropTypes } from "../../prop-types";
import useLoadGeoJson from "../hooks/useLoadGeoJson";
import { getGeoJsonFields } from "./utils";
function TemplateFormatHint(_ref) {
  var geoJsonProperties = _ref.geoJsonProperties;
  return (
    /*#__PURE__*/
    // @ts-expect-error ts-migrate(2746) FIXME: This JSX tag's 'children' prop expects a single ch... Remove this comment to see the full error message
    React.createElement(ContextHelp, {
      placement: "topLeft",
      arrowPointAtCenter: true
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        paddingBottom: 5
      }
    }, /*#__PURE__*/React.createElement("div", null, "All query result columns can be referenced using ", /*#__PURE__*/React.createElement("code", null, "{{ column_name }}"), " syntax."), /*#__PURE__*/React.createElement("div", null, "Use ", /*#__PURE__*/React.createElement("code", null, "{{ @@value }}"), " to access formatted value.")), geoJsonProperties.length > 0 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "p-b-5"
    }, "GeoJSON properties could be accessed by these names:"), /*#__PURE__*/React.createElement("div", {
      style: {
        maxHeight: 300,
        overflow: "auto"
      }
    }, map(geoJsonProperties, property => /*#__PURE__*/React.createElement("div", {
      key: property
    }, /*#__PURE__*/React.createElement("code", null, "{{ @@".concat(property, "}}")))))))
  );
}
TemplateFormatHint.defaultProps = {
  geoJsonProperties: []
};
export default function GeneralSettings(_ref2) {
  var options = _ref2.options,
    onOptionsChange = _ref2.onOptionsChange;
  var _useDebouncedCallback = useDebouncedCallback(onOptionsChange, 200),
    _useDebouncedCallback2 = _slicedToArray(_useDebouncedCallback, 1),
    onOptionsChangeDebounced = _useDebouncedCallback2[0];
  var _useLoadGeoJson = useLoadGeoJson(options.mapType),
    _useLoadGeoJson2 = _slicedToArray(_useLoadGeoJson, 1),
    geoJson = _useLoadGeoJson2[0];
  var geoJsonFields = useMemo(() => getGeoJsonFields(geoJson), [geoJson]);
  var templateFormatHint = /*#__PURE__*/React.createElement(TemplateFormatHint, {
    geoJsonProperties: geoJsonFields
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "choropleth-visualization-editor-format-settings"
  }, /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(Grid.Row, {
    gutter: 15
  }, /*#__PURE__*/React.createElement(Grid.Col, {
    span: 12
  }, /*#__PURE__*/React.createElement(Input, {
    label: /*#__PURE__*/React.createElement(React.Fragment, null, "Value Format", /*#__PURE__*/React.createElement(ContextHelp.NumberFormatSpecs, null)),
    "data-test": "Choropleth.Editor.ValueFormat",
    defaultValue: options.valueFormat,
    onChange: event => onOptionsChangeDebounced({
      valueFormat: event.target.value
    })
  })), /*#__PURE__*/React.createElement(Grid.Col, {
    span: 12
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Value Placeholder",
    "data-test": "Choropleth.Editor.ValuePlaceholder",
    defaultValue: options.noValuePlaceholder,
    onChange: event => onOptionsChangeDebounced({
      noValuePlaceholder: event.target.value
    })
  })))), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(Checkbox, {
    "data-test": "Choropleth.Editor.LegendVisibility",
    checked: options.legend.visible,
    onChange: event => onOptionsChange({
      legend: {
        visible: event.target.checked
      }
    })
  }, "Show Legend")), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(Grid.Row, {
    gutter: 15
  }, /*#__PURE__*/React.createElement(Grid.Col, {
    span: 12
  }, /*#__PURE__*/React.createElement(Select, {
    label: "Legend Position",
    "data-test": "Choropleth.Editor.LegendPosition",
    disabled: !options.legend.visible,
    defaultValue: options.legend.position,
    onChange: position => onOptionsChange({
      legend: {
        position
      }
    })
  }, /*#__PURE__*/React.createElement(Select.Option, {
    value: "top-left",
    "data-test": "Choropleth.Editor.LegendPosition.TopLeft"
  }, "top / left"), /*#__PURE__*/React.createElement(Select.Option, {
    value: "top-right",
    "data-test": "Choropleth.Editor.LegendPosition.TopRight"
  }, "top / right"), /*#__PURE__*/React.createElement(Select.Option, {
    value: "bottom-left",
    "data-test": "Choropleth.Editor.LegendPosition.BottomLeft"
  }, "bottom / left"), /*#__PURE__*/React.createElement(Select.Option, {
    value: "bottom-right",
    "data-test": "Choropleth.Editor.LegendPosition.BottomRight"
  }, "bottom / right"))), /*#__PURE__*/React.createElement(Grid.Col, {
    span: 12
  }, /*#__PURE__*/React.createElement(TextAlignmentSelect, {
    "data-test": "Choropleth.Editor.LegendTextAlignment",
    label: "Legend Text Alignment",
    disabled: !options.legend.visible,
    defaultValue: options.legend.alignText,
    onChange: event => onOptionsChange({
      legend: {
        alignText: event.target.value
      }
    })
  })))), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(Checkbox, {
    "data-test": "Choropleth.Editor.TooltipEnabled",
    checked: options.tooltip.enabled,
    onChange: event => onOptionsChange({
      tooltip: {
        enabled: event.target.checked
      }
    })
  }, "Show Tooltip")), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(Input, {
    label: /*#__PURE__*/React.createElement(React.Fragment, null, "Tooltip Template ", templateFormatHint),
    "data-test": "Choropleth.Editor.TooltipTemplate",
    disabled: !options.tooltip.enabled,
    defaultValue: options.tooltip.template,
    onChange: event => onOptionsChangeDebounced({
      tooltip: {
        template: event.target.value
      }
    })
  })), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(Checkbox, {
    "data-test": "Choropleth.Editor.PopupEnabled",
    checked: options.popup.enabled,
    onChange: event => onOptionsChange({
      popup: {
        enabled: event.target.checked
      }
    })
  }, "Show Popup")), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(TextArea, {
    label: /*#__PURE__*/React.createElement(React.Fragment, null, "Popup Template ", templateFormatHint),
    "data-test": "Choropleth.Editor.PopupTemplate",
    disabled: !options.popup.enabled,
    rows: 4,
    defaultValue: options.popup.template,
    onChange: event => onOptionsChangeDebounced({
      popup: {
        template: event.target.value
      }
    })
  })));
}
GeneralSettings.propTypes = EditorPropTypes;
//# sourceMappingURL=FormatSettings.js.map