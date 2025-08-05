"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = prepareData;
const d3_1 = __importDefault(require("d3"));
const lodash_1 = require("lodash");
function prepareData(data, options) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'scale' does not exist on type 'typeof im... Remove this comment to see the full error message
    const colorScale = d3_1.default.scale.category10();
    const { classify, latColName, lonColName } = options;
    const pointGroups = classify ? (0, lodash_1.groupBy)(data.rows, classify) : { All: data.rows };
    return (0, lodash_1.filter)((0, lodash_1.map)(pointGroups, (rows, name) => {
        const points = (0, lodash_1.filter)((0, lodash_1.map)(rows, row => {
            const lat = row[latColName];
            const lon = row[lonColName];
            if ((0, lodash_1.isNil)(lat) || (0, lodash_1.isNil)(lon)) {
                return null;
            }
            return { lat, lon, row: (0, lodash_1.omit)(row, [latColName, lonColName]) };
        }));
        if (points.length === 0) {
            return null;
        }
        const result = (0, lodash_1.extend)({}, options.groups[name], { name, points });
        if ((0, lodash_1.isNil)(result.color)) {
            result.color = colorScale(name);
        }
        return result;
    }));
}
