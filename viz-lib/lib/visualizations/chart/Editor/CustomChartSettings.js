import { isNil, trimStart } from "lodash";
import React from "react";
import { Section, Switch, TextArea } from "../../../components/visualizations/editor";
import { EditorPropTypes } from "../../prop-types";
var defaultCustomCode = trimStart("\n// Available variables are x, ys, element, and Plotly\n// Type console.log(x, ys); for more info about x and ys\n// To plot your graph call Plotly.plot(element, ...)\n// Plotly examples and docs: https://plot.ly/javascript/\n");
export default function CustomChartSettings(_ref) {
  var options = _ref.options,
    onOptionsChange = _ref.onOptionsChange;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(TextArea, {
    label: "Custom code",
    "data-test": "Chart.Custom.Code",
    rows: "10",
    defaultValue: isNil(options.customCode) ? defaultCustomCode : options.customCode,
    onChange: event => onOptionsChange({
      customCode: event.target.value
    })
  })), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(Switch
  // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
  , {
    "data-test": "Chart.Custom.EnableConsoleLogs"
    // @ts-expect-error ts-migrate(2322) FIXME: Type 'any' is not assignable to type 'never'.
    ,
    defaultChecked: options.enableConsoleLogs
    // @ts-expect-error ts-migrate(2322) FIXME: Type '(enableConsoleLogs: any) => any' is not assi... Remove this comment to see the full error message
    ,
    onChange: enableConsoleLogs => onOptionsChange({
      enableConsoleLogs
    })
  }, "Show errors in the console")), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(Switch
  // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
  , {
    id: "chart-editor-auto-update-custom-chart"
    // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
    ,
    "data-test": "Chart.Custom.AutoUpdate"
    // @ts-expect-error ts-migrate(2322) FIXME: Type 'any' is not assignable to type 'never'.
    ,
    defaultChecked: options.autoRedraw
    // @ts-expect-error ts-migrate(2322) FIXME: Type '(autoRedraw: any) => any' is not assignable ... Remove this comment to see the full error message
    ,
    onChange: autoRedraw => onOptionsChange({
      autoRedraw
    })
  }, "Auto update graph")));
}
CustomChartSettings.propTypes = EditorPropTypes;
//# sourceMappingURL=CustomChartSettings.js.map