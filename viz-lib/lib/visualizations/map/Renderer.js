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
const prop_types_1 = require("../../visualizations/prop-types");
const prepareData_1 = __importDefault(require("./prepareData"));
const initMap_1 = __importDefault(require("./initMap"));
function useMemoWithDeepCompare(create, inputs) {
    const valueRef = (0, react_1.useRef)();
    const value = (0, react_1.useMemo)(create, inputs);
    if (!(0, lodash_1.isEqual)(value, valueRef.current)) {
        // @ts-expect-error ts-migrate(2322) FIXME: Type 'unknown' is not assignable to type 'undefine... Remove this comment to see the full error message
        valueRef.current = value;
    }
    return valueRef.current;
}
function Renderer({ data, options, onOptionsChange }) {
    const [container, setContainer] = (0, react_1.useState)(null);
    const optionsWithoutBounds = useMemoWithDeepCompare(() => (0, lodash_1.omit)(options, ["bounds"]), [options]);
    const groups = (0, react_1.useMemo)(() => (0, prepareData_1.default)(data, optionsWithoutBounds), [data, optionsWithoutBounds]);
    const [map, setMap] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        if (container) {
            const _map = (0, initMap_1.default)(container);
            // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{ onBoundsChange: () => void; up... Remove this comment to see the full error message
            setMap(_map);
            return () => {
                _map.destroy();
            };
        }
    }, [container]);
    (0, react_1.useEffect)(() => {
        if (map) {
            // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
            map.updateLayers(groups, optionsWithoutBounds);
        }
    }, [map, groups, optionsWithoutBounds]);
    (0, react_1.useEffect)(() => {
        if (map) {
            // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
            map.updateBounds(options.bounds);
        }
    }, [map, options.bounds]);
    (0, react_1.useEffect)(() => {
        if (map && onOptionsChange) {
            // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
            map.onBoundsChange = (bounds) => {
                onOptionsChange((0, lodash_1.merge)({}, options, { bounds }));
            };
        }
    }, [map, options, onOptionsChange]);
    // @ts-expect-error ts-migrate(2322) FIXME: Type 'Dispatch<SetStateAction<null>>' is not assig... Remove this comment to see the full error message
    return react_1.default.createElement("div", { className: "map-visualization-container", ref: setContainer });
}
Renderer.propTypes = prop_types_1.RendererPropTypes;
