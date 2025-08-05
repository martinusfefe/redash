import { map } from "lodash";
import React from "react";
import { Section, Select, ColorPicker } from "../../../components/visualizations/editor";
import { EditorPropTypes } from "../../prop-types";
import ColorPalette from "../../ColorPalette";
var ColorSchemes = ["Blackbody", "Bluered", "Blues", "Earth", "Electric", "Greens", "Greys", "Hot", "Jet", "Picnic", "Portland", "Rainbow", "RdBu", "Reds", "Viridis", "YlGnBu", "YlOrRd", "Custom..."];
export default function HeatmapColorsSettings(_ref) {
  var options = _ref.options,
    onOptionsChange = _ref.onOptionsChange;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(Select, {
    label: "Color Scheme",
    "data-test": "Chart.Colors.Heatmap.ColorScheme",
    placeholder: "Choose Color Scheme...",
    allowClear: true,
    value: options.colorScheme || undefined,
    onChange: value => onOptionsChange({
      colorScheme: value || null
    })
  }, map(ColorSchemes, scheme =>
  /*#__PURE__*/
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message
  React.createElement(Select.Option, {
    key: scheme,
    value: scheme,
    "data-test": "Chart.Colors.Heatmap.ColorScheme.".concat(scheme)
  }, scheme)))), options.colorScheme === "Custom..." && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(ColorPicker, {
    layout: "horizontal",
    label: "Min Color:",
    "data-test": "Chart.Colors.Heatmap.MinColor",
    interactive: true,
    placement: "topLeft",
    presetColors: ColorPalette,
    color: options.heatMinColor,
    onChange: heatMinColor => onOptionsChange({
      heatMinColor
    })
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'Label' does not exist on type '({ classN... Remove this comment to see the full error message
    ,
    addonAfter: /*#__PURE__*/React.createElement(ColorPicker.Label, {
      color: options.heatMinColor,
      presetColors: ColorPalette
    })
  })), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(ColorPicker, {
    layout: "horizontal",
    label: "Max Color:",
    "data-test": "Chart.Colors.Heatmap.MaxColor",
    interactive: true,
    placement: "topRight",
    presetColors: ColorPalette,
    color: options.heatMaxColor,
    onChange: heatMaxColor => onOptionsChange({
      heatMaxColor
    })
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'Label' does not exist on type '({ classN... Remove this comment to see the full error message
    ,
    addonAfter: /*#__PURE__*/React.createElement(ColorPicker.Label, {
      color: options.heatMaxColor,
      presetColors: ColorPalette
    })
  }))));
}
HeatmapColorsSettings.propTypes = EditorPropTypes;
//# sourceMappingURL=HeatmapColorsSettings.js.map