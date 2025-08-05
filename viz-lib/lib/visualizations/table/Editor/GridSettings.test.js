import React from "react";
import enzyme from "enzyme";
import getOptions from "../getOptions";
import GridSettings from "./GridSettings";
function findByTestID(wrapper, testId) {
  return wrapper.find("[data-test=\"".concat(testId, "\"]"));
}
function mount(options, done) {
  var data = {
    columns: [],
    rows: []
  };
  options = getOptions(options, data);
  return enzyme.mount( /*#__PURE__*/React.createElement(GridSettings, {
    visualizationName: "Test",
    data: data,
    options: options,
    onOptionsChange: changedOptions => {
      expect(changedOptions).toMatchSnapshot();
      done();
    }
  }));
}
describe("Visualizations -> Table -> Editor -> Grid Settings", () => {
  test("Changes items per page", done => {
    var el = mount({
      itemsPerPage: 25
    }, done);
    findByTestID(el, "Table.ItemsPerPage").last().simulate("mouseDown");
    findByTestID(el, "Table.ItemsPerPage.100").last().simulate("click");
  });
});
//# sourceMappingURL=GridSettings.test.js.map