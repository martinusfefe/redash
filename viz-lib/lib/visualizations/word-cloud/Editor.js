import { map, merge } from "lodash";
import React from "react";
import * as Grid from "antd/lib/grid";
import { Section, Select, InputNumber, ControlLabel } from "../../components/visualizations/editor";
import { EditorPropTypes } from "../prop-types";
export default function Editor(_ref) {
  var options = _ref.options,
    data = _ref.data,
    onOptionsChange = _ref.onOptionsChange;
  var optionsChanged = newOptions => {
    onOptionsChange(merge({}, options, newOptions));
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(Select, {
    label: "Words Column",
    "data-test": "WordCloud.WordsColumn",
    value: options.column,
    onChange: column => optionsChanged({
      column
    })
  }, map(data.columns, _ref2 => {
    var name = _ref2.name;
    return (
      /*#__PURE__*/
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message
      React.createElement(Select.Option, {
        key: name,
        "data-test": "WordCloud.WordsColumn." + name
      }, name)
    );
  }))), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(Select, {
    label: "Frequencies Column",
    "data-test": "WordCloud.FrequenciesColumn",
    value: options.frequenciesColumn,
    onChange: frequenciesColumn => optionsChanged({
      frequenciesColumn
    })
  }, /*#__PURE__*/React.createElement(Select.Option, {
    key: "none",
    value: ""
  }, /*#__PURE__*/React.createElement("i", null, "(count word frequencies automatically)")), map(data.columns, _ref3 => {
    var name = _ref3.name;
    return (
      /*#__PURE__*/
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message
      React.createElement(Select.Option, {
        key: "column-" + name,
        value: name,
        "data-test": "WordCloud.FrequenciesColumn." + name
      }, name)
    );
  }))), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(ControlLabel, {
    label: "Words Length Limit"
  }, /*#__PURE__*/React.createElement(Grid.Row, {
    gutter: 15,
    type: "flex"
  }, /*#__PURE__*/React.createElement(Grid.Col, {
    span: 12
  }, /*#__PURE__*/React.createElement(InputNumber, {
    "data-test": "WordCloud.WordLengthLimit.Min",
    placeholder: "Min",
    min: 0,
    value: options.wordLengthLimit.min,
    onChange: value => optionsChanged({
      wordLengthLimit: {
        min: value > 0 ? value : null
      }
    })
  })), /*#__PURE__*/React.createElement(Grid.Col, {
    span: 12
  }, /*#__PURE__*/React.createElement(InputNumber, {
    "data-test": "WordCloud.WordLengthLimit.Max",
    placeholder: "Max",
    min: 0,
    value: options.wordLengthLimit.max,
    onChange: value => optionsChanged({
      wordLengthLimit: {
        max: value > 0 ? value : null
      }
    })
  }))))), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(ControlLabel, {
    label: "Frequencies Limit"
  }, /*#__PURE__*/React.createElement(Grid.Row, {
    gutter: 15,
    type: "flex"
  }, /*#__PURE__*/React.createElement(Grid.Col, {
    span: 12
  }, /*#__PURE__*/React.createElement(InputNumber, {
    "data-test": "WordCloud.WordCountLimit.Min",
    placeholder: "Min",
    min: 0,
    value: options.wordCountLimit.min,
    onChange: value => optionsChanged({
      wordCountLimit: {
        min: value > 0 ? value : null
      }
    })
  })), /*#__PURE__*/React.createElement(Grid.Col, {
    span: 12
  }, /*#__PURE__*/React.createElement(InputNumber, {
    "data-test": "WordCloud.WordCountLimit.Max",
    placeholder: "Max",
    min: 0,
    value: options.wordCountLimit.max,
    onChange: value => optionsChanged({
      wordCountLimit: {
        max: value > 0 ? value : null
      }
    })
  }))))));
}
Editor.propTypes = EditorPropTypes;
//# sourceMappingURL=Editor.js.map