"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getOptions;
const lodash_1 = require("lodash");
const ColorPalette_1 = __importDefault(require("../../visualizations/ColorPalette"));
const DEFAULT_OPTIONS = {
    timeInterval: "daily",
    mode: "diagonal",
    dateColumn: "date",
    stageColumn: "day_number",
    totalColumn: "total",
    valueColumn: "value",
    showTooltips: true,
    percentValues: true,
    timeColumnTitle: "Time",
    peopleColumnTitle: "Users",
    stageColumnTitle: "{{ @ }}",
    numberFormat: "0,0[.]00",
    percentFormat: "0.00%",
    noValuePlaceholder: "-",
    colors: {
        min: "#ffffff",
        max: ColorPalette_1.default["Dark Blue"],
        steps: 7,
    },
};
function getOptions(options) {
    return (0, lodash_1.merge)({}, DEFAULT_OPTIONS, options);
}
