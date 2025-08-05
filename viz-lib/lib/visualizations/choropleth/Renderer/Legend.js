import { map } from "lodash";
import React from "react";
import ColorPicker from "../../../components/ColorPicker";
export default function Legend(_ref) {
  var items = _ref.items,
    alignText = _ref.alignText;
  return /*#__PURE__*/React.createElement("div", {
    className: "choropleth-visualization-legend"
  }, map(items, (item, index) => /*#__PURE__*/React.createElement("div", {
    key: "legend".concat(index),
    className: "legend-item"
  }, /*#__PURE__*/React.createElement(ColorPicker.Swatch, {
    color: item.color
  }), /*#__PURE__*/React.createElement("div", {
    className: "legend-item-text text-".concat(alignText)
  }, item.text))));
}
Legend.defaultProps = {
  items: [],
  alignText: "left"
};
//# sourceMappingURL=Legend.js.map