function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import { isString, isObject, get } from "lodash";
import { useState, useEffect } from "react";
import axios from "axios";
import { visualizationsSettings } from "../../visualizationsSettings";
import createReferenceCountingCache from "../../../lib/referenceCountingCache";
var cache = createReferenceCountingCache();
export default function useLoadGeoJson(mapType) {
  var _useState = useState(null),
    _useState2 = _slicedToArray(_useState, 2),
    geoJson = _useState2[0],
    setGeoJson = _useState2[1];
  var _useState3 = useState(false),
    _useState4 = _slicedToArray(_useState3, 2),
    isLoading = _useState4[0],
    setIsLoading = _useState4[1];
  useEffect(() => {
    var mapUrl = get(visualizationsSettings, "choroplethAvailableMaps.".concat(mapType, ".url"), undefined);
    if (isString(mapUrl)) {
      setIsLoading(true);
      var cancelled = false;
      var promise = cache.get(mapUrl, () => axios.get(mapUrl).catch(() => null));
      promise.then(_ref => {
        var data = _ref.data;
        if (!cancelled) {
          // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'object | null' is not assignable... Remove this comment to see the full error message
          setGeoJson(isObject(data) ? data : null);
          setIsLoading(false);
        }
      });
      return () => {
        cancelled = true;
        cache.release(mapUrl);
      };
    } else {
      setGeoJson(null);
      setIsLoading(false);
    }
  }, [mapType]);
  return [geoJson, isLoading];
}
//# sourceMappingURL=useLoadGeoJson.js.map