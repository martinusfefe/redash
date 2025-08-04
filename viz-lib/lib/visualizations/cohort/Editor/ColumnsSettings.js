import { map } from "lodash";
import React from "react";
import { Section, Select } from "../../../components/visualizations/editor";
import { EditorPropTypes } from "../../prop-types";
export default function ColumnsSettings(_ref) {
  var options = _ref.options,
    data = _ref.data,
    onOptionsChange = _ref.onOptionsChange;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(Select, {
    layout: "horizontal",
    label: "Date (Bucket)",
    "data-test": "Cohort.DateColumn",
    value: options.dateColumn,
    onChange: dateColumn => onOptionsChange({
      dateColumn
    })
  }, map(data.columns, _ref2 => {
    var name = _ref2.name;
    return (
      /*#__PURE__*/
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message
      React.createElement(Select.Option, {
        key: name,
        "data-test": "Cohort.DateColumn." + name
      }, name)
    );
  }))), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(Select, {
    layout: "horizontal",
    label: "Stage",
    "data-test": "Cohort.StageColumn",
    value: options.stageColumn,
    onChange: stageColumn => onOptionsChange({
      stageColumn
    })
  }, map(data.columns, _ref3 => {
    var name = _ref3.name;
    return (
      /*#__PURE__*/
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message
      React.createElement(Select.Option, {
        key: name,
        "data-test": "Cohort.StageColumn." + name
      }, name)
    );
  }))), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(Select, {
    layout: "horizontal",
    label: "Bucket Population Size",
    "data-test": "Cohort.TotalColumn",
    value: options.totalColumn,
    onChange: totalColumn => onOptionsChange({
      totalColumn
    })
  }, map(data.columns, _ref4 => {
    var name = _ref4.name;
    return (
      /*#__PURE__*/
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message
      React.createElement(Select.Option, {
        key: name,
        "data-test": "Cohort.TotalColumn." + name
      }, name)
    );
  }))), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(Select, {
    layout: "horizontal",
    label: "Stage Value",
    "data-test": "Cohort.ValueColumn",
    value: options.valueColumn,
    onChange: valueColumn => onOptionsChange({
      valueColumn
    })
  }, map(data.columns, _ref5 => {
    var name = _ref5.name;
    return (
      /*#__PURE__*/
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message
      React.createElement(Select.Option, {
        key: name,
        "data-test": "Cohort.ValueColumn." + name
      }, name)
    );
  }))));
}
ColumnsSettings.propTypes = EditorPropTypes;
//# sourceMappingURL=ColumnsSettings.js.map