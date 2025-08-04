import React from "react";
import enzyme from "enzyme";
import Column from "./text";
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
describe("Visualizations -> Table -> Columns -> Text", () => {
  describe("Editor", () => {
    test("Enables HTML content", done => {
      var el = mount({
        name: "a",
        allowHTML: false,
        highlightLinks: false
      }, done);
      findByTestID(el, "Table.ColumnEditor.Text.AllowHTML").last().find("input").simulate("change", {
        target: {
          checked: true
        }
      });
    });
    test("Enables highlight links option", done => {
      var el = mount({
        name: "a",
        allowHTML: true,
        highlightLinks: false
      }, done);
      findByTestID(el, "Table.ColumnEditor.Text.HighlightLinks").last().find("input").simulate("change", {
        target: {
          checked: true
        }
      });
    });
  });
});
//# sourceMappingURL=text.test.js.map