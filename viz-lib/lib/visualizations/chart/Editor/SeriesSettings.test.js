"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = __importDefault(require("enzyme"));
const getOptions_1 = __importDefault(require("../getOptions"));
const SeriesSettings_1 = __importDefault(require("./SeriesSettings"));
function findByTestID(wrapper, testId) {
    return wrapper.find(`[data-test="${testId}"]`);
}
function mount(options, done) {
    options = (0, getOptions_1.default)(options);
    return enzyme_1.default.mount(react_1.default.createElement(SeriesSettings_1.default, { visualizationName: "Test", data: { columns: [{ name: "a", type: "string" }], rows: [{ a: "test" }] }, options: options, onOptionsChange: changedOptions => {
            expect(changedOptions).toMatchSnapshot();
            done();
        } }));
}
describe("Visualizations -> Chart -> Editor -> Series Settings", () => {
    test("Changes series type", done => {
        const el = mount({
            globalSeriesType: "column",
            columnMapping: { a: "y" },
            seriesOptions: {
                a: { type: "column", label: "a", yAxis: 0 },
            },
        }, done);
        findByTestID(el, "Chart.Series.a.Type")
            .last()
            .simulate("mouseDown");
        findByTestID(el, "Chart.ChartType.area")
            .last()
            .simulate("click");
    });
    test("Changes series label", done => {
        const el = mount({
            globalSeriesType: "column",
            columnMapping: { a: "y" },
            seriesOptions: {
                a: { type: "column", label: "a", yAxis: 0 },
            },
        }, done);
        findByTestID(el, "Chart.Series.a.Label")
            .last()
            .simulate("change", { target: { value: "test" } });
    });
    test("Changes series axis", done => {
        const el = mount({
            globalSeriesType: "column",
            columnMapping: { a: "y" },
            seriesOptions: {
                a: { type: "column", name: "a", yAxis: 0 },
            },
        }, done);
        findByTestID(el, "Chart.Series.a.UseRightAxis")
            .last()
            .find("input")
            .simulate("change", { target: { checked: true } });
    });
});
