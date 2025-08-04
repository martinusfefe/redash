import React from "react";
import enzyme from "enzyme";
import getOptions from "../getOptions";
import Editor from "./index";
function findByTestID(wrapper, testId) {
  return wrapper.find("[data-test=\"".concat(testId, "\"]"));
}
function elementExists(wrapper, testId) {
  return findByTestID(wrapper, testId).length > 0;
}
function mount(options, data) {
  options = getOptions(options);
  return enzyme.mount( /*#__PURE__*/React.createElement(Editor, {
    visualizationName: "Test",
    data: data,
    options: options,
    onOptionsChange: () => {}
  }));
}
describe("Visualizations -> Chart -> Editor (wrapper)", () => {
  test("Renders generic wrapper", () => {
    var el = mount({
      globalSeriesType: "column"
    }, {
      columns: [],
      rows: []
    });
    expect(elementExists(el, "VisualizationEditor.Tabs.General")).toBeTruthy();
    expect(elementExists(el, "VisualizationEditor.Tabs.XAxis")).toBeTruthy();
    expect(elementExists(el, "VisualizationEditor.Tabs.YAxis")).toBeTruthy();
    expect(elementExists(el, "VisualizationEditor.Tabs.Series")).toBeTruthy();
    expect(elementExists(el, "VisualizationEditor.Tabs.Colors")).toBeTruthy();
    expect(elementExists(el, "VisualizationEditor.Tabs.DataLabels")).toBeTruthy();
    expect(elementExists(el, "Chart.GlobalSeriesType")).toBeTruthy(); // general settings block exists
    expect(elementExists(el, "Chart.Custom.Code")).toBeFalsy(); // custom settings block does not exist
  });

  test("Renders wrapper for custom charts", () => {
    var el = mount({
      globalSeriesType: "custom"
    }, {
      columns: [],
      rows: []
    });
    expect(elementExists(el, "VisualizationEditor.Tabs.General")).toBeTruthy();
    expect(elementExists(el, "VisualizationEditor.Tabs.XAxis")).toBeFalsy();
    expect(elementExists(el, "VisualizationEditor.Tabs.YAxis")).toBeFalsy();
    expect(elementExists(el, "VisualizationEditor.Tabs.Series")).toBeFalsy();
    expect(elementExists(el, "VisualizationEditor.Tabs.Colors")).toBeFalsy();
    expect(elementExists(el, "VisualizationEditor.Tabs.DataLabels")).toBeFalsy();
    expect(elementExists(el, "Chart.GlobalSeriesType")).toBeTruthy(); // general settings block exists
    expect(elementExists(el, "Chart.Custom.Code")).toBeTruthy(); // custom settings block exists
  });
});
//# sourceMappingURL=index.test.js.map