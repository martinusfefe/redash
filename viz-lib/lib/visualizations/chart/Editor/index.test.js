"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = __importDefault(require("enzyme"));
const getOptions_1 = __importDefault(require("../getOptions"));
const index_1 = __importDefault(require("./index"));
function findByTestID(wrapper, testId) {
    return wrapper.find(`[data-test="${testId}"]`);
}
function elementExists(wrapper, testId) {
    return findByTestID(wrapper, testId).length > 0;
}
function mount(options, data) {
    options = (0, getOptions_1.default)(options);
    return enzyme_1.default.mount(react_1.default.createElement(index_1.default, { visualizationName: "Test", data: data, options: options, onOptionsChange: () => { } }));
}
describe("Visualizations -> Chart -> Editor (wrapper)", () => {
    test("Renders generic wrapper", () => {
        const el = mount({ globalSeriesType: "column" }, { columns: [], rows: [] });
        expect(elementExists(el, "VisualizationEditor.Tabs.General")).toBeTruthy();
        expect(elementExists(el, "VisualizationEditor.Tabs.XAxis")).toBeTruthy();
        expect(elementExists(el, "VisualizationEditor.Tabs.YAxis")).toBeTruthy();
        expect(elementExists(el, "VisualizationEditor.Tabs.Series")).toBeTruthy();
        expect(elementExists(el, "VisualizationEditor.Tabs.Colors")).toBeTruthy();
        expect(elementExists(el, "VisualizationEditor.Tabs.DataLabels")).toBeTruthy();
        expect(elementExists(el, "Chart.GlobalSeriesType")).toBeTruthy(); // general settings block exists
        expect(elementExists(el, "Chart.Custom.Code")).toBeFalsy(); // custom settings block does not exist
    });
    test("Renders wrapper for custom charts", () => {
        const el = mount({ globalSeriesType: "custom" }, { columns: [], rows: [] });
        expect(elementExists(el, "VisualizationEditor.Tabs.General")).toBeTruthy();
        expect(elementExists(el, "VisualizationEditor.Tabs.XAxis")).toBeFalsy();
        expect(elementExists(el, "VisualizationEditor.Tabs.YAxis")).toBeFalsy();
        expect(elementExists(el, "VisualizationEditor.Tabs.Series")).toBeFalsy();
        expect(elementExists(el, "VisualizationEditor.Tabs.Colors")).toBeFalsy();
        expect(elementExists(el, "VisualizationEditor.Tabs.DataLabels")).toBeFalsy();
        expect(elementExists(el, "Chart.GlobalSeriesType")).toBeTruthy(); // general settings block exists
        expect(elementExists(el, "Chart.Custom.Code")).toBeTruthy(); // custom settings block exists
    });
});
