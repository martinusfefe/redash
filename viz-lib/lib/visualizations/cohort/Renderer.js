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
const react_1 = __importStar(require("react"));
const prop_types_1 = require("../../visualizations/prop-types");
const prepareData_1 = __importDefault(require("./prepareData"));
require("./renderer.less");
const Cornelius_1 = __importDefault(require("./Cornelius"));
function Renderer({ data, options }) {
    const { data: cohortData, initialDate } = (0, react_1.useMemo)(() => (0, prepareData_1.default)(data, options), [data, options]);
    const corneliusOptions = (0, react_1.useMemo)(() => ({
        initialDate,
        timeInterval: options.timeInterval,
        noValuePlaceholder: options.noValuePlaceholder,
        rawNumberOnHover: options.showTooltips,
        displayAbsoluteValues: !options.percentValues,
        timeColumnTitle: options.timeColumnTitle,
        peopleColumnTitle: options.peopleColumnTitle,
        stageColumnTitle: options.stageColumnTitle,
        numberFormat: options.numberFormat,
        percentFormat: options.percentFormat,
        colors: options.colors,
    }), [options, initialDate]);
    if (cohortData.length === 0) {
        return null;
    }
    return (react_1.default.createElement("div", { className: "cohort-visualization-container" },
        react_1.default.createElement(Cornelius_1.default, { data: cohortData, options: corneliusOptions })));
}
Renderer.propTypes = prop_types_1.RendererPropTypes;
