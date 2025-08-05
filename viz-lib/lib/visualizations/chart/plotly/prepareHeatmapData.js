"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = prepareHeatmapData;
const lodash_1 = require("lodash");
const value_format_1 = require("@/lib/value-format");
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'plot... Remove this comment to see the full error message
const colorscale_1 = __importDefault(require("plotly.js/src/components/colorscale"));
const d3_1 = __importDefault(require("d3"));
const chooseTextColorForBackground_1 = __importDefault(require("@/lib/chooseTextColorForBackground"));
const defaultColorScheme = [
    [0, "#356aff"],
    [0.14, "#4a7aff"],
    [0.28, "#5d87ff"],
    [0.42, "#7398ff"],
    [0.56, "#fb8c8c"],
    [0.71, "#ec6463"],
    [0.86, "#ec4949"],
    [1, "#e92827"],
];
function getColor(value, scheme) {
    if (value == 1) {
        return scheme[scheme.length - 1][1];
    }
    const upperboundIndex = (0, lodash_1.findIndex)(scheme, (range) => value < range[0]);
    const scale = d3_1.default.interpolate(scheme[upperboundIndex - 1][1], scheme[upperboundIndex][1]);
    return scale(value);
}
function prepareSeries(series, options, additionalOptions) {
    const { colorScheme, formatNumber } = additionalOptions;
    const plotlySeries = {
        x: [],
        y: [],
        z: [],
        type: "heatmap",
        name: "",
        colorscale: colorScheme,
    };
    // @ts-expect-error ts-migrate(2322) FIXME: Type 'any[]' is not assignable to type 'never[]'.
    plotlySeries.x = (0, lodash_1.uniq)((0, lodash_1.map)(series.data, v => v.x));
    // @ts-expect-error ts-migrate(2322) FIXME: Type 'any[]' is not assignable to type 'never[]'.
    plotlySeries.y = (0, lodash_1.uniq)((0, lodash_1.map)(series.data, v => v.y));
    if (options.sortX) {
        plotlySeries.x = (0, lodash_1.sortBy)(plotlySeries.x);
    }
    if (options.sortY) {
        plotlySeries.y = (0, lodash_1.sortBy)(plotlySeries.y);
    }
    if (options.reverseX) {
        plotlySeries.x.reverse();
    }
    if (options.reverseY) {
        plotlySeries.y.reverse();
    }
    const zMax = (0, lodash_1.max)((0, lodash_1.map)(series.data, d => d.zVal));
    // Use text trace instead of default annotation for better performance
    const dataLabels = {
        x: [],
        y: [],
        mode: "text",
        hoverinfo: "skip",
        showlegend: false,
        text: [],
        textfont: {
            color: [],
        },
    };
    for (let i = 0; i < plotlySeries.y.length; i += 1) {
        const item = [];
        for (let j = 0; j < plotlySeries.x.length; j += 1) {
            const datum = (0, lodash_1.find)(series.data, { x: plotlySeries.x[j], y: plotlySeries.y[i] });
            const zValue = (datum && datum.zVal) || 0;
            item.push(zValue);
            if (isFinite(zMax) && options.showDataLabels) {
                dataLabels.x.push(plotlySeries.x[j]);
                dataLabels.y.push(plotlySeries.y[i]);
                // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'any' is not assignable to parame... Remove this comment to see the full error message
                dataLabels.text.push(formatNumber(zValue));
                if (options.colorScheme) {
                    const bgcolor = getColor(zValue / zMax, colorScheme);
                    const fgcolor = (0, chooseTextColorForBackground_1.default)(bgcolor);
                    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
                    dataLabels.textfont.color.push(fgcolor);
                }
            }
        }
        // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'any[]' is not assignable to para... Remove this comment to see the full error message
        plotlySeries.z.push(item);
    }
    if (isFinite(zMax) && options.showDataLabels) {
        return [plotlySeries, dataLabels];
    }
    return [plotlySeries];
}
function prepareHeatmapData(seriesList, options) {
    let colorScheme = [];
    if (!options.colorScheme) {
        colorScheme = defaultColorScheme;
    }
    else if (options.colorScheme === "Custom...") {
        colorScheme = [
            [0, options.heatMinColor],
            [1, options.heatMaxColor],
        ];
    }
    else {
        colorScheme = colorscale_1.default.getScale(options.colorScheme);
    }
    const additionalOptions = {
        colorScheme,
        formatNumber: (0, value_format_1.createNumberFormatter)(options.numberFormat),
    };
    return (0, lodash_1.flatten)((0, lodash_1.map)(seriesList, series => prepareSeries(series, options, additionalOptions)));
}
