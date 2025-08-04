import { merge } from "lodash";
import React from "react";
import { Section, Switch } from "../../components/visualizations/editor";
import { EditorPropTypes } from "../prop-types";
export default function Editor(_ref) {
  var options = _ref.options,
    onOptionsChange = _ref.onOptionsChange;
  var updateOptions = updates => {
    onOptionsChange(merge({}, options, updates));
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(Switch
  // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
  , {
    "data-test": "PivotEditor.HideControls"
    // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
    ,
    id: "pivot-show-controls"
    // @ts-expect-error ts-migrate(2322) FIXME: Type 'boolean' is not assignable to type 'never'.
    ,
    defaultChecked: !options.controls.enabled
    // @ts-expect-error ts-migrate(2322) FIXME: Type '(enabled: any) => void' is not assignable to... Remove this comment to see the full error message
    ,
    onChange: enabled => updateOptions({
      controls: {
        enabled: !enabled
      }
    })
  }, "Show Pivot Controls")), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(Switch
  // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
  , {
    id: "pivot-show-row-totals"
    // @ts-expect-error ts-migrate(2322) FIXME: Type 'any' is not assignable to type 'never'.
    ,
    defaultChecked: options.rendererOptions.table.rowTotals
    // @ts-expect-error ts-migrate(2322) FIXME: Type '(rowTotals: any) => void' is not assignable ... Remove this comment to see the full error message
    ,
    onChange: rowTotals => updateOptions({
      rendererOptions: {
        table: {
          rowTotals
        }
      }
    })
  }, "Show Row Totals")), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(Switch
  // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
  , {
    id: "pivot-show-column-totals"
    // @ts-expect-error ts-migrate(2322) FIXME: Type 'any' is not assignable to type 'never'.
    ,
    defaultChecked: options.rendererOptions.table.colTotals
    // @ts-expect-error ts-migrate(2322) FIXME: Type '(colTotals: any) => void' is not assignable ... Remove this comment to see the full error message
    ,
    onChange: colTotals => updateOptions({
      rendererOptions: {
        table: {
          colTotals
        }
      }
    })
  }, "Show Column Totals")));
}
Editor.propTypes = EditorPropTypes;
//# sourceMappingURL=Editor.js.map