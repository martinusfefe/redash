import React from "react";
import enzyme from "enzyme";
import Column from "./number";
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
describe("Visualizations -> Table -> Columns -> Number", () => {
  describe("Editor", () => {
    test("Changes format", done => {
      var el = mount({
        name: "a",
        numberFormat: "0[.]0000"
      }, done);
      findByTestID(el, "Table.ColumnEditor.Number.Format").last().find("input").simulate("change", {
        target: {
          value: "0.00%"
        }
      });
    });
  });
});
//# sourceMappingURL=number.test.js.map