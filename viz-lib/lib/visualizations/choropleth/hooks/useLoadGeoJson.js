"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useLoadGeoJson;
const lodash_1 = require("lodash");
const react_1 = require("react");
const axios_1 = __importDefault(require("axios"));
const visualizationsSettings_1 = require("../../../visualizations/visualizationsSettings");
const referenceCountingCache_1 = __importDefault(require("../../../lib/referenceCountingCache"));
const cache = (0, referenceCountingCache_1.default)();
function useLoadGeoJson(mapType) {
    const [geoJson, setGeoJson] = (0, react_1.useState)(null);
    const [isLoading, setIsLoading] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        const mapUrl = (0, lodash_1.get)(visualizationsSettings_1.visualizationsSettings, `choroplethAvailableMaps.${mapType}.url`, undefined);
        if ((0, lodash_1.isString)(mapUrl)) {
            setIsLoading(true);
            let cancelled = false;
            const promise = cache.get(mapUrl, () => axios_1.default.get(mapUrl).catch(() => null));
            promise.then(({ data }) => {
                if (!cancelled) {
                    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'object | null' is not assignable... Remove this comment to see the full error message
                    setGeoJson((0, lodash_1.isObject)(data) ? data : null);
                    setIsLoading(false);
                }
            });
            return () => {
                cancelled = true;
                cache.release(mapUrl);
            };
        }
        else {
            setGeoJson(null);
            setIsLoading(false);
        }
    }, [mapType]);
    return [geoJson, isLoading];
}
