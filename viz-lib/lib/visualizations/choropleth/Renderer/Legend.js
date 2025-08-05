"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Legend;
const lodash_1 = require("lodash");
const react_1 = __importDefault(require("react"));
const ColorPicker_1 = __importDefault(require("@/components/ColorPicker"));
function Legend({ items, alignText }) {
    return (react_1.default.createElement("div", { className: "choropleth-visualization-legend" }, (0, lodash_1.map)(items, (item, index) => (react_1.default.createElement("div", { key: `legend${index}`, className: "legend-item" },
        react_1.default.createElement(ColorPicker_1.default.Swatch, { color: item.color }),
        react_1.default.createElement("div", { className: `legend-item-text text-${alignText}` }, item.text))))));
}
Legend.defaultProps = {
    items: [],
    alignText: "left",
};
