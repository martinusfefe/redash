import React from "react";
import enzyme from "enzyme";
import Column from "./boolean";
function findByTestID(wrapper, testId) {
  return wrapper.find("[data-test=\"".concat(testId, "\"]"));
}
function mount(column, done) {
  return enzyme.mount( /*#__PURE__*/React.createElement(Column.Editor, {
    // @ts-expect-error ts-migrate(2322) FIXME: Type '{ visualizationName: string; column: any; on... Remove this comment to see the full error message
    visualizationName: "Test",
    column: column,
    onChange: changedColumn => {
      expect(changedColumn).toMatchSnapshot();
      done();
    }
  }));
}
describe("Visualizations -> Table -> Columns -> Boolean", () => {
  describe("Editor", () => {
    test("Changes value for FALSE", done => {
      var el = mount({
        name: "a",
        booleanValues: ["false", "true"]
      }, done);
      findByTestID(el, "Table.ColumnEditor.Boolean.False").last().find("input").simulate("change", {
        target: {
          value: "no"
        }
      });
    });
    test("Changes value for TRUE", done => {
      var el = mount({
        name: "a",
        booleanValues: ["false", "true"]
      }, done);
      findByTestID(el, "Table.ColumnEditor.Boolean.True").last().find("input").simulate("change", {
        target: {
          value: "yes"
        }
      });
    });
  });
});
//# sourceMappingURL=boolean.test.js.map