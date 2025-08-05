"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const react_1 = __importDefault(require("react"));
const enzyme_1 = __importDefault(require("enzyme"));
const getOptions_1 = __importDefault(require("../getOptions"));
const ColorsSettings_1 = __importDefault(require("./ColorsSettings"));
function findByTestID(wrapper, testId) {
    return wrapper.find(`[data-test="${testId}"]`);
}
function mount(options, done) {
    options = (0, getOptions_1.default)(options);
    return enzyme_1.default.mount(react_1.default.createElement(ColorsSettings_1.default, { visualizationName: "Test", data: {
            columns: [
                { name: "a", type: "string" },
                { name: "b", type: "number" },
            ],
            rows: [{ a: "v", b: 3.14 }],
        }, options: options, onOptionsChange: (changedOptions) => {
            expect(changedOptions).toMatchSnapshot();
            done();
        } }));
}
describe("Visualizations -> Chart -> Editor -> Colors Settings", () => {
    describe("for pie", () => {
        test("Changes series color", done => {
            const el = mount({
                globalSeriesType: "pie",
                columnMapping: { a: "x", b: "y" },
            }, done);
            findByTestID(el, "Chart.Series.v.Color")
                .find(".color-picker-trigger")
                .last()
                .simulate("click");
            findByTestID(el, "ColorPicker")
                .last()
                .find("input")
                .simulate("change", { target: { value: "red" } });
        });
    });
    describe("for heatmap", () => {
        test("Changes color scheme", done => {
            const el = mount({
                globalSeriesType: "heatmap",
                columnMapping: { a: "x", b: "y" },
            }, done);
            findByTestID(el, "Chart.Colors.Heatmap.ColorScheme")
                .last()
                .simulate("mouseDown");
            findByTestID(el, "Chart.Colors.Heatmap.ColorScheme.Blues")
                .last()
                .simulate("click");
        });
        test("Sets custom color scheme", done => {
            const el = mount({
                globalSeriesType: "heatmap",
                columnMapping: { a: "x", b: "y" },
                colorScheme: "Custom...",
            }, (0, lodash_1.after)(2, done)); // we will perform 2 actions, so call `done` after all of them completed
            findByTestID(el, "Chart.Colors.Heatmap.MinColor")
                .find(".color-picker-trigger")
                .last()
                .simulate("click");
            findByTestID(el, "ColorPicker")
                .last()
                .find("input")
                .simulate("change", { target: { value: "yellow" } });
            findByTestID(el, "Chart.Colors.Heatmap.MaxColor")
                .find(".color-picker-trigger")
                .last()
                .simulate("click");
            findByTestID(el, "ColorPicker")
                .last()
                .find("input")
                .simulate("change", { target: { value: "red" } });
        });
    });
    describe("for all except of pie and heatmap", () => {
        test("Changes series color", done => {
            const el = mount({
                globalSeriesType: "column",
                columnMapping: { a: "x", b: "y" },
            }, done);
            findByTestID(el, "Chart.Series.b.Color")
                .find(".color-picker-trigger")
                .last()
                .simulate("click");
            findByTestID(el, "ColorPicker")
                .last()
                .find("input")
                .simulate("change", { target: { value: "red" } });
        });
    });
});
