"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = prepareData;
const preparePieData_1 = __importDefault(require("./preparePieData"));
const prepareHeatmapData_1 = __importDefault(require("./prepareHeatmapData"));
const prepareDefaultData_1 = __importDefault(require("./prepareDefaultData"));
const updateData_1 = __importDefault(require("./updateData"));
function prepareData(seriesList, options) {
    switch (options.globalSeriesType) {
        case "pie":
            return (0, updateData_1.default)((0, preparePieData_1.default)(seriesList, options), options);
        case "heatmap":
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
            return (0, updateData_1.default)((0, prepareHeatmapData_1.default)(seriesList, options, options));
        default:
            return (0, updateData_1.default)((0, prepareDefaultData_1.default)(seriesList, options), options);
    }
}
