"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable global-require, import/no-unresolved */
const getChartData_1 = __importDefault(require("./getChartData"));
describe("Visualizations", () => {
    describe("Chart", () => {
        describe("getChartData", () => {
            test("Single series", () => {
                const { input, output } = require("./fixtures/getChartData/single-series");
                const data = (0, getChartData_1.default)(input.data, input.options);
                expect(data).toEqual(output.data);
            });
            test("Multiple series: multiple Y mappings", () => {
                const { input, output } = require("./fixtures/getChartData/multiple-series-multiple-y");
                const data = (0, getChartData_1.default)(input.data, input.options);
                expect(data).toEqual(output.data);
            });
            test("Multiple series: grouped", () => {
                const { input, output } = require("./fixtures/getChartData/multiple-series-grouped");
                const data = (0, getChartData_1.default)(input.data, input.options);
                expect(data).toEqual(output.data);
            });
            test("Multiple series: sorted", () => {
                const { input, output } = require("./fixtures/getChartData/multiple-series-sorted");
                const data = (0, getChartData_1.default)(input.data, input.options);
                expect(data).toEqual(output.data);
            });
        });
    });
});
