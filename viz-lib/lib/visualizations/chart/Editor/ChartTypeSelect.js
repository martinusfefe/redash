var _excluded = ["hiddenChartTypes"];
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import { filter, includes, map } from "lodash";
import React, { useMemo } from "react";
import { Select } from "../../../components/visualizations/editor";
import { visualizationsSettings } from "../../visualizationsSettings";
var allChartTypes = [{
  type: "line",
  name: "Line",
  icon: "line-chart"
}, {
  type: "column",
  name: "Bar",
  icon: "bar-chart"
}, {
  type: "area",
  name: "Area",
  icon: "area-chart"
}, {
  type: "pie",
  name: "Pie",
  icon: "pie-chart"
}, {
  type: "scatter",
  name: "Scatter",
  icon: "circle-o"
}, {
  type: "bubble",
  name: "Bubble",
  icon: "circle-o"
}, {
  type: "heatmap",
  name: "Heatmap",
  icon: "th"
}, {
  type: "box",
  name: "Box",
  icon: "square-o"
}];
export default function ChartTypeSelect(_ref) {
  var hiddenChartTypes = _ref.hiddenChartTypes,
    props = _objectWithoutProperties(_ref, _excluded);
  var chartTypes = useMemo(() => {
    var result = [...allChartTypes];
    if (visualizationsSettings.allowCustomJSVisualizations) {
      result.push({
        type: "custom",
        name: "Custom",
        icon: "code"
      });
    }
    if (hiddenChartTypes.length > 0) {
      return filter(result, _ref2 => {
        var type = _ref2.type;
        return !includes(hiddenChartTypes, type);
      });
    }
    return result;
  }, []);
  return /*#__PURE__*/React.createElement(Select, props, map(chartTypes, _ref3 => {
    var type = _ref3.type,
      name = _ref3.name,
      icon = _ref3.icon;
    return (
      /*#__PURE__*/
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message
      React.createElement(Select.Option, {
        key: type,
        value: type,
        "data-test": "Chart.ChartType.".concat(type)
      }, /*#__PURE__*/React.createElement("i", {
        className: "fa fa-".concat(icon),
        style: {
          marginRight: 5
        }
      }), name)
    );
  }));
}
ChartTypeSelect.defaultProps = {
  hiddenChartTypes: []
};
//# sourceMappingURL=ChartTypeSelect.js.map