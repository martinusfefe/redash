"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = __importDefault(require("enzyme"));
const datetime_1 = __importDefault(require("./datetime"));
function findByTestID(wrapper, testId) {
    return wrapper.find(`[data-test="${testId}"]`);
}
function mount(column, done) {
    return enzyme_1.default.mount(react_1.default.createElement(datetime_1.default.Editor
    // @ts-expect-error ts-migrate(2322) FIXME: Type '{ visualizationName: string; column: any; on... Remove this comment to see the full error message
    , { 
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ visualizationName: string; column: any; on... Remove this comment to see the full error message
        visualizationName: "Test", column: column, onChange: changedColumn => {
            expect(changedColumn).toMatchSnapshot();
            done();
        } }));
}
describe("Visualizations -> Table -> Columns -> Date/Time", () => {
    describe("Editor", () => {
        test("Changes format", done => {
            const el = mount({
                name: "a",
                dateTimeFormat: "YYYY-MM-DD HH:mm:ss",
            }, done);
            findByTestID(el, "Table.ColumnEditor.DateTime.Format")
                .last()
                .find("input")
                .simulate("change", { target: { value: "YYYY/MM/DD HH:ss" } });
        });
    });
});
