/*!
 * React port of Cornelius library (based on v0.1 released under the MIT license)
 * Original library: http://restorando.github.io/cornelius
 */

import { isNil, isFinite, map, extend, min, max } from "lodash";
import moment from "moment";
import chroma from "chroma-js";
import React, { useMemo } from "react";
import Tooltip from "antd/lib/tooltip";
import { createNumberFormatter, formatSimpleTemplate } from "../../lib/value-format";
import chooseTextColorForBackground from "../../lib/chooseTextColorForBackground";
import "./cornelius.less";
var momentInterval = {
  daily: "days",
  weekly: "weeks",
  monthly: "months",
  yearly: "years"
};
var timeLabelFormats = {
  daily: "MMMM D, YYYY",
  weekly: "[Week of] MMM D, YYYY",
  monthly: "MMMM YYYY",
  yearly: "YYYY"
};
var defaultOptions = {
  initialDate: null,
  timeInterval: "monthly",
  noValuePlaceholder: "-",
  rawNumberOnHover: true,
  displayAbsoluteValues: false,
  initialIntervalNumber: 1,
  maxColumns: Infinity,
  title: null,
  timeColumnTitle: "Time",
  peopleColumnTitle: "People",
  stageColumnTitle: "{{ @ }}",
  numberFormat: "0,0[.]00",
  percentFormat: "0.00%",
  timeLabelFormat: timeLabelFormats.monthly,
  colors: {
    min: "#ffffff",
    max: "#041d66",
    steps: 7
  }
};
function prepareOptions(options) {
  options = extend({}, defaultOptions, options, {
    initialDate: moment(options.initialDate),
    colors: extend({}, defaultOptions.colors, options.colors)
  });
  return extend(options, {
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    timeLabelFormat: timeLabelFormats[options.timeInterval],
    formatNumber: createNumberFormatter(options.numberFormat),
    formatPercent: createNumberFormatter(options.percentFormat),
    getColorForValue: chroma.scale([options.colors.min, options.colors.max]).mode("hsl").domain([0, 100]).classes(options.colors.steps)
  });
}
function isLightColor(backgroundColor) {
  backgroundColor = chroma(backgroundColor);
  var white = "#ffffff";
  var black = "#000000";
  return chroma.contrast(backgroundColor, white) < chroma.contrast(backgroundColor, black);
}
function formatStageTitle(options, index) {
  return formatSimpleTemplate(options.stageColumnTitle, {
    "@": options.initialIntervalNumber - 1 + index
  });
}
function formatTimeLabel(options, offset) {
  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  var interval = momentInterval[options.timeInterval];
  return options.initialDate.clone().add(offset, interval).format(options.timeLabelFormat);
}
function CorneliusHeader(_ref) {
  var options = _ref.options,
    maxRowLength = _ref.maxRowLength;
  // eslint-disable-line react/prop-types
  var cells = [];
  for (var i = 1; i < maxRowLength; i += 1) {
    cells.push( /*#__PURE__*/React.createElement("th", {
      key: "col".concat(i),
      className: "cornelius-stage"
    }, formatStageTitle(options, i)));
  }
  return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
    className: "cornelius-time"
  }, options.timeColumnTitle), /*#__PURE__*/React.createElement("th", {
    className: "cornelius-people"
  }, options.peopleColumnTitle), cells);
}
function CorneliusRow(_ref2) {
  var options = _ref2.options,
    data = _ref2.data,
    index = _ref2.index,
    maxRowLength = _ref2.maxRowLength;
  // eslint-disable-line react/prop-types
  var baseValue = data[0] || 0;
  var cells = [];
  for (var i = 1; i < maxRowLength; i += 1) {
    var value = data[i];
    var percentageValue = isFinite(value / baseValue) ? value / baseValue * 100 : null;
    var cellProps = {
      key: "col".concat(i)
    };
    if (isNil(percentageValue)) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'className' does not exist on type '{ key... Remove this comment to see the full error message
      cellProps.className = "cornelius-empty";
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'children' does not exist on type '{ key:... Remove this comment to see the full error message
      cellProps.children = options.noValuePlaceholder;
    } else {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'className' does not exist on type '{ key... Remove this comment to see the full error message
      cellProps.className = options.displayAbsoluteValues ? "cornelius-absolute" : "cornelius-percentage";
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'children' does not exist on type '{ key:... Remove this comment to see the full error message
      cellProps.children = options.displayAbsoluteValues ? options.formatNumber(value) : options.formatPercent(percentageValue);
      var backgroundColor = options.getColorForValue(percentageValue);
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'style' does not exist on type '{ key: st... Remove this comment to see the full error message
      cellProps.style = {
        backgroundColor,
        color: chooseTextColorForBackground(backgroundColor)
      };
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'style' does not exist on type '{ key: st... Remove this comment to see the full error message
      if (isLightColor(cellProps.style.color)) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'className' does not exist on type '{ key... Remove this comment to see the full error message
        cellProps.className += " cornelius-white-text";
      }
      if (options.rawNumberOnHover && !options.displayAbsoluteValues) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'children' does not exist on type '{ key:... Remove this comment to see the full error message
        cellProps.children = /*#__PURE__*/React.createElement(Tooltip, {
          title: options.formatNumber(value),
          mouseEnterDelay: 0,
          mouseLeaveDelay: 0
        }, /*#__PURE__*/React.createElement("div", null, cellProps.children));
      }
    }
    cells.push( /*#__PURE__*/React.createElement("td", cellProps));
  }
  return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    className: "cornelius-label"
  }, formatTimeLabel(options, index)), /*#__PURE__*/React.createElement("td", {
    className: "cornelius-people"
  }, options.formatNumber(baseValue)), cells);
}
export default function Cornelius(_ref3) {
  var data = _ref3.data,
    options = _ref3.options;
  options = useMemo(() => prepareOptions(options), [options]);
  var maxRowLength = useMemo(() => min([
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'length' does not exist on type 'number'.
  max(map(data, d => d.length)) || 0,
  // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
  options.maxColumns + 1 // each row includes totals, but `maxColumns` is only for stage columns
  ]), [data, options.maxColumns]);
  if (data.length === 0) {
    return null;
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "cornelius-container"
  }, options.title && /*#__PURE__*/React.createElement("div", {
    className: "cornelius-title"
  }, options.title), /*#__PURE__*/React.createElement("table", {
    className: "cornelius-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement(CorneliusHeader, {
    options: options,
    maxRowLength: maxRowLength
  })), /*#__PURE__*/React.createElement("tbody", null, map(data, (row, index) => /*#__PURE__*/React.createElement(CorneliusRow, {
    key: "row".concat(index),
    options: options,
    data: row,
    index: index,
    maxRowLength: maxRowLength
  })))));
}
Cornelius.defaultProps = {
  data: [],
  options: {}
};
//# sourceMappingURL=Cornelius.js.map