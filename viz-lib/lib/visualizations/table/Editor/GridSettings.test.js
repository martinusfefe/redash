"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = __importDefault(require("enzyme"));
const getOptions_1 = __importDefault(require("../getOptions"));
const GridSettings_1 = __importDefault(require("./GridSettings"));
function findByTestID(wrapper, testId) {
    return wrapper.find(`[data-test="${testId}"]`);
}
function mount(options, done) {
    const data = { columns: [], rows: [] };
    options = (0, getOptions_1.default)(options, data);
    return enzyme_1.default.mount(react_1.default.createElement(GridSettings_1.default, { visualizationName: "Test", data: data, options: options, onOptionsChange: changedOptions => {
            expect(changedOptions).toMatchSnapshot();
            done();
        } }));
}
describe("Visualizations -> Table -> Editor -> Grid Settings", () => {
    test("Changes items per page", done => {
        const el = mount({
            itemsPerPage: 25,
        }, done);
        findByTestID(el, "Table.ItemsPerPage")
            .last()
            .simulate("mouseDown");
        findByTestID(el, "Table.ItemsPerPage.100")
            .last()
            .simulate("click");
    });
});
