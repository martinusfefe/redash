"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.darkenColor = darkenColor;
exports.createNumberFormatter = createNumberFormatter;
exports.prepareData = prepareData;
exports.prepareFeatureProperties = prepareFeatureProperties;
exports.getValueForFeature = getValueForFeature;
exports.getColorByValue = getColorByValue;
exports.createScale = createScale;
const lodash_1 = require("lodash");
const chroma_js_1 = __importDefault(require("chroma-js"));
const value_format_1 = require("@/lib/value-format");
function darkenColor(color) {
    return (0, chroma_js_1.default)(color)
        .darken()
        .hex();
}
function createNumberFormatter(format, placeholder) {
    const formatter = (0, value_format_1.createNumberFormatter)(format);
    return (value) => {
        if ((0, lodash_1.isFinite)(value)) {
            return formatter(value);
        }
        return placeholder;
    };
}
function prepareData(data, keyColumn, valueColumn) {
    if (!keyColumn || !valueColumn) {
        return {};
    }
    const result = {};
    (0, lodash_1.each)(data, item => {
        if (item[keyColumn]) {
            const value = parseFloat(item[valueColumn]);
            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            result[item[keyColumn]] = {
                code: item[keyColumn],
                value: (0, lodash_1.isFinite)(value) ? value : undefined,
                item,
            };
        }
    });
    return result;
}
function prepareFeatureProperties(feature, valueFormatted, data, targetField) {
    const result = {};
    (0, lodash_1.each)(feature.properties, (value, key) => {
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        result["@@" + key] = value;
    });
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    result["@@value"] = valueFormatted;
    const datum = data[feature.properties[targetField]] || {};
    return (0, lodash_1.extend)(result, datum.item);
}
function getValueForFeature(feature, data, targetField) {
    const code = feature.properties[targetField];
    if ((0, lodash_1.isString)(code) && (0, lodash_1.isObject)(data[code])) {
        return data[code].value;
    }
    return undefined;
}
function getColorByValue(value, limits, colors, defaultColor) {
    if ((0, lodash_1.isFinite)(value)) {
        for (let i = 0; i < limits.length; i += 1) {
            if (value <= limits[i]) {
                return colors[i];
            }
        }
    }
    return defaultColor;
}
function createScale(features, data, options) {
    // Calculate limits
    const values = (0, lodash_1.uniq)((0, lodash_1.filter)((0, lodash_1.map)(features, feature => getValueForFeature(feature, data, options.targetField)), lodash_1.isFinite));
    if (values.length === 0) {
        return {
            limits: [],
            colors: [],
            legend: [],
        };
    }
    const steps = Math.min(values.length, options.steps);
    if (steps === 1) {
        return {
            limits: values,
            colors: [options.colors.max],
            legend: [
                {
                    color: options.colors.max,
                    limit: (0, lodash_1.first)(values),
                },
            ],
        };
    }
    const limits = chroma_js_1.default.limits(values, options.clusteringMode, steps - 1);
    // Create color buckets
    const colors = chroma_js_1.default.scale([options.colors.min, options.colors.max]).colors(limits.length);
    // Group values for legend
    const legend = (0, lodash_1.map)(colors, (color, index) => ({
        color,
        limit: limits[index],
    })).reverse();
    return { limits, colors, legend };
}
