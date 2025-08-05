import React from "react";
import HtmlContent from "../../../components/HtmlContent";
import { Section, Checkbox } from "../../../components/visualizations/editor";
import { createTextFormatter } from "../../../lib/value-format";
function Editor(_ref) {
  var column = _ref.column,
    _onChange = _ref.onChange;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(Checkbox, {
    "data-test": "Table.ColumnEditor.Text.AllowHTML",
    checked: column.allowHTML,
    onChange: event => _onChange({
      allowHTML: event.target.checked
    })
  }, "Allow HTML content")), column.allowHTML &&
  /*#__PURE__*/
  // @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message
  React.createElement(Section, null, /*#__PURE__*/React.createElement(Checkbox, {
    "data-test": "Table.ColumnEditor.Text.HighlightLinks",
    checked: column.highlightLinks,
    onChange: event => _onChange({
      highlightLinks: event.target.checked
    })
  }, "Highlight links")));
}
export default function initTextColumn(column) {
  var format = createTextFormatter(column.allowHTML && column.highlightLinks);
  function prepareData(row) {
    return {
      text: format(row[column.name])
    };
  }
  function TextColumn(_ref2) {
    var row = _ref2.row;
    // eslint-disable-line react/prop-types
    var _prepareData = prepareData(row),
      text = _prepareData.text;
    return column.allowHTML ? /*#__PURE__*/React.createElement(HtmlContent, null, text) : text;
  }
  TextColumn.prepareData = prepareData;
  return TextColumn;
}
initTextColumn.friendlyName = "Text";
initTextColumn.Editor = Editor;
//# sourceMappingURL=text.js.map