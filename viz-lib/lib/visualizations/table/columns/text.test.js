"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = __importDefault(require("enzyme"));
const text_1 = __importDefault(require("./text"));
function findByTestID(wrapper, testId) {
    return wrapper.find(`[data-test="${testId}"]`);
}
function mount(column, done) {
    return enzyme_1.default.mount(react_1.default.createElement(text_1.default.Editor
    // @ts-expect-error ts-migrate(2322) FIXME: Type '{ visualizationName: string; column: any; on... Remove this comment to see the full error message
    , { 
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ visualizationName: string; column: any; on... Remove this comment to see the full error message
        visualizationName: "Test", column: column, onChange: changedColumn => {
            expect(changedColumn).toMatchSnapshot();
            done();
        } }));
}
describe("Visualizations -> Table -> Columns -> Text", () => {
    describe("Editor", () => {
        test("Enables HTML content", done => {
            const el = mount({
                name: "a",
                allowHTML: false,
                highlightLinks: false,
            }, done);
            findByTestID(el, "Table.ColumnEditor.Text.AllowHTML")
                .last()
                .find("input")
                .simulate("change", { target: { checked: true } });
        });
        test("Enables highlight links option", done => {
            const el = mount({
                name: "a",
                allowHTML: true,
                highlightLinks: false,
            }, done);
            findByTestID(el, "Table.ColumnEditor.Text.HighlightLinks")
                .last()
                .find("input")
                .simulate("change", { target: { checked: true } });
        });
    });
});
