"use strict";

var _react = _interopRequireDefault(require("react"));
var _enzyme = _interopRequireDefault(require("enzyme"));
var _getOptions = _interopRequireDefault(require("../getOptions"));
var _XAxisSettings = _interopRequireDefault(require("./XAxisSettings"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function findByTestID(wrapper, testId) {
  return wrapper.find("[data-test=\"".concat(testId, "\"]"));
}
function mount(options, done) {
  options = (0, _getOptions.default)(options);
  return _enzyme.default.mount( /*#__PURE__*/_react.default.createElement(_XAxisSettings.default, {
    visualizationName: "Test",
    data: {
      columns: [],
      rows: []
    },
    options: options,
    onOptionsChange: changedOptions => {
      expect(changedOptions).toMatchSnapshot();
      done();
    }
  }));
}
describe("Visualizations -> Chart -> Editor -> X-Axis Settings", () => {
  test("Changes axis type", done => {
    var el = mount({
      globalSeriesType: "column",
      xAxis: {
        type: "-",
        labels: {
          enabled: true
        }
      }
    }, done);
    findByTestID(el, "Chart.XAxis.Type").last().simulate("mouseDown");
    findByTestID(el, "Chart.XAxis.Type.Linear").last().simulate("click");
  });
  test("Changes axis name", done => {
    var el = mount({
      globalSeriesType: "column",
      xAxis: {
        type: "-",
        labels: {
          enabled: true
        }
      }
    }, done);
    findByTestID(el, "Chart.XAxis.Name").last().simulate("change", {
      target: {
        value: "test"
      }
    });
  });
  test("Changes axis tick format", done => {
    var el = mount({
      globalSeriesType: "column",
      xAxis: {}
    }, done);
    findByTestID(el, "Chart.XAxis.TickFormat").last().simulate("change", {
      target: {
        value: "%B"
      }
    });
  });
  test("Sets Show Labels option", done => {
    var el = mount({
      globalSeriesType: "column",
      xAxis: {
        type: "-",
        labels: {
          enabled: false
        }
      }
    }, done);
    findByTestID(el, "Chart.XAxis.ShowLabels").last().simulate("click");
  });
  test("Sets Sort X Values option", done => {
    var el = mount({
      globalSeriesType: "column",
      sortX: false
    }, done);
    findByTestID(el, "Chart.XAxis.Sort").last().simulate("click");
  });
  test("Sets Reverse X Values option", done => {
    var el = mount({
      globalSeriesType: "column",
      reverseX: false
    }, done);
    findByTestID(el, "Chart.XAxis.Reverse").last().simulate("click");
  });
});
//# sourceMappingURL=XAxisSettings.test.js.map