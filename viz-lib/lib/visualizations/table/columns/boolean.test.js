"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = __importDefault(require("enzyme"));
const boolean_1 = __importDefault(require("./boolean"));
function findByTestID(wrapper, testId) {
    return wrapper.find(`[data-test="${testId}"]`);
}
function mount(column, done) {
    return enzyme_1.default.mount(react_1.default.createElement(boolean_1.default.Editor
    // @ts-expect-error ts-migrate(2322) FIXME: Type '{ visualizationName: string; column: any; on... Remove this comment to see the full error message
    , { 
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ visualizationName: string; column: any; on... Remove this comment to see the full error message
        visualizationName: "Test", column: column, onChange: changedColumn => {
            expect(changedColumn).toMatchSnapshot();
            done();
        } }));
}
describe("Visualizations -> Table -> Columns -> Boolean", () => {
    describe("Editor", () => {
        test("Changes value for FALSE", done => {
            const el = mount({
                name: "a",
                booleanValues: ["false", "true"],
            }, done);
            findByTestID(el, "Table.ColumnEditor.Boolean.False")
                .last()
                .find("input")
                .simulate("change", { target: { value: "no" } });
        });
        test("Changes value for TRUE", done => {
            const el = mount({
                name: "a",
                booleanValues: ["false", "true"],
            }, done);
            findByTestID(el, "Table.ColumnEditor.Boolean.True")
                .last()
                .find("input")
                .simulate("change", { target: { value: "yes" } });
        });
    });
});
