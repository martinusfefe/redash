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
exports.createCustomChartRenderer = exports.prepareCustomChartData = exports.updateChartSize = exports.updateAxes = exports.updateData = exports.prepareLayout = exports.prepareData = exports.Plotly = void 0;
const Plotly = __importStar(require("plotly.js"));
exports.Plotly = Plotly;
require("./locales");
const prepareData_1 = __importDefault(require("./prepareData"));
exports.prepareData = prepareData_1.default;
const prepareLayout_1 = __importDefault(require("./prepareLayout"));
exports.prepareLayout = prepareLayout_1.default;
const updateData_1 = __importDefault(require("./updateData"));
exports.updateData = updateData_1.default;
const updateAxes_1 = __importDefault(require("./updateAxes"));
exports.updateAxes = updateAxes_1.default;
const updateChartSize_1 = __importDefault(require("./updateChartSize"));
exports.updateChartSize = updateChartSize_1.default;
const customChartUtils_1 = require("./customChartUtils");
Object.defineProperty(exports, "prepareCustomChartData", { enumerable: true, get: function () { return customChartUtils_1.prepareCustomChartData; } });
Object.defineProperty(exports, "createCustomChartRenderer", { enumerable: true, get: function () { return customChartUtils_1.createCustomChartRenderer; } });
// @ts-expect-error ts-migrate(2339) FIXME: Property 'setPlotConfig' does not exist on type 't... Remove this comment to see the full error message
Plotly.setPlotConfig({
    modeBarButtonsToRemove: ["sendDataToCloud"],
    modeBarButtonsToAdd: ["togglespikelines", "v1hovermode"],
    locale: window.navigator.language,
});
