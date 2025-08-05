"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Renderer;
const lodash_1 = require("lodash");
const react_1 = __importStar(require("react"));
const prop_types_1 = require("@/visualizations/prop-types");
const useMemoWithDeepCompare_1 = __importDefault(require("@/lib/hooks/useMemoWithDeepCompare"));
const useLoadGeoJson_1 = __importDefault(require("../hooks/useLoadGeoJson"));
const initChoropleth_1 = __importDefault(require("./initChoropleth"));
const utils_1 = require("./utils");
require("./renderer.less");
function Renderer({ data, options, onOptionsChange }) {
    const [container, setContainer] = (0, react_1.useState)(null);
    const [geoJson] = (0, useLoadGeoJson_1.default)(options.mapType);
    const onBoundsChangeRef = (0, react_1.useRef)();
    // @ts-expect-error ts-migrate(2322) FIXME: Type '(...args: any[]) => void' is not assignable ... Remove this comment to see the full error message
    onBoundsChangeRef.current = onOptionsChange ? (bounds) => onOptionsChange({ ...options, bounds }) : lodash_1.noop;
    const optionsWithoutBounds = (0, useMemoWithDeepCompare_1.default)(() => (0, lodash_1.omit)(options, ["bounds"]), [options]);
    const [map, setMap] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        if (container) {
            // @ts-expect-error ts-migrate(7019) FIXME: Rest parameter 'args' implicitly has an 'any[]' ty... Remove this comment to see the full error message
            const _map = (0, initChoropleth_1.default)(container, (...args) => onBoundsChangeRef.current(...args));
            // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{ updateLayers: (geoJson: any, d... Remove this comment to see the full error message
            setMap(_map);
            return () => {
                _map.destroy();
            };
        }
    }, [container]);
    (0, react_1.useEffect)(() => {
        if (map) {
            // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
            map.updateLayers(geoJson, 
            // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
            (0, utils_1.prepareData)(data.rows, optionsWithoutBounds.keyColumn, optionsWithoutBounds.valueColumn), options // detect changes for all options except bounds, but pass them all!
            );
        }
    }, [map, geoJson, data.rows, optionsWithoutBounds]); // eslint-disable-line react-hooks/exhaustive-deps
    // This may come only from editor
    (0, react_1.useEffect)(() => {
        if (map) {
            // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
            map.updateBounds(options.bounds);
        }
    }, [map, options, onOptionsChange]);
    return (
    // @ts-expect-error ts-migrate(2322) FIXME: Type 'Dispatch<SetStateAction<null>>' is not assig... Remove this comment to see the full error message
    react_1.default.createElement("div", { className: "map-visualization-container", style: { background: options.colors.background }, ref: setContainer }));
}
Renderer.propTypes = prop_types_1.RendererPropTypes;
