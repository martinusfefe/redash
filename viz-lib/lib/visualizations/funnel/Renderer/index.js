import { maxBy } from "lodash";
import React, { useMemo } from "react";
import Table from "antd/lib/table";
import Tooltip from "antd/lib/tooltip";
import { RendererPropTypes } from "../../prop-types";
import ColorPalette from "../../ColorPalette";
import { createNumberFormatter } from "../../../lib/value-format";
import prepareData from "./prepareData";
import FunnelBar from "./FunnelBar";
import "./index.less";
function generateRowKeyPrefix() {
  return Math.trunc(Math.random() * Number.MAX_SAFE_INTEGER).toString(36) + ":";
}
export default function Renderer(_ref) {
  var data = _ref.data,
    options = _ref.options;
  var funnelData = useMemo(() => prepareData(data.rows, options), [data, options]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  var rowKeyPrefix = useMemo(() => generateRowKeyPrefix(), [funnelData]);
  var formatValue = useMemo(() => createNumberFormatter(options.numberFormat), [options.numberFormat]);
  var formatPercentValue = useMemo(() => {
    var format = createNumberFormatter(options.percentFormat);
    return value => {
      if (value < options.percentValuesRange.min) {
        return "<".concat(format(options.percentValuesRange.min));
      }
      if (value > options.percentValuesRange.max) {
        return ">".concat(format(options.percentValuesRange.max));
      }
      return format(value);
    };
  }, [options.percentFormat, options.percentValuesRange]);
  var columns = useMemo(() => {
    if (funnelData.length === 0) {
      return [];
    }

    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    var maxToPrevious = maxBy(funnelData, d => isFinite(d.pctPrevious) ? d.pctPrevious : 0).pctPrevious;
    return [{
      title: options.stepCol.displayAs,
      dataIndex: "step",
      width: "25%",
      className: "text-ellipsis",
      render: text => /*#__PURE__*/React.createElement(Tooltip, {
        title: text,
        mouseEnterDelay: 0,
        mouseLeaveDelay: 0
      }, text)
    }, {
      title: options.valueCol.displayAs,
      dataIndex: "value",
      width: "45%",
      align: "center",
      render: (value, item) =>
      /*#__PURE__*/
      // @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message
      React.createElement(FunnelBar, {
        align: "center",
        color: ColorPalette.Cyan,
        value: item.pctMax
      }, formatValue(value))
    }, {
      title: "% Max",
      dataIndex: "pctMax",
      width: "15%",
      align: "center",
      render: value => formatPercentValue(value)
    }, {
      title: "% Previous",
      dataIndex: "pctPrevious",
      width: "15%",
      align: "center",
      render: value =>
      /*#__PURE__*/
      // @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message
      React.createElement(FunnelBar, {
        className: "funnel-percent-column",
        value: value / maxToPrevious * 100.0
      }, formatPercentValue(value))
    }];
  }, [options.stepCol.displayAs, options.valueCol.displayAs, funnelData, formatValue, formatPercentValue]);
  if (funnelData.length === 0) {
    return null;
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "funnel-visualization-container"
  }, /*#__PURE__*/React.createElement(Table
  // @ts-expect-error ts-migrate(2322) FIXME: Type '({ title: any; dataIndex: string; width: str... Remove this comment to see the full error message
  , {
    columns: columns,
    dataSource: funnelData,
    rowKey: (record, index) => rowKeyPrefix + index,
    pagination: false
  }));
}
Renderer.propTypes = RendererPropTypes;
//# sourceMappingURL=index.js.map