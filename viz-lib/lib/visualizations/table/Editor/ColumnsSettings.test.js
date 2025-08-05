"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = __importDefault(require("enzyme"));
const getOptions_1 = __importDefault(require("../getOptions"));
const ColumnsSettings_1 = __importDefault(require("./ColumnsSettings"));
function findByTestID(wrapper, testId) {
    return wrapper.find(`[data-test="${testId}"]`);
}
function mount(options, done) {
    const data = {
        columns: [{ name: "a", type: "string" }],
        rows: [{ a: "test" }],
    };
    options = (0, getOptions_1.default)(options, data);
    return enzyme_1.default.mount(react_1.default.createElement(ColumnsSettings_1.default, { visualizationName: "Test", data: data, options: options, onOptionsChange: changedOptions => {
            expect(changedOptions).toMatchSnapshot();
            done();
        } }));
}
describe("Visualizations -> Table -> Editor -> Columns Settings", () => {
    test("Toggles column visibility", done => {
        const el = mount({}, done);
        findByTestID(el, "Table.Column.a.Visibility")
            .last()
            .simulate("click");
    });
    test("Changes column title", done => {
        const el = mount({}, done);
        findByTestID(el, "Table.Column.a.Name")
            .last()
            .simulate("click"); // expand settings
        findByTestID(el, "Table.Column.a.Title")
            .last()
            .simulate("change", { target: { value: "test" } });
    });
    test("Changes column alignment", done => {
        const el = mount({}, done);
        findByTestID(el, "Table.Column.a.Name")
            .last()
            .simulate("click"); // expand settings
        findByTestID(el, "Table.Column.a.TextAlignment")
            .last()
            .find('[data-test="TextAlignmentSelect.Right"] input')
            .simulate("change", { target: { checked: true } });
    });
    test("Enables search by column data", done => {
        const el = mount({}, done);
        findByTestID(el, "Table.Column.a.Name")
            .last()
            .simulate("click"); // expand settings
        findByTestID(el, "Table.Column.a.UseForSearch")
            .last()
            .find("input")
            .simulate("change", { target: { checked: true } });
    });
    test("Changes column display type", done => {
        const el = mount({}, done);
        findByTestID(el, "Table.Column.a.Name")
            .last()
            .simulate("click"); // expand settings
        findByTestID(el, "Table.Column.a.DisplayAs")
            .last()
            .simulate("mouseDown");
        findByTestID(el, "Table.Column.a.DisplayAs.number")
            .last()
            .simulate("click");
    });
});
