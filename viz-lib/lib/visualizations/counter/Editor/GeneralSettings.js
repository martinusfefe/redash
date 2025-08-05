import { map } from "lodash";
import React from "react";
import { Section, Select, Input, InputNumber, Switch } from "../../../components/visualizations/editor";
import { EditorPropTypes } from "../../prop-types";
export default function GeneralSettings(_ref) {
  var options = _ref.options,
    data = _ref.data,
    visualizationName = _ref.visualizationName,
    onOptionsChange = _ref.onOptionsChange;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(Input, {
    layout: "horizontal",
    label: "Counter Label",
    "data-test": "Counter.General.Label",
    defaultValue: options.counterLabel,
    placeholder: visualizationName,
    onChange: e => onOptionsChange({
      counterLabel: e.target.value
    })
  })), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(Select, {
    layout: "horizontal",
    label: "Counter Value Column Name",
    "data-test": "Counter.General.ValueColumn",
    defaultValue: options.counterColName,
    disabled: options.countRow,
    onChange: counterColName => onOptionsChange({
      counterColName
    })
  }, map(data.columns, col =>
  /*#__PURE__*/
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message
  React.createElement(Select.Option, {
    key: col.name,
    "data-test": "Counter.General.ValueColumn." + col.name
  }, col.name)))), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(InputNumber, {
    layout: "horizontal",
    label: "Counter Value Row Number",
    "data-test": "Counter.General.ValueRowNumber",
    defaultValue: options.rowNumber,
    disabled: options.countRow,
    onChange: rowNumber => onOptionsChange({
      rowNumber
    })
  })), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(Select, {
    layout: "horizontal",
    label: "Target Value Column Name",
    "data-test": "Counter.General.TargetValueColumn",
    defaultValue: options.targetColName,
    onChange: targetColName => onOptionsChange({
      targetColName
    })
  }, /*#__PURE__*/React.createElement(Select.Option, {
    value: ""
  }, "No target value"), map(data.columns, col =>
  /*#__PURE__*/
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message
  React.createElement(Select.Option, {
    key: col.name,
    "data-test": "Counter.General.TargetValueColumn." + col.name
  }, col.name)))), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(InputNumber, {
    layout: "horizontal",
    label: "Target Value Row Number",
    "data-test": "Counter.General.TargetValueRowNumber",
    defaultValue: options.targetRowNumber,
    onChange: targetRowNumber => onOptionsChange({
      targetRowNumber
    })
  })), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(Switch
  // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
  , {
    "data-test": "Counter.General.CountRows"
    // @ts-expect-error ts-migrate(2322) FIXME: Type 'any' is not assignable to type 'never'.
    ,
    defaultChecked: options.countRow
    // @ts-expect-error ts-migrate(2322) FIXME: Type '(countRow: any) => any' is not assignable to... Remove this comment to see the full error message
    ,
    onChange: countRow => onOptionsChange({
      countRow
    })
  }, "Count Rows")));
}
GeneralSettings.propTypes = EditorPropTypes;
//# sourceMappingURL=GeneralSettings.js.map