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
exports.default = BoundsSettings;
const lodash_1 = require("lodash");
const react_1 = __importStar(require("react"));
const use_debounce_1 = require("use-debounce");
const Grid = __importStar(require("antd/lib/grid"));
const editor_1 = require("../../../components/visualizations/editor");
const prop_types_1 = require("../../../visualizations/prop-types");
const useLoadGeoJson_1 = __importDefault(require("../hooks/useLoadGeoJson"));
const utils_1 = require("./utils");
function BoundsSettings({ options, onOptionsChange }) {
    // Bounds may be changed in editor or on preview (by drag/zoom map).
    // Changes from preview does not come frequently (only when user release mouse button),
    // but changes from editor should be debounced.
    // Therefore this component has intermediate state to hold immediate user input,
    // which is updated from `options.bounds` and by inputs immediately on user input,
    // but `onOptionsChange` event is debounced and uses last value from internal state.
    const [bounds, setBounds] = (0, react_1.useState)(options.bounds);
    const [onOptionsChangeDebounced] = (0, use_debounce_1.useDebouncedCallback)(onOptionsChange, 200);
    const [geoJson] = (0, useLoadGeoJson_1.default)(options.mapType);
    // `options.bounds` could be empty only if user didn't edit bounds yet - through preview or in this editor.
    // In this case we should keep empty bounds value because it tells renderer to fit map every time.
    (0, react_1.useEffect)(() => {
        if (options.bounds) {
            setBounds(options.bounds);
        }
        else {
            const defaultBounds = (0, utils_1.getGeoJsonBounds)(geoJson);
            if (defaultBounds) {
                setBounds(defaultBounds);
            }
        }
    }, [options.bounds, geoJson]);
    const updateBounds = (0, react_1.useCallback)((i, j, v) => {
        v = parseFloat(v); // InputNumber may emit `null` and empty strings instead of numbers
        if ((0, lodash_1.isFinite)(v)) {
            const newBounds = (0, lodash_1.cloneDeep)(bounds);
            newBounds[i][j] = v;
            setBounds(newBounds);
            onOptionsChangeDebounced({ bounds: newBounds });
        }
    }, [bounds, onOptionsChangeDebounced]);
    const boundsAvailable = (0, lodash_1.isArray)(bounds);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.ControlLabel, { label: "North-East Latitude and Longitude" },
                react_1.default.createElement(Grid.Row, { gutter: 15 },
                    react_1.default.createElement(Grid.Col, { span: 12 },
                        react_1.default.createElement(editor_1.InputNumber, { disabled: !boundsAvailable, value: boundsAvailable ? bounds[1][0] : undefined, onChange: (value) => updateBounds(1, 0, value) })),
                    react_1.default.createElement(Grid.Col, { span: 12 },
                        react_1.default.createElement(editor_1.InputNumber, { disabled: !boundsAvailable, value: boundsAvailable ? bounds[1][1] : undefined, onChange: (value) => updateBounds(1, 1, value) }))))),
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.ControlLabel, { label: "South-West Latitude and Longitude" },
                react_1.default.createElement(Grid.Row, { gutter: 15 },
                    react_1.default.createElement(Grid.Col, { span: 12 },
                        react_1.default.createElement(editor_1.InputNumber, { disabled: !boundsAvailable, value: boundsAvailable ? bounds[0][0] : undefined, onChange: (value) => updateBounds(0, 0, value) })),
                    react_1.default.createElement(Grid.Col, { span: 12 },
                        react_1.default.createElement(editor_1.InputNumber, { disabled: !boundsAvailable, value: boundsAvailable ? bounds[0][1] : undefined, onChange: (value) => updateBounds(0, 1, value) })))))));
}
BoundsSettings.propTypes = prop_types_1.EditorPropTypes;
