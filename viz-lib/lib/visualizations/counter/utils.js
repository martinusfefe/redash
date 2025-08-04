import { isNumber, isFinite, toString } from "lodash";
import numeral from "numeral";

// TODO: allow user to specify number format string instead of delimiters only
// It will allow to remove this function (move all that weird formatting logic to a migration
// that will set number format for all existing counter visualization)
function numberFormat(value, decimalPoints, decimalDelimiter, thousandsDelimiter) {
  // Temporarily update locale data (restore defaults after formatting)
  var locale = numeral.localeData();
  var savedDelimiters = locale.delimiters;

  // Mimic old behavior - AngularJS `number` filter defaults:
  // - `,` as thousands delimiter
  // - `.` as decimal delimiter
  // - three decimal points
  locale.delimiters = {
    thousands: ",",
    decimal: "."
  };
  var formatString = "0,0.000";
  if (Number.isFinite(decimalPoints) && decimalPoints >= 0 || decimalDelimiter || thousandsDelimiter) {
    locale.delimiters = {
      thousands: thousandsDelimiter,
      decimal: decimalDelimiter || "."
    };
    formatString = "0,0";
    if (decimalPoints > 0) {
      formatString += ".";
      while (decimalPoints > 0) {
        formatString += "0";
        decimalPoints -= 1;
      }
    }
  }
  var result = numeral(value).format(formatString);
  locale.delimiters = savedDelimiters;
  return result;
}

// 0 - special case, use first record
// 1..N - 1-based record number from beginning (wraps if greater than dataset size)
// -1..-N - 1-based record number from end (wraps if greater than dataset size)
function getRowNumber(index, rowsCount) {
  index = parseInt(index, 10) || 0;
  if (index === 0) {
    return index;
  }
  var wrappedIndex = (Math.abs(index) - 1) % rowsCount;
  return index > 0 ? wrappedIndex : rowsCount - wrappedIndex - 1;
}
function formatValue(value, _ref) {
  var stringPrefix = _ref.stringPrefix,
    stringSuffix = _ref.stringSuffix,
    stringDecimal = _ref.stringDecimal,
    stringDecChar = _ref.stringDecChar,
    stringThouSep = _ref.stringThouSep;
  if (isNumber(value)) {
    value = numberFormat(value, stringDecimal, stringDecChar, stringThouSep);
    return toString(stringPrefix) + value + toString(stringSuffix);
  }
  return toString(value);
}
function formatTooltip(value, formatString) {
  if (isNumber(value)) {
    return numeral(value).format(formatString);
  }
  return toString(value);
}
export function getCounterData(rows, options, visualizationName) {
  var result = {};
  var rowsCount = rows.length;
  if (rowsCount > 0 || options.countRow) {
    var counterColName = options.counterColName;
    var targetColName = options.targetColName;

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'counterLabel' does not exist on type '{}... Remove this comment to see the full error message
    result.counterLabel = options.counterLabel || visualizationName;
    if (options.countRow) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'counterValue' does not exist on type '{}... Remove this comment to see the full error message
      result.counterValue = rowsCount;
    } else if (counterColName) {
      var rowNumber = getRowNumber(options.rowNumber, rowsCount);
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'counterValue' does not exist on type '{}... Remove this comment to see the full error message
      result.counterValue = rows[rowNumber][counterColName];
    }

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'showTrend' does not exist on type '{}'.
    result.showTrend = false;
    if (targetColName) {
      var targetRowNumber = getRowNumber(options.targetRowNumber, rowsCount);
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'targetValue' does not exist on type '{}'... Remove this comment to see the full error message
      result.targetValue = rows[targetRowNumber][targetColName];

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'counterValue' does not exist on type '{}... Remove this comment to see the full error message
      if (Number.isFinite(result.counterValue) && isFinite(result.targetValue)) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'counterValue' does not exist on type '{}... Remove this comment to see the full error message
        var delta = result.counterValue - result.targetValue;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'showTrend' does not exist on type '{}'.
        result.showTrend = true;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'trendPositive' does not exist on type '{... Remove this comment to see the full error message
        result.trendPositive = delta >= 0;
      }
    } else {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'targetValue' does not exist on type '{}'... Remove this comment to see the full error message
      result.targetValue = null;
    }

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'counterValueTooltip' does not exist on t... Remove this comment to see the full error message
    result.counterValueTooltip = formatTooltip(result.counterValue, options.tooltipFormat);
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'targetValueTooltip' does not exist on ty... Remove this comment to see the full error message
    result.targetValueTooltip = formatTooltip(result.targetValue, options.tooltipFormat);

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'counterValue' does not exist on type '{}... Remove this comment to see the full error message
    result.counterValue = formatValue(result.counterValue, options);
    if (options.formatTargetValue) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'targetValue' does not exist on type '{}'... Remove this comment to see the full error message
      result.targetValue = formatValue(result.targetValue, options);
    } else {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'targetValue' does not exist on type '{}'... Remove this comment to see the full error message
      if (isFinite(result.targetValue)) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'targetValue' does not exist on type '{}'... Remove this comment to see the full error message
        result.targetValue = numeral(result.targetValue).format("0[.]00[0]");
      }
    }
  }
  return result;
}
export function isValueNumber(rows, options) {
  if (options.countRow) {
    return true; // array length is always a number
  }

  var rowsCount = rows.length;
  if (rowsCount > 0) {
    var rowNumber = getRowNumber(options.rowNumber, rowsCount);
    var counterColName = options.counterColName;
    if (counterColName) {
      return isNumber(rows[rowNumber][counterColName]);
    }
  }
  return false;
}
//# sourceMappingURL=utils.js.map