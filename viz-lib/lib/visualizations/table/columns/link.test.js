"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = __importDefault(require("enzyme"));
const link_1 = __importDefault(require("./link"));
function findByTestID(wrapper, testId) {
    return wrapper.find(`[data-test="${testId}"]`);
}
function mount(column, done) {
    return enzyme_1.default.mount(react_1.default.createElement(link_1.default.Editor
    // @ts-expect-error ts-migrate(2322) FIXME: Type '{ visualizationName: string; column: any; on... Remove this comment to see the full error message
    , { 
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ visualizationName: string; column: any; on... Remove this comment to see the full error message
        visualizationName: "Test", column: column, onChange: changedColumn => {
            expect(changedColumn).toMatchSnapshot();
            done();
        } }));
}
describe("Visualizations -> Table -> Columns -> Link", () => {
    describe("Editor", () => {
        test("Changes URL template", done => {
            const el = mount({
                name: "a",
                linkUrlTemplate: "{{ @ }}",
            }, done);
            findByTestID(el, "Table.ColumnEditor.Link.UrlTemplate")
                .last()
                .find("input")
                .simulate("change", { target: { value: "http://{{ @ }}/index.html" } });
        });
        test("Changes text template", done => {
            const el = mount({
                name: "a",
                linkTextTemplate: "{{ @ }}",
            }, done);
            findByTestID(el, "Table.ColumnEditor.Link.TextTemplate")
                .last()
                .find("input")
                .simulate("change", { target: { value: "Text of {{ @ }}" } });
        });
        test("Changes title template", done => {
            const el = mount({
                name: "a",
                linkTitleTemplate: "{{ @ }}",
            }, done);
            findByTestID(el, "Table.ColumnEditor.Link.TitleTemplate")
                .last()
                .find("input")
                .simulate("change", { target: { value: "Title of {{ @ }}" } });
        });
        test("Makes link open in new tab ", done => {
            const el = mount({
                name: "a",
                linkOpenInNewTab: false,
            }, done);
            findByTestID(el, "Table.ColumnEditor.Link.OpenInNewTab")
                .last()
                .find("input")
                .simulate("change", { target: { checked: true } });
        });
    });
});
