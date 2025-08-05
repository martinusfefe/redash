import { isString, isObject, isFinite, each, map, extend, uniq, filter, first } from "lodash";
import chroma from "chroma-js";
import { createNumberFormatter as createFormatter } from "../../../lib/value-format";
export function darkenColor(color) {
  return chroma(color).darken().hex();
}
export function createNumberFormatter(format, placeholder) {
  var formatter = createFormatter(format);
  return value => {
    if (isFinite(value)) {
      return formatter(value);
    }
    return placeholder;
  };
}
export function prepareData(data, keyColumn, valueColumn) {
  if (!keyColumn || !valueColumn) {
    return {};
  }
  var result = {};
  each(data, item => {
    if (item[keyColumn]) {
      var value = parseFloat(item[valueColumn]);
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      result[item[keyColumn]] = {
        code: item[keyColumn],
        value: isFinite(value) ? value : undefined,
        item
      };
    }
  });
  return result;
}
export function prepareFeatureProperties(feature, valueFormatted, data, targetField) {
  var result = {};
  each(feature.properties, (value, key) => {
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    result["@@" + key] = value;
  });
  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  result["@@value"] = valueFormatted;
  var datum = data[feature.properties[targetField]] || {};
  return extend(result, datum.item);
}
export function getValueForFeature(feature, data, targetField) {
  var code = feature.properties[targetField];
  if (isString(code) && isObject(data[code])) {
    return data[code].value;
  }
  return undefined;
}
export function getColorByValue(value, limits, colors, defaultColor) {
  if (isFinite(value)) {
    for (var i = 0; i < limits.length; i += 1) {
      if (value <= limits[i]) {
        return colors[i];
      }
    }
  }
  return defaultColor;
}
export function createScale(features, data, options) {
  // Calculate limits
  var values = uniq(filter(map(features, feature => getValueForFeature(feature, data, options.targetField)), isFinite));
  if (values.length === 0) {
    return {
      limits: [],
      colors: [],
      legend: []
    };
  }
  var steps = Math.min(values.length, options.steps);
  if (steps === 1) {
    return {
      limits: values,
      colors: [options.colors.max],
      legend: [{
        color: options.colors.max,
        limit: first(values)
      }]
    };
  }
  var limits = chroma.limits(values, options.clusteringMode, steps - 1);

  // Create color buckets
  var colors = chroma.scale([options.colors.min, options.colors.max]).colors(limits.length);

  // Group values for legend
  var legend = map(colors, (color, index) => ({
    color,
    limit: limits[index]
  })).reverse();
  return {
    limits,
    colors,
    legend
  };
}
//# sourceMappingURL=utils.js.map