import React from "react";
import enzyme from "enzyme";
import getOptions from "../getOptions";
import ColumnsSettings from "./ColumnsSettings";
function findByTestID(wrapper, testId) {
  return wrapper.find("[data-test=\"".concat(testId, "\"]"));
}
function mount(options, done) {
  var data = {
    columns: [{
      name: "a",
      type: "string"
    }],
    rows: [{
      a: "test"
    }]
  };
  options = getOptions(options, data);
  return enzyme.mount( /*#__PURE__*/React.createElement(ColumnsSettings, {
    visualizationName: "Test",
    data: data,
    options: options,
    onOptionsChange: changedOptions => {
      expect(changedOptions).toMatchSnapshot();
      done();
    }
  }));
}
describe("Visualizations -> Table -> Editor -> Columns Settings", () => {
  test("Toggles column visibility", done => {
    var el = mount({}, done);
    findByTestID(el, "Table.Column.a.Visibility").last().simulate("click");
  });
  test("Changes column title", done => {
    var el = mount({}, done);
    findByTestID(el, "Table.Column.a.Name").last().simulate("click"); // expand settings

    findByTestID(el, "Table.Column.a.Title").last().simulate("change", {
      target: {
        value: "test"
      }
    });
  });
  test("Changes column alignment", done => {
    var el = mount({}, done);
    findByTestID(el, "Table.Column.a.Name").last().simulate("click"); // expand settings

    findByTestID(el, "Table.Column.a.TextAlignment").last().find('[data-test="TextAlignmentSelect.Right"] input').simulate("change", {
      target: {
        checked: true
      }
    });
  });
  test("Enables search by column data", done => {
    var el = mount({}, done);
    findByTestID(el, "Table.Column.a.Name").last().simulate("click"); // expand settings

    findByTestID(el, "Table.Column.a.UseForSearch").last().find("input").simulate("change", {
      target: {
        checked: true
      }
    });
  });
  test("Changes column display type", done => {
    var el = mount({}, done);
    findByTestID(el, "Table.Column.a.Name").last().simulate("click"); // expand settings

    findByTestID(el, "Table.Column.a.DisplayAs").last().simulate("mouseDown");
    findByTestID(el, "Table.Column.a.DisplayAs.number").last().simulate("click");
  });
});
//# sourceMappingURL=ColumnsSettings.test.js.map