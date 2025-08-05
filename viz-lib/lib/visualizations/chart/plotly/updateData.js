"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = updateData;
const lodash_1 = require("lodash");
const value_format_1 = require("@/lib/value-format");
const utils_1 = require("./utils");
function shouldUseUnifiedXAxis(options) {
    return options.sortX && options.xAxis.type === "category" && options.globalSeriesType !== "box";
}
function defaultFormatSeriesText(item) {
    let result = item["@@y"];
    if (item["@@yError"] !== undefined) {
        result = `${result} \u00B1 ${item["@@yError"]}`;
    }
    if (item["@@yPercent"] !== undefined) {
        result = `${item["@@yPercent"]} (${result})`;
    }
    if (item["@@size"] !== undefined) {
        result = `${result}: ${item["@@size"]}`;
    }
    return result;
}
function defaultFormatSeriesTextForPie(item) {
    return item["@@yPercent"] + " (" + item["@@y"] + ")";
}
function createTextFormatter(options) {
    if (options.textFormat === "") {
        return options.globalSeriesType === "pie" ? defaultFormatSeriesTextForPie : defaultFormatSeriesText;
    }
    return (item) => (0, value_format_1.formatSimpleTemplate)(options.textFormat, item);
}
function formatValue(value, axis, options) {
    let axisType = null;
    switch (axis) {
        case "x":
            axisType = options.xAxis.type;
            break;
        case "y":
            axisType = options.yAxis[0].type;
            break;
        case "y2":
            axisType = options.yAxis[1].type;
            break;
        // no default
    }
    return (0, utils_1.normalizeValue)(value, axisType, options.dateTimeFormat);
}
function updateSeriesText(seriesList, options) {
    const formatNumber = (0, value_format_1.createNumberFormatter)(options.numberFormat);
    const formatPercent = (0, value_format_1.createNumberFormatter)(options.percentFormat);
    const formatText = createTextFormatter(options);
    const defaultY = options.missingValuesAsZero ? 0.0 : null;
    (0, lodash_1.each)(seriesList, series => {
        const seriesOptions = options.seriesOptions[series.name] || { type: options.globalSeriesType };
        series.text = [];
        series.hover = [];
        const xValues = options.globalSeriesType === "pie" ? series.labels : series.x;
        xValues.forEach((x) => {
            const text = {
                "@@name": series.name,
            };
            const item = series.sourceData.get(x) || { x, y: defaultY, row: { x, y: defaultY } };
            const yValueIsAny = (0, lodash_1.includes)(["bubble", "scatter"], seriesOptions.type);
            // for `formatValue` we have to use original value of `x` and `y`: `item.x`/`item.y` contains value
            // already processed with `normalizeValue`, and if they were `moment` instances - they are formatted
            // using default (ISO) date/time format. Here we need to use custom date/time format, so we pass original value
            // to `formatValue` which will call `normalizeValue` again, but this time with different date/time format
            // (if needed)
            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            text["@@x"] = formatValue(item.row.x, "x", options);
            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            text["@@y"] = yValueIsAny ? formatValue(item.row.y, series.yaxis, options) : formatNumber(item.y);
            if (item.yError !== undefined) {
                // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                text["@@yError"] = formatNumber(item.yError);
            }
            if (item.size !== undefined) {
                // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                text["@@size"] = formatNumber(item.size);
            }
            if (options.series.percentValues || options.globalSeriesType === "pie") {
                // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                text["@@yPercent"] = formatPercent(Math.abs(item.yPercent));
            }
            (0, lodash_1.extend)(text, item.row.$raw);
            series.text.push(formatText(text));
        });
    });
}
function updatePercentValues(seriesList, options) {
    if (options.series.percentValues) {
        // Some series may not have corresponding x-values;
        // do calculations for each x only for series that do have that x
        const sumOfCorrespondingPoints = new Map();
        (0, lodash_1.each)(seriesList, series => {
            series.sourceData.forEach((item) => {
                const sum = sumOfCorrespondingPoints.get(item.x) || 0;
                sumOfCorrespondingPoints.set(item.x, sum + Math.abs(item.y || 0.0));
            });
        });
        (0, lodash_1.each)(seriesList, series => {
            const yValues = [];
            series.sourceData.forEach((item) => {
                if ((0, lodash_1.isNil)(item.y) && !options.missingValuesAsZero) {
                    item.yPercent = null;
                }
                else {
                    const sum = sumOfCorrespondingPoints.get(item.x);
                    item.yPercent = (item.y / sum) * 100;
                }
                yValues.push(item.yPercent);
            });
            series.y = yValues;
        });
    }
}
function getUnifiedXAxisValues(seriesList, sorted) {
    const set = new Set();
    (0, lodash_1.each)(seriesList, series => {
        // `Map.forEach` will walk items in insertion order
        series.sourceData.forEach((item) => {
            set.add(item.x);
        });
    });
    const result = [...set];
    return sorted ? (0, lodash_1.sortBy)(result, lodash_1.identity) : result;
}
function updateUnifiedXAxisValues(seriesList, options) {
    const unifiedX = getUnifiedXAxisValues(seriesList, options.sortX);
    const defaultY = options.missingValuesAsZero ? 0.0 : null;
    (0, lodash_1.each)(seriesList, series => {
        series.x = [];
        series.y = [];
        series.error_y.array = [];
        (0, lodash_1.each)(unifiedX, x => {
            series.x.push(x);
            const item = series.sourceData.get(x);
            if (item) {
                series.y.push(options.series.percentValues ? item.yPercent : item.y);
                series.error_y.array.push(item.yError);
            }
            else {
                series.y.push(defaultY);
                series.error_y.array.push(null);
            }
        });
    });
}
function updatePieData(seriesList, options) {
    updateSeriesText(seriesList, options);
}
function updateLineAreaData(seriesList, options) {
    // Apply "percent values" modification
    updatePercentValues(seriesList, options);
    if (options.series.stacking) {
        updateUnifiedXAxisValues(seriesList, options);
        // Calculate cumulative value for each x tick
        const cumulativeValues = {};
        (0, lodash_1.each)(seriesList, series => {
            series.y = (0, lodash_1.map)(series.y, (y, i) => {
                if ((0, lodash_1.isNil)(y) && !options.missingValuesAsZero) {
                    return null;
                }
                const x = series.x[i];
                // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                const stackedY = y + (cumulativeValues[x] || 0.0);
                // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                cumulativeValues[x] = stackedY;
                return stackedY;
            });
        });
    }
    else {
        if (shouldUseUnifiedXAxis(options)) {
            updateUnifiedXAxisValues(seriesList, options);
        }
    }
    // Finally - update text labels
    updateSeriesText(seriesList, options);
}
function updateDefaultData(seriesList, options) {
    // Apply "percent values" modification
    updatePercentValues(seriesList, options);
    if (!options.series.stacking) {
        if (shouldUseUnifiedXAxis(options)) {
            updateUnifiedXAxisValues(seriesList, options);
        }
    }
    // Finally - update text labels
    updateSeriesText(seriesList, options);
}
function updateData(seriesList, options) {
    // Use only visible series
    const visibleSeriesList = (0, lodash_1.filter)(seriesList, s => s.visible === true);
    if (visibleSeriesList.length > 0) {
        switch (options.globalSeriesType) {
            case "pie":
                updatePieData(visibleSeriesList, options);
                break;
            case "line":
            case "area":
                updateLineAreaData(visibleSeriesList, options);
                break;
            case "heatmap":
                break;
            default:
                updateDefaultData(visibleSeriesList, options);
                break;
        }
    }
    return seriesList;
}
