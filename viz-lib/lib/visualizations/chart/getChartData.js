import { isNil, isObject, each, forOwn, sortBy, values } from "lodash";
function addPointToSeries(point, seriesCollection, seriesName) {
  if (seriesCollection[seriesName] === undefined) {
    seriesCollection[seriesName] = {
      name: seriesName,
      type: "column",
      data: []
    };
  }
  seriesCollection[seriesName].data.push(point);
}
export default function getChartData(data, options) {
  var series = {};
  var mappings = options.columnMapping;
  each(data, row => {
    var point = {
      $raw: row
    };
    var seriesName = null;
    var xValue = 0;
    var yValues = {};
    var eValue = null;
    var sizeValue = null;
    var zValue = null;
    forOwn(row, (value, definition) => {
      definition = "" + definition;
      var definitionParts = definition.split("::") || definition.split("__");
      var name = definitionParts[0];
      var type = mappings ? mappings[definition] : definitionParts[1];
      if (type === "unused") {
        return;
      }
      if (type === "x") {
        xValue = value;
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        point[type] = value;
      }
      if (type === "y") {
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        yValues[name] = value;
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        point[type] = value;
      }
      if (type === "yError") {
        eValue = value;
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        point[type] = value;
      }
      if (type === "series") {
        seriesName = String(value);
      }
      if (type === "size") {
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        point[type] = value;
        sizeValue = value;
      }
      if (type === "zVal") {
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        point[type] = value;
        zValue = value;
      }
      if (type === "multiFilter" || type === "multi-filter") {
        seriesName = String(value);
      }
    });
    if (isNil(seriesName)) {
      each(yValues, (yValue, ySeriesName) => {
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ x: number; y: never; $raw: any; }' is not ... Remove this comment to see the full error message
        point = {
          x: xValue,
          y: yValue,
          $raw: point.$raw
        };
        if (eValue !== null) {
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'yError' does not exist on type '{ $raw: ... Remove this comment to see the full error message
          point.yError = eValue;
        }
        if (sizeValue !== null) {
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'size' does not exist on type '{ $raw: an... Remove this comment to see the full error message
          point.size = sizeValue;
        }
        if (zValue !== null) {
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'zVal' does not exist on type '{ $raw: an... Remove this comment to see the full error message
          point.zVal = zValue;
        }
        addPointToSeries(point, series, ySeriesName);
      });
    } else {
      addPointToSeries(point, series, seriesName);
    }
  });
  return sortBy(values(series), _ref => {
    var name = _ref.name;
    if (isObject(options.seriesOptions[name])) {
      return options.seriesOptions[name].zIndex || 0;
    }
    return 0;
  });
}
//# sourceMappingURL=getChartData.js.map