"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = prepareData;
var d3 = _interopRequireWildcard(require("d3"));
var _lodash = require("lodash");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function prepareData(data, options) {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'scale' does not exist on type 'typeof im... Remove this comment to see the full error message
  var colorScale = d3.scale.category10();
  var classify = options.classify,
    latColName = options.latColName,
    lonColName = options.lonColName;
  var pointGroups = classify ? (0, _lodash.groupBy)(data.rows, classify) : {
    All: data.rows
  };
  return (0, _lodash.filter)((0, _lodash.map)(pointGroups, (rows, name) => {
    var points = (0, _lodash.filter)((0, _lodash.map)(rows, row => {
      var lat = row[latColName];
      var lon = row[lonColName];
      if ((0, _lodash.isNil)(lat) || (0, _lodash.isNil)(lon)) {
        return null;
      }
      return {
        lat,
        lon,
        row: (0, _lodash.omit)(row, [latColName, lonColName])
      };
    }));
    if (points.length === 0) {
      return null;
    }
    var result = (0, _lodash.extend)({}, options.groups[name], {
      name,
      points
    });
    if ((0, _lodash.isNil)(result.color)) {
      result.color = colorScale(name);
    }
    return result;
  }));
}
//# sourceMappingURL=prepareData.js.map