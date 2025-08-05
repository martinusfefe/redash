import React from "react";
import enzyme from "enzyme";
import Column from "./datetime";
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
describe("Visualizations -> Table -> Columns -> Date/Time", () => {
  describe("Editor", () => {
    test("Changes format", done => {
      var el = mount({
        name: "a",
        dateTimeFormat: "YYYY-MM-DD HH:mm:ss"
      }, done);
      findByTestID(el, "Table.ColumnEditor.DateTime.Format").last().find("input").simulate("change", {
        target: {
          value: "YYYY/MM/DD HH:ss"
        }
      });
    });
  });
});
//# sourceMappingURL=datetime.test.js.map