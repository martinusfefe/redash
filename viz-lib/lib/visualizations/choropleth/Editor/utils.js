"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGeoJsonFields = getGeoJsonFields;
exports.getGeoJsonBounds = getGeoJsonBounds;
const lodash_1 = require("lodash");
const leaflet_1 = __importDefault(require("leaflet"));
function getGeoJsonFields(geoJson) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'features' does not exist on type 'object... Remove this comment to see the full error message
    const features = (0, lodash_1.isObject)(geoJson) && (0, lodash_1.isArray)(geoJson.features) ? geoJson.features : [];
    return (0, lodash_1.reduce)(features, 
    // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
    (result, feature) => {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'properties' does not exist on type 'obje... Remove this comment to see the full error message
        const properties = (0, lodash_1.isObject)(feature) && (0, lodash_1.isObject)(feature.properties) ? feature.properties : {};
        return (0, lodash_1.uniq)([...result, ...(0, lodash_1.keys)(properties)]);
    }, []);
}
function getGeoJsonBounds(geoJson) {
    if ((0, lodash_1.isObject)(geoJson)) {
        // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'object' is not assignable to par... Remove this comment to see the full error message
        const layer = leaflet_1.default.geoJSON(geoJson);
        const bounds = layer.getBounds();
        if (bounds.isValid()) {
            return [
                // @ts-expect-error ts-migrate(2551) FIXME: Property '_southWest' does not exist on type 'LatL... Remove this comment to see the full error message
                [bounds._southWest.lat, bounds._southWest.lng],
                // @ts-expect-error ts-migrate(2551) FIXME: Property '_northEast' does not exist on type 'LatL... Remove this comment to see the full error message
                [bounds._northEast.lat, bounds._northEast.lng],
            ];
        }
    }
    return null;
}
