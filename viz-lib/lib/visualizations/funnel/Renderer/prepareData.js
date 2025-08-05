"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = prepareData;
const lodash_1 = require("lodash");
const moment_1 = __importDefault(require("moment"));
const visualizationsSettings_1 = require("@/visualizations/visualizationsSettings");
function stepValueToString(value) {
    if (moment_1.default.isMoment(value)) {
        const format = visualizationsSettings_1.visualizationsSettings.dateTimeFormat || "DD/MM/YYYY HH:mm";
        return value.format(format);
    }
    return (0, lodash_1.toString)(value);
}
function prepareData(rows, options) {
    if (rows.length === 0 || !options.stepCol.colName || !options.valueCol.colName) {
        return [];
    }
    rows = [...rows];
    if (options.sortKeyCol.colName) {
        rows = (0, lodash_1.sortBy)(rows, options.sortKeyCol.colName);
    }
    if (options.sortKeyCol.reverse) {
        rows = rows.reverse();
    }
    const data = (0, lodash_1.map)(rows, row => ({
        step: stepValueToString(row[options.stepCol.colName]),
        value: parseFloat(row[options.valueCol.colName]) || 0.0,
    }));
    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    const maxVal = (0, lodash_1.maxBy)(data, d => d.value).value;
    data.forEach((d, i) => {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'pctMax' does not exist on type '{ step: ... Remove this comment to see the full error message
        d.pctMax = (d.value / maxVal) * 100.0;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'pctPrevious' does not exist on type '{ s... Remove this comment to see the full error message
        d.pctPrevious = i === 0 || d.value === data[i - 1].value ? 100.0 : (d.value / data[i - 1].value) * 100.0;
    });
    return data.slice(0, options.itemsLimit);
}
