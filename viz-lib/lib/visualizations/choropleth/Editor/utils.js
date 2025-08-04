import { isObject, isArray, reduce, keys, uniq } from "lodash";
import L from "leaflet";
export function getGeoJsonFields(geoJson) {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'features' does not exist on type 'object... Remove this comment to see the full error message
  var features = isObject(geoJson) && isArray(geoJson.features) ? geoJson.features : [];
  return reduce(features,
  // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
  (result, feature) => {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'properties' does not exist on type 'obje... Remove this comment to see the full error message
    var properties = isObject(feature) && isObject(feature.properties) ? feature.properties : {};
    return uniq([...result, ...keys(properties)]);
  }, []);
}
export function getGeoJsonBounds(geoJson) {
  if (isObject(geoJson)) {
    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'object' is not assignable to par... Remove this comment to see the full error message
    var layer = L.geoJSON(geoJson);
    var bounds = layer.getBounds();
    if (bounds.isValid()) {
      return [
      // @ts-expect-error ts-migrate(2551) FIXME: Property '_southWest' does not exist on type 'LatL... Remove this comment to see the full error message
      [bounds._southWest.lat, bounds._southWest.lng],
      // @ts-expect-error ts-migrate(2551) FIXME: Property '_northEast' does not exist on type 'LatL... Remove this comment to see the full error message
      [bounds._northEast.lat, bounds._northEast.lng]];
    }
  }
  return null;
}
//# sourceMappingURL=utils.js.map