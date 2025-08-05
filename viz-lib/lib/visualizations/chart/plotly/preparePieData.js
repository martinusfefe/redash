"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPieDimensions = getPieDimensions;
exports.default = preparePieData;
const lodash_1 = require("lodash");
const d3_1 = __importDefault(require("d3"));
const chooseTextColorForBackground_1 = __importDefault(require("@/lib/chooseTextColorForBackground"));
const ColorPalette_1 = require("@/visualizations/ColorPalette");
const utils_1 = require("./utils");
function getPieDimensions(series) {
    const rows = series.length > 2 ? 2 : 1;
    const cellsInRow = Math.ceil(series.length / rows);
    const cellWidth = 1 / cellsInRow;
    const cellHeight = 1 / rows;
    const xPadding = 0.02;
    const yPadding = 0.1;
    return { rows, cellsInRow, cellWidth, cellHeight, xPadding, yPadding };
}
function getPieHoverInfoPattern(options) {
    const hasX = /{{\s*@@x\s*}}/.test(options.textFormat);
    let result = "text";
    if (!hasX)
        result += "+label";
    return result;
}
function prepareSeries(series, options, additionalOptions) {
    const { cellWidth, cellHeight, xPadding, yPadding, cellsInRow, hasX, index, hoverInfoPattern, getValueColor, } = additionalOptions;
    const seriesOptions = (0, lodash_1.extend)({ type: options.globalSeriesType, yAxis: 0 }, options.seriesOptions[series.name]);
    const xPosition = (index % cellsInRow) * cellWidth;
    const yPosition = Math.floor(index / cellsInRow) * cellHeight;
    const labelsValuesMap = new Map();
    const sourceData = new Map();
    const seriesTotal = (0, lodash_1.reduce)(series.data, (result, row) => {
        const y = (0, utils_1.cleanNumber)(row.y);
        return result + Math.abs(y);
    }, 0);
    (0, lodash_1.each)(series.data, row => {
        const x = hasX ? (0, utils_1.normalizeValue)(row.x, options.xAxis.type) : `Slice ${index}`;
        const y = (0, utils_1.cleanNumber)(row.y);
        if (labelsValuesMap.has(x)) {
            labelsValuesMap.set(x, labelsValuesMap.get(x) + y);
        }
        else {
            labelsValuesMap.set(x, y);
        }
        const aggregatedY = labelsValuesMap.get(x);
        sourceData.set(x, {
            x,
            y: aggregatedY,
            yPercent: (aggregatedY / seriesTotal) * 100,
            row,
        });
    });
    const markerColors = (0, lodash_1.map)(Array.from(sourceData.values()), data => getValueColor(data.row.x));
    const textColors = (0, lodash_1.map)(markerColors, c => (0, chooseTextColorForBackground_1.default)(c));
    const labels = Array.from(labelsValuesMap.keys());
    const values = Array.from(labelsValuesMap.values());
    return {
        visible: true,
        values,
        labels,
        type: "pie",
        hole: 0.4,
        marker: {
            colors: markerColors,
        },
        hoverinfo: hoverInfoPattern,
        text: [],
        textinfo: options.showDataLabels ? "percent" : "none",
        textposition: "inside",
        textfont: {
            color: textColors,
        },
        name: seriesOptions.name || series.name,
        direction: options.direction.type,
        domain: {
            x: [xPosition, xPosition + cellWidth - xPadding],
            y: [yPosition, yPosition + cellHeight - yPadding],
        },
        sourceData,
        sort: options.piesort,
        color_scheme: options.color_scheme,
    };
}
function preparePieData(seriesList, options) {
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    const palette = ColorPalette_1.AllColorPaletteArrays[options.color_scheme];
    const valuesColors = {};
    let getDefaultColor;
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    if (typeof (seriesList[0]) !== 'undefined' && ColorPalette_1.ColorPaletteTypes[options.color_scheme] === 'continuous') {
        const uniqueXValues = [...new Set(seriesList[0].data.map((d) => d.x))];
        const step = (palette.length - 1) / (uniqueXValues.length - 1 || 1);
        const colorIndices = d3_1.default.range(uniqueXValues.length).map(function (i) {
            return Math.round(step * i);
        });
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'scale' does not exist on type 'typeof im... Remove this comment to see the full error message
        getDefaultColor = d3_1.default.scale.ordinal()
            .domain(uniqueXValues) // Set domain as the unique x-values
            .range(colorIndices.map(index => palette[index]));
    }
    else {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'scale' does not exist on type 'typeof im... Remove this comment to see the full error message
        getDefaultColor = d3_1.default.scale
            .ordinal()
            .domain([])
            .range(palette);
    }
    ;
    (0, lodash_1.each)(options.valuesOptions, (item, key) => {
        if ((0, lodash_1.isString)(item.color) && item.color !== "") {
            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            valuesColors[key] = item.color;
        }
    });
    const additionalOptions = {
        ...getPieDimensions(seriesList),
        hasX: (0, lodash_1.includes)(options.columnMapping, "x"),
        hoverInfoPattern: getPieHoverInfoPattern(options),
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        getValueColor: (v) => valuesColors[v] || getDefaultColor(v),
    };
    return (0, lodash_1.map)(seriesList, (series, index) => prepareSeries(series, options, { ...additionalOptions, index }));
}
