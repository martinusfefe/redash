"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = __importDefault(require("enzyme"));
const getOptions_1 = __importDefault(require("../getOptions"));
const YAxisSettings_1 = __importDefault(require("./YAxisSettings"));
function findByTestID(wrapper, testId) {
    return wrapper.find(`[data-test="${testId}"]`);
}
function elementExists(wrapper, testId) {
    return findByTestID(wrapper, testId).length > 0;
}
function mount(options, done) {
    options = (0, getOptions_1.default)(options);
    return enzyme_1.default.mount(react_1.default.createElement(YAxisSettings_1.default, { visualizationName: "Test", data: { columns: [], rows: [] }, options: options, onOptionsChange: changedOptions => {
            expect(changedOptions).toMatchSnapshot();
            done();
        } }));
}
describe("Visualizations -> Chart -> Editor -> Y-Axis Settings", () => {
    test("Changes axis type", done => {
        const el = mount({
            globalSeriesType: "column",
            yAxis: [{ type: "linear" }, { type: "linear", opposite: true }],
        }, done);
        findByTestID(el, "Chart.LeftYAxis.Type")
            .last()
            .simulate("mouseDown");
        findByTestID(el, "Chart.LeftYAxis.Type.Category")
            .last()
            .simulate("click");
    });
    test("Changes axis name", done => {
        const el = mount({
            globalSeriesType: "column",
            yAxis: [{ type: "linear" }, { type: "linear", opposite: true }],
        }, done);
        findByTestID(el, "Chart.LeftYAxis.Name")
            .last()
            .simulate("change", { target: { value: "test" } });
    });
    test("Changes axis tick format", done => {
        const el = mount({
            globalSeriesType: "column",
            yAxis: [],
        }, done);
        findByTestID(el, "Chart.LeftYAxis.TickFormat")
            .last()
            .simulate("change", { target: { value: "s" } });
    });
    test("Changes axis min value", done => {
        const el = mount({
            globalSeriesType: "column",
            yAxis: [{ type: "linear" }, { type: "linear", opposite: true }],
        }, done);
        findByTestID(el, "Chart.LeftYAxis.RangeMin")
            .find("input")
            .last()
            .simulate("change", { target: { value: "50" } });
    });
    test("Changes axis max value", done => {
        const el = mount({
            globalSeriesType: "column",
            yAxis: [{ type: "linear" }, { type: "linear", opposite: true }],
        }, done);
        findByTestID(el, "Chart.LeftYAxis.RangeMax")
            .find("input")
            .last()
            .simulate("change", { target: { value: "200" } });
    });
    describe("for non-heatmap", () => {
        test("Right Y Axis should be available", () => {
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
            const el = mount({
                globalSeriesType: "column",
                yAxis: [{ type: "linear" }, { type: "linear", opposite: true }],
            });
            expect(elementExists(el, "Chart.RightYAxis.Type")).toBeTruthy();
        });
    });
    describe("for heatmap", () => {
        test("Right Y Axis should not be available", () => {
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
            const el = mount({
                globalSeriesType: "heatmap",
                yAxis: [{ type: "linear" }, { type: "linear", opposite: true }],
            });
            expect(elementExists(el, "Chart.RightYAxis.Type")).toBeFalsy();
        });
        test("Sets Sort X Values option", done => {
            const el = mount({
                globalSeriesType: "heatmap",
                sortY: false,
            }, done);
            findByTestID(el, "Chart.LeftYAxis.Sort")
                .last()
                .simulate("click");
        });
        test("Sets Reverse Y Values option", done => {
            const el = mount({
                globalSeriesType: "heatmap",
                reverseY: false,
            }, done);
            findByTestID(el, "Chart.LeftYAxis.Reverse")
                .last()
                .simulate("click");
        });
    });
});
