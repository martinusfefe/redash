import { map } from "lodash";
import React from "react";
import { Section, Select } from "../../../components/visualizations/editor";
import { EditorPropTypes } from "../../prop-types";
var CohortTimeIntervals = {
  daily: "Daily",
  weekly: "Weekly",
  monthly: "Monthly"
};
var CohortModes = {
  diagonal: "Fill gaps with zeros",
  simple: "Show data as is"
};
export default function OptionsSettings(_ref) {
  var options = _ref.options,
    onOptionsChange = _ref.onOptionsChange;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(Select, {
    layout: "horizontal",
    label: "Time Interval",
    "data-test": "Cohort.TimeInterval",
    value: options.timeInterval,
    onChange: timeInterval => onOptionsChange({
      timeInterval
    })
  }, map(CohortTimeIntervals, (name, value) =>
  /*#__PURE__*/
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message
  React.createElement(Select.Option, {
    key: value,
    "data-test": "Cohort.TimeInterval." + value
  }, name)))), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(Select, {
    layout: "horizontal",
    label: "Mode",
    "data-test": "Cohort.Mode",
    value: options.mode,
    onChange: mode => onOptionsChange({
      mode
    })
  }, map(CohortModes, (name, value) =>
  /*#__PURE__*/
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message
  React.createElement(Select.Option, {
    key: value,
    "data-test": "Cohort.Mode." + value
  }, name)))));
}
OptionsSettings.propTypes = EditorPropTypes;
//# sourceMappingURL=OptionsSettings.js.map