"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = __importDefault(require("enzyme"));
const image_1 = __importDefault(require("./image"));
function findByTestID(wrapper, testId) {
    return wrapper.find(`[data-test="${testId}"]`);
}
function mount(column, done) {
    return enzyme_1.default.mount(react_1.default.createElement(image_1.default.Editor
    // @ts-expect-error ts-migrate(2322) FIXME: Type '{ visualizationName: string; column: any; on... Remove this comment to see the full error message
    , { 
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ visualizationName: string; column: any; on... Remove this comment to see the full error message
        visualizationName: "Test", column: column, onChange: changedColumn => {
            expect(changedColumn).toMatchSnapshot();
            done();
        } }));
}
describe("Visualizations -> Table -> Columns -> Image", () => {
    describe("Editor", () => {
        test("Changes URL template", done => {
            const el = mount({
                name: "a",
                imageUrlTemplate: "{{ @ }}",
            }, done);
            findByTestID(el, "Table.ColumnEditor.Image.UrlTemplate")
                .last()
                .find("input")
                .simulate("change", { target: { value: "http://{{ @ }}.jpeg" } });
        });
        test("Changes width", done => {
            const el = mount({
                name: "a",
                imageWidth: null,
            }, done);
            findByTestID(el, "Table.ColumnEditor.Image.Width")
                .last()
                .find("input")
                .simulate("change", { target: { value: "400" } });
        });
        test("Changes height", done => {
            const el = mount({
                name: "a",
                imageHeight: null,
            }, done);
            findByTestID(el, "Table.ColumnEditor.Image.Height")
                .last()
                .find("input")
                .simulate("change", { target: { value: "300" } });
        });
        test("Changes title template", done => {
            const el = mount({
                name: "a",
                imageUrlTemplate: "{{ @ }}",
            }, done);
            findByTestID(el, "Table.ColumnEditor.Image.TitleTemplate")
                .last()
                .find("input")
                .simulate("change", { target: { value: "Image {{ @ }}" } });
        });
    });
});
