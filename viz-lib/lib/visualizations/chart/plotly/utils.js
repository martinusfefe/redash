"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanNumber = cleanNumber;
exports.getSeriesAxis = getSeriesAxis;
exports.normalizeValue = normalizeValue;
const lodash_1 = require("lodash");
const moment_1 = __importDefault(require("moment"));
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'plot... Remove this comment to see the full error message
const clean_number_1 = __importDefault(require("plotly.js/src/lib/clean_number"));
function cleanNumber(value) {
    return (0, lodash_1.isUndefined)(value) ? value : (0, clean_number_1.default)(value);
}
function getSeriesAxis(series, options) {
    const seriesOptions = options.seriesOptions[series.name] || { type: options.globalSeriesType };
    if (seriesOptions.yAxis === 1 && (!options.series.stacking || seriesOptions.type === "line")) {
        return "y2";
    }
    return "y";
}
function normalizeValue(value, axisType, dateTimeFormat = "YYYY-MM-DD HH:mm:ss") {
    if (axisType === "datetime" && moment_1.default.utc(value).isValid()) {
        value = moment_1.default.utc(value);
    }
    if (moment_1.default.isMoment(value)) {
        return value.format(dateTimeFormat);
    }
    return value;
}
