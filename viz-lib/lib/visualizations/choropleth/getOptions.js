"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getOptions;
const lodash_1 = require("lodash");
const visualizationsSettings_1 = require("@/visualizations/visualizationsSettings");
const ColorPalette_1 = __importDefault(require("./ColorPalette"));
function getDefaultMap() {
    return (0, lodash_1.first)((0, lodash_1.keys)(visualizationsSettings_1.visualizationsSettings.choroplethAvailableMaps)) || null;
}
const DEFAULT_OPTIONS = {
    mapType: "countries",
    keyColumn: null,
    targetField: null,
    valueColumn: null,
    clusteringMode: "e",
    steps: 5,
    valueFormat: "0,0.00",
    noValuePlaceholder: "N/A",
    colors: {
        min: ColorPalette_1.default["Light Blue"],
        max: ColorPalette_1.default["Dark Blue"],
        background: ColorPalette_1.default.White,
        borders: ColorPalette_1.default.White,
        noValue: ColorPalette_1.default["Light Gray"],
    },
    legend: {
        visible: true,
        position: "bottom-left",
        alignText: "right",
    },
    tooltip: {
        enabled: true,
        template: "<b>{{ @@name }}</b>: {{ @@value }}",
    },
    popup: {
        enabled: true,
        template: "Country: <b>{{ @@name_long }} ({{ @@iso_a2 }})</b>\n<br>\nValue: <b>{{ @@value }}</b>",
    },
};
function getOptions(options) {
    const result = (0, lodash_1.merge)({}, DEFAULT_OPTIONS, options);
    // Both renderer and editor always provide new `bounds` array, so no need to clone it here.
    // Keeping original object also reduces amount of updates in components
    result.bounds = (0, lodash_1.get)(options, "bounds");
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    if ((0, lodash_1.isNil)(visualizationsSettings_1.visualizationsSettings.choroplethAvailableMaps[result.mapType])) {
        result.mapType = getDefaultMap();
    }
    // backward compatibility
    if (!(0, lodash_1.isNil)(result.countryCodeColumn)) {
        result.keyColumn = result.countryCodeColumn;
    }
    delete result.countryCodeColumn;
    if (!(0, lodash_1.isNil)(result.countryCodeType)) {
        result.targetField = result.countryCodeType;
    }
    delete result.countryCodeType;
    return result;
}
