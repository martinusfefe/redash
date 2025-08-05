"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = prepareDefaultData;
const lodash_1 = require("lodash");
const chooseTextColorForBackground_1 = __importDefault(require("@/lib/chooseTextColorForBackground"));
const ColorPalette_1 = require("@/visualizations/ColorPalette");
const utils_1 = require("./utils");
function getSeriesColor(options, seriesOptions, seriesIndex, numSeries) {
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    let palette = ColorPalette_1.AllColorPaletteArrays[options.color_scheme];
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    if (ColorPalette_1.ColorPaletteTypes[options.color_scheme] === 'continuous' && palette.length > numSeries) {
        const step = (palette.length - 1) / (numSeries - 1 || 1);
        const index = Math.round(step * seriesIndex);
        return seriesOptions.color || palette[index % palette.length];
    }
    return seriesOptions.color || palette[seriesIndex % palette.length];
}
function getHoverInfoPattern(options) {
    const hasX = /{{\s*@@x\s*}}/.test(options.textFormat);
    const hasName = /{{\s*@@name\s*}}/.test(options.textFormat);
    let result = "text";
    if (!hasX)
        result += "+x";
    if (!hasName)
        result += "+name";
    return result;
}
function prepareBarSeries(series, options, additionalOptions) {
    series.type = "bar";
    series.offsetgroup = (0, lodash_1.toString)(additionalOptions.index);
    if (options.showDataLabels) {
        series.textposition = "inside";
    }
    else {
        series.textposition = "none";
    }
    return series;
}
function prepareLineSeries(series, options) {
    series.mode = "lines" + (options.showDataLabels ? "+text" : "");
    return series;
}
function prepareAreaSeries(series, options) {
    series.mode = "lines" + (options.showDataLabels ? "+text" : "");
    series.fill = options.series.stacking ? "tonexty" : "tozeroy";
    return series;
}
function prepareScatterSeries(series, options) {
    series.type = "scatter";
    series.mode = "markers" + (options.showDataLabels ? "+text" : "");
    return series;
}
function prepareBubbleSeries(series, options, { seriesColor, data }) {
    const coefficient = options.coefficient || 1;
    series.mode = "markers";
    series.marker = {
        color: seriesColor,
        size: (0, lodash_1.map)(data, i => i.size * coefficient),
        sizemode: options.sizemode || "diameter",
    };
    return series;
}
function prepareBoxSeries(series, options, { seriesColor }) {
    series.type = "box";
    series.mode = "markers";
    series.boxpoints = "outliers";
    series.hoverinfo = false;
    series.marker = {
        color: seriesColor,
        size: 3,
    };
    if (options.showpoints) {
        series.boxpoints = "all";
        series.jitter = 0.3;
        series.pointpos = -1.8;
    }
    return series;
}
function prepareSeries(series, options, numSeries, additionalOptions) {
    const { hoverInfoPattern, index } = additionalOptions;
    const seriesOptions = (0, lodash_1.extend)({ type: options.globalSeriesType, yAxis: 0 }, options.seriesOptions[series.name]);
    const seriesColor = getSeriesColor(options, seriesOptions, index, numSeries);
    const seriesYAxis = (0, utils_1.getSeriesAxis)(series, options);
    // Sort by x - `Map` preserves order of items
    const data = options.sortX ? (0, lodash_1.sortBy)(series.data, d => (0, utils_1.normalizeValue)(d.x, options.xAxis.type)) : series.data;
    // For bubble/scatter charts `y` may be any (similar to `x`) - numeric is only bubble size;
    // for other types `y` is always number
    const cleanYValue = (0, lodash_1.includes)(["bubble", "scatter"], seriesOptions.type)
        ? utils_1.normalizeValue
        : (v) => {
            v = (0, utils_1.cleanNumber)(v);
            return options.missingValuesAsZero && (0, lodash_1.isNil)(v) ? 0.0 : v;
        };
    const sourceData = new Map();
    const xValues = [];
    const yValues = [];
    const yErrorValues = [];
    (0, lodash_1.each)(data, row => {
        const x = (0, utils_1.normalizeValue)(row.x, options.xAxis.type); // number/datetime/category
        const y = cleanYValue(row.y, seriesYAxis === "y2" ? options.yAxis[1].type : options.yAxis[0].type); // depends on series type!
        const yError = (0, utils_1.cleanNumber)(row.yError); // always number
        const size = (0, utils_1.cleanNumber)(row.size); // always number
        sourceData.set(x, {
            x,
            y,
            yError,
            size,
            yPercent: null, // will be updated later
            row,
        });
        xValues.push(x);
        yValues.push(y);
        yErrorValues.push(yError);
    });
    const plotlySeries = {
        visible: true,
        hoverinfo: hoverInfoPattern,
        x: xValues,
        y: yValues,
        error_y: {
            array: yErrorValues,
            color: seriesColor,
        },
        name: seriesOptions.name || series.name,
        marker: { color: seriesColor },
        insidetextfont: {
            color: (0, chooseTextColorForBackground_1.default)(seriesColor),
        },
        yaxis: seriesYAxis,
        sourceData,
    };
    additionalOptions = { ...additionalOptions, seriesColor, data };
    switch (seriesOptions.type) {
        case "column":
            return prepareBarSeries(plotlySeries, options, additionalOptions);
        case "line":
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 3.
            return prepareLineSeries(plotlySeries, options, additionalOptions);
        case "area":
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 3.
            return prepareAreaSeries(plotlySeries, options, additionalOptions);
        case "scatter":
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 3.
            return prepareScatterSeries(plotlySeries, options, additionalOptions);
        case "bubble":
            return prepareBubbleSeries(plotlySeries, options, additionalOptions);
        case "box":
            return prepareBoxSeries(plotlySeries, options, additionalOptions);
        default:
            return plotlySeries;
    }
}
function prepareDefaultData(seriesList, options) {
    const additionalOptions = {
        hoverInfoPattern: getHoverInfoPattern(options),
    };
    const numSeries = seriesList.length;
    return (0, lodash_1.map)(seriesList, (series, index) => prepareSeries(series, options, numSeries, { ...additionalOptions, index }));
}
