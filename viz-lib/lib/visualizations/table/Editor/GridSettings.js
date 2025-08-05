import { map } from "lodash";
import React from "react";
import { Section, Select } from "../../../components/visualizations/editor";
import { EditorPropTypes } from "../../prop-types";
var ALLOWED_ITEM_PER_PAGE = [5, 10, 15, 20, 25, 50, 100, 150, 200, 250, 500];
export default function GridSettings(_ref) {
  var options = _ref.options,
    onOptionsChange = _ref.onOptionsChange;
  return (
    /*#__PURE__*/
    // @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message
    React.createElement(Section, null, /*#__PURE__*/React.createElement(Select, {
      label: "Items per page",
      "data-test": "Table.ItemsPerPage",
      defaultValue: options.itemsPerPage,
      onChange: itemsPerPage => onOptionsChange({
        itemsPerPage
      })
    }, map(ALLOWED_ITEM_PER_PAGE, value =>
    /*#__PURE__*/
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message
    React.createElement(Select.Option, {
      key: "ipp".concat(value),
      value: value,
      "data-test": "Table.ItemsPerPage.".concat(value)
    }, value))))
  );
}
GridSettings.propTypes = EditorPropTypes;
//# sourceMappingURL=GridSettings.js.map