import React from "react";
import { Section, Switch } from "../../../components/visualizations/editor";
import { EditorPropTypes } from "../../prop-types";
import AxisSettings from "./AxisSettings";
export default function XAxisSettings(_ref) {
  var options = _ref.options,
    onOptionsChange = _ref.onOptionsChange;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AxisSettings, {
    id: "XAxis",
    features: {
      autoDetectType: true
    },
    options: options.xAxis
    // @ts-expect-error ts-migrate(2322) FIXME: Type '(xAxis: any) => any' is not assignable to ty... Remove this comment to see the full error message
    ,
    onChange: xAxis => onOptionsChange({
      xAxis
    })
  }), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(Switch
  // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
  , {
    "data-test": "Chart.XAxis.Sort"
    // @ts-expect-error ts-migrate(2322) FIXME: Type 'any' is not assignable to type 'never'.
    ,
    defaultChecked: options.sortX
    // @ts-expect-error ts-migrate(2322) FIXME: Type '(sortX: any) => any' is not assignable to ty... Remove this comment to see the full error message
    ,
    onChange: sortX => onOptionsChange({
      sortX
    })
  }, "Sort Values")), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(Switch
  // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
  , {
    "data-test": "Chart.XAxis.Reverse"
    // @ts-expect-error ts-migrate(2322) FIXME: Type 'any' is not assignable to type 'never'.
    ,
    defaultChecked: options.reverseX
    // @ts-expect-error ts-migrate(2322) FIXME: Type '(reverseX: any) => any' is not assignable to... Remove this comment to see the full error message
    ,
    onChange: reverseX => onOptionsChange({
      reverseX
    })
  }, "Reverse Order")), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(Switch
  // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
  , {
    "data-test": "Chart.XAxis.ShowLabels"
    // @ts-expect-error ts-migrate(2322) FIXME: Type 'any' is not assignable to type 'never'.
    ,
    defaultChecked: options.xAxis.labels.enabled
    // @ts-expect-error ts-migrate(2322) FIXME: Type '(enabled: any) => any' is not assignable to ... Remove this comment to see the full error message
    ,
    onChange: enabled => onOptionsChange({
      xAxis: {
        labels: {
          enabled
        }
      }
    })
  }, "Show Labels")));
}
XAxisSettings.propTypes = EditorPropTypes;
//# sourceMappingURL=XAxisSettings.js.map