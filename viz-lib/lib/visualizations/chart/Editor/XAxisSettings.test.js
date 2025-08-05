"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = __importDefault(require("enzyme"));
const getOptions_1 = __importDefault(require("../getOptions"));
const XAxisSettings_1 = __importDefault(require("./XAxisSettings"));
function findByTestID(wrapper, testId) {
    return wrapper.find(`[data-test="${testId}"]`);
}
function mount(options, done) {
    options = (0, getOptions_1.default)(options);
    return enzyme_1.default.mount(react_1.default.createElement(XAxisSettings_1.default, { visualizationName: "Test", data: { columns: [], rows: [] }, options: options, onOptionsChange: changedOptions => {
            expect(changedOptions).toMatchSnapshot();
            done();
        } }));
}
describe("Visualizations -> Chart -> Editor -> X-Axis Settings", () => {
    test("Changes axis type", done => {
        const el = mount({
            globalSeriesType: "column",
            xAxis: { type: "-", labels: { enabled: true } },
        }, done);
        findByTestID(el, "Chart.XAxis.Type")
            .last()
            .simulate("mouseDown");
        findByTestID(el, "Chart.XAxis.Type.Linear")
            .last()
            .simulate("click");
    });
    test("Changes axis name", done => {
        const el = mount({
            globalSeriesType: "column",
            xAxis: { type: "-", labels: { enabled: true } },
        }, done);
        findByTestID(el, "Chart.XAxis.Name")
            .last()
            .simulate("change", { target: { value: "test" } });
    });
    test("Changes axis tick format", done => {
        const el = mount({
            globalSeriesType: "column",
            xAxis: {},
        }, done);
        findByTestID(el, "Chart.XAxis.TickFormat")
            .last()
            .simulate("change", { target: { value: "%B" } });
    });
    test("Sets Show Labels option", done => {
        const el = mount({
            globalSeriesType: "column",
            xAxis: { type: "-", labels: { enabled: false } },
        }, done);
        findByTestID(el, "Chart.XAxis.ShowLabels")
            .last()
            .simulate("click");
    });
    test("Sets Sort X Values option", done => {
        const el = mount({
            globalSeriesType: "column",
            sortX: false,
        }, done);
        findByTestID(el, "Chart.XAxis.Sort")
            .last()
            .simulate("click");
    });
    test("Sets Reverse X Values option", done => {
        const el = mount({
            globalSeriesType: "column",
            reverseX: false,
        }, done);
        findByTestID(el, "Chart.XAxis.Reverse")
            .last()
            .simulate("click");
    });
});
