"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ColorPaletteTypes = exports.ColorPaletteArray = exports.BaseColors = exports.AllColorPalettes = exports.AllColorPaletteArrays = exports.AdditionalColors = void 0;
var _lodash = require("lodash");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
// Define color palettes
var BaseColors = {
  Blue: "#356AFF",
  Red: "#E92828",
  Green: "#3BD973",
  Purple: "#604FE9",
  Cyan: "#50F5ED",
  Orange: "#FB8D3D",
  "Light Blue": "#799CFF",
  Lilac: "#B554FF",
  "Light Green": "#8CFFB4",
  Brown: "#A55F2A",
  Black: "#000000",
  Gray: "#494949",
  Pink: "#FF7DE3",
  "Dark Blue": "#002FB4"
};

// Additional colors for the user to choose from
exports.BaseColors = BaseColors;
var AdditionalColors = {
  "Indian Red": "#981717",
  "Green 2": "#17BF51",
  "Green 3": "#049235",
  "Dark Turquoise": "#00B6EB",
  "Dark Violet": "#A58AFF",
  "Pink 2": "#C63FA9"
};
exports.AdditionalColors = AdditionalColors;
var Viridis = {
  1: '#440154',
  2: '#48186a',
  3: '#472d7b',
  4: '#424086',
  5: '#3b528b',
  6: '#33638d',
  7: '#2c728e',
  8: '#26828e',
  9: '#21918c',
  10: '#1fa088',
  11: '#28ae80',
  12: '#3fbc73',
  13: '#5ec962',
  14: '#84d44b',
  15: '#addc30',
  16: '#d8e219',
  17: '#fde725'
};
var Tableau = {
  1: "#4e79a7",
  2: "#f28e2c",
  3: "#e15759",
  4: "#76b7b2",
  5: "#59a14f",
  6: "#edc949",
  7: "#af7aa1",
  8: "#ff9da7",
  9: "#9c755f",
  10: "#bab0ab"
};
var D3Category10 = {
  1: "#1f77b4",
  2: "#ff7f0e",
  3: "#2ca02c",
  4: "#d62728",
  5: "#9467bd",
  6: "#8c564b",
  7: "#e377c2",
  8: "#7f7f7f",
  9: "#bcbd22",
  10: "#17becf"
};
var ColorPalette = _objectSpread(_objectSpread({}, BaseColors), AdditionalColors);
var ColorPaletteArray = (0, _lodash.values)(ColorPalette);
exports.ColorPaletteArray = ColorPaletteArray;
var _default = ColorPalette;
exports.default = _default;
var AllColorPalettes = {
  "Redash": ColorPalette,
  "Viridis": Viridis,
  "Tableau 10": Tableau,
  "D3 Category 10": D3Category10
};
exports.AllColorPalettes = AllColorPalettes;
var AllColorPaletteArrays = {
  "Redash": ColorPaletteArray,
  "Viridis": (0, _lodash.values)(Viridis),
  "Tableau 10": (0, _lodash.values)(Tableau),
  "D3 Category 10": (0, _lodash.values)(D3Category10)
};
exports.AllColorPaletteArrays = AllColorPaletteArrays;
var ColorPaletteTypes = {
  "Redash": 'discrete',
  "Viridis": 'continuous',
  "Tableau 10": 'discrete',
  "D3 Category 10": 'discrete'
};
exports.ColorPaletteTypes = ColorPaletteTypes;
//# sourceMappingURL=ColorPalette.js.map