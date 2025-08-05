import d3 from "d3";
import { isNil, extend, map, filter, groupBy, omit } from "lodash";
export default function prepareData(data, options) {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'scale' does not exist on type 'typeof im... Remove this comment to see the full error message
  var colorScale = d3.scale.category10();
  var classify = options.classify,
    latColName = options.latColName,
    lonColName = options.lonColName;
  var pointGroups = classify ? groupBy(data.rows, classify) : {
    All: data.rows
  };
  return filter(map(pointGroups, (rows, name) => {
    var points = filter(map(rows, row => {
      var lat = row[latColName];
      var lon = row[lonColName];
      if (isNil(lat) || isNil(lon)) {
        return null;
      }
      return {
        lat,
        lon,
        row: omit(row, [latColName, lonColName])
      };
    }));
    if (points.length === 0) {
      return null;
    }
    var result = extend({}, options.groups[name], {
      name,
      points
    });
    if (isNil(result.color)) {
      result.color = colorScale(name);
    }
    return result;
  }));
}
//# sourceMappingURL=prepareData.js.map