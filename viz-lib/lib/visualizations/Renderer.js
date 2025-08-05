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
const ErrorBoundary_1 = __importStar(require("@/components/ErrorBoundary"));
const registeredVisualizations_1 = __importDefault(require("@/visualizations/registeredVisualizations"));
function Renderer({ type, data, options: optionsProp, visualizationName, addonBefore, addonAfter, ...otherProps }) {
    const lastOptions = (0, react_1.useRef)();
    const errorHandlerRef = (0, react_1.useRef)();
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    const { Renderer, getOptions } = registeredVisualizations_1.default[type];
    // Avoid unnecessary updates (which may be expensive or cause issues with
    // internal state of some visualizations like Table) - compare options deeply
    // and use saved reference if nothing changed
    // More details: https://github.com/getredash/redash/pull/3963#discussion_r306935810
    let options = getOptions(optionsProp, data);
    if ((0, lodash_1.isEqual)(lastOptions.current, options)) {
        options = lastOptions.current;
    }
    lastOptions.current = options;
    (0, react_1.useEffect)(() => {
        if (errorHandlerRef.current) {
            // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
            errorHandlerRef.current.reset();
        }
    }, [optionsProp, data]);
    return (react_1.default.createElement("div", { className: "visualization-renderer" },
        addonBefore,
        react_1.default.createElement(ErrorBoundary_1.default, { ref: errorHandlerRef, renderError: () => react_1.default.createElement(ErrorBoundary_1.ErrorMessage, null, "Error while rendering visualization.") },
            react_1.default.createElement("div", { className: "visualization-renderer-wrapper" },
                react_1.default.createElement(Renderer, { options: options, data: data, visualizationName: visualizationName, ...otherProps }))),
        addonAfter));
}
