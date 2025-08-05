import React from "react";
import { Section, Input, InputNumber, Switch } from "../../../components/visualizations/editor";
import { EditorPropTypes } from "../../prop-types";
import { isValueNumber } from "../utils";
export default function FormatSettings(_ref) {
  var options = _ref.options,
    data = _ref.data,
    onOptionsChange = _ref.onOptionsChange;
  var inputsEnabled = isValueNumber(data.rows, options);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(InputNumber, {
    layout: "horizontal",
    label: "Formatting Decimal Place",
    "data-test": "Counter.Formatting.DecimalPlace",
    defaultValue: options.stringDecimal,
    disabled: !inputsEnabled,
    onChange: stringDecimal => onOptionsChange({
      stringDecimal
    })
  })), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(Input, {
    layout: "horizontal",
    label: "Formatting Decimal Character",
    "data-test": "Counter.Formatting.DecimalCharacter",
    defaultValue: options.stringDecChar,
    disabled: !inputsEnabled,
    onChange: e => onOptionsChange({
      stringDecChar: e.target.value
    })
  })), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(Input, {
    layout: "horizontal",
    label: "Formatting Thousands Separator",
    "data-test": "Counter.Formatting.ThousandsSeparator",
    defaultValue: options.stringThouSep,
    disabled: !inputsEnabled,
    onChange: e => onOptionsChange({
      stringThouSep: e.target.value
    })
  })), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(Input, {
    layout: "horizontal",
    label: "Formatting String Prefix",
    "data-test": "Counter.Formatting.StringPrefix",
    defaultValue: options.stringPrefix,
    disabled: !inputsEnabled,
    onChange: e => onOptionsChange({
      stringPrefix: e.target.value
    })
  })), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(Input, {
    layout: "horizontal",
    label: "Formatting String Suffix",
    "data-test": "Counter.Formatting.StringSuffix",
    defaultValue: options.stringSuffix,
    disabled: !inputsEnabled,
    onChange: e => onOptionsChange({
      stringSuffix: e.target.value
    })
  })), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(Switch
  // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
  , {
    "data-test": "Counter.Formatting.FormatTargetValue"
    // @ts-expect-error ts-migrate(2322) FIXME: Type 'any' is not assignable to type 'never'.
    ,
    defaultChecked: options.formatTargetValue
    // @ts-expect-error ts-migrate(2322) FIXME: Type '(formatTargetValue: any) => any' is not assi... Remove this comment to see the full error message
    ,
    onChange: formatTargetValue => onOptionsChange({
      formatTargetValue
    })
  }, "Format Target Value")));
}
FormatSettings.propTypes = EditorPropTypes;
//# sourceMappingURL=FormatSettings.js.map