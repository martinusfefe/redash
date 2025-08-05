"use strict";
/*!
 * React port of Cornelius library (based on v0.1 released under the MIT license)
 * Original library: http://restorando.github.io/cornelius
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Cornelius;
const lodash_1 = require("lodash");
const moment_1 = __importDefault(require("moment"));
const chroma_js_1 = __importDefault(require("chroma-js"));
const react_1 = __importStar(require("react"));
const tooltip_1 = __importDefault(require("antd/lib/tooltip"));
const value_format_1 = require("@/lib/value-format");
const chooseTextColorForBackground_1 = __importDefault(require("@/lib/chooseTextColorForBackground"));
require("./cornelius.less");
const momentInterval = {
    daily: "days",
    weekly: "weeks",
    monthly: "months",
    yearly: "years",
};
const timeLabelFormats = {
    daily: "MMMM D, YYYY",
    weekly: "[Week of] MMM D, YYYY",
    monthly: "MMMM YYYY",
    yearly: "YYYY",
};
const defaultOptions = {
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
        steps: 7,
    },
};
function prepareOptions(options) {
    options = (0, lodash_1.extend)({}, defaultOptions, options, {
        initialDate: (0, moment_1.default)(options.initialDate),
        colors: (0, lodash_1.extend)({}, defaultOptions.colors, options.colors),
    });
    return (0, lodash_1.extend)(options, {
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        timeLabelFormat: timeLabelFormats[options.timeInterval],
        formatNumber: (0, value_format_1.createNumberFormatter)(options.numberFormat),
        formatPercent: (0, value_format_1.createNumberFormatter)(options.percentFormat),
        getColorForValue: chroma_js_1.default
            .scale([options.colors.min, options.colors.max])
            .mode("hsl")
            .domain([0, 100])
            .classes(options.colors.steps),
    });
}
function isLightColor(backgroundColor) {
    backgroundColor = (0, chroma_js_1.default)(backgroundColor);
    const white = "#ffffff";
    const black = "#000000";
    return chroma_js_1.default.contrast(backgroundColor, white) < chroma_js_1.default.contrast(backgroundColor, black);
}
function formatStageTitle(options, index) {
    return (0, value_format_1.formatSimpleTemplate)(options.stageColumnTitle, { "@": options.initialIntervalNumber - 1 + index });
}
function formatTimeLabel(options, offset) {
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    const interval = momentInterval[options.timeInterval];
    return options.initialDate
        .clone()
        .add(offset, interval)
        .format(options.timeLabelFormat);
}
function CorneliusHeader({ options, maxRowLength }) {
    // eslint-disable-line react/prop-types
    const cells = [];
    for (let i = 1; i < maxRowLength; i += 1) {
        cells.push(react_1.default.createElement("th", { key: `col${i}`, className: "cornelius-stage" }, formatStageTitle(options, i)));
    }
    return (react_1.default.createElement("tr", null,
        react_1.default.createElement("th", { className: "cornelius-time" }, options.timeColumnTitle),
        react_1.default.createElement("th", { className: "cornelius-people" }, options.peopleColumnTitle),
        cells));
}
function CorneliusRow({ options, data, index, maxRowLength }) {
    // eslint-disable-line react/prop-types
    const baseValue = data[0] || 0;
    const cells = [];
    for (let i = 1; i < maxRowLength; i += 1) {
        const value = data[i];
        const percentageValue = (0, lodash_1.isFinite)(value / baseValue) ? (value / baseValue) * 100 : null;
        const cellProps = { key: `col${i}` };
        if ((0, lodash_1.isNil)(percentageValue)) {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'className' does not exist on type '{ key... Remove this comment to see the full error message
            cellProps.className = "cornelius-empty";
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'children' does not exist on type '{ key:... Remove this comment to see the full error message
            cellProps.children = options.noValuePlaceholder;
        }
        else {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'className' does not exist on type '{ key... Remove this comment to see the full error message
            cellProps.className = options.displayAbsoluteValues ? "cornelius-absolute" : "cornelius-percentage";
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'children' does not exist on type '{ key:... Remove this comment to see the full error message
            cellProps.children = options.displayAbsoluteValues
                ? options.formatNumber(value)
                : options.formatPercent(percentageValue);
            const backgroundColor = options.getColorForValue(percentageValue);
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'style' does not exist on type '{ key: st... Remove this comment to see the full error message
            cellProps.style = {
                backgroundColor,
                color: (0, chooseTextColorForBackground_1.default)(backgroundColor),
            };
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'style' does not exist on type '{ key: st... Remove this comment to see the full error message
            if (isLightColor(cellProps.style.color)) {
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'className' does not exist on type '{ key... Remove this comment to see the full error message
                cellProps.className += " cornelius-white-text";
            }
            if (options.rawNumberOnHover && !options.displayAbsoluteValues) {
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'children' does not exist on type '{ key:... Remove this comment to see the full error message
                cellProps.children = (react_1.default.createElement(tooltip_1.default, { title: options.formatNumber(value), mouseEnterDelay: 0, mouseLeaveDelay: 0 },
                    react_1.default.createElement("div", null, cellProps.children)));
            }
        }
        cells.push(react_1.default.createElement("td", { ...cellProps }));
    }
    return (react_1.default.createElement("tr", null,
        react_1.default.createElement("td", { className: "cornelius-label" }, formatTimeLabel(options, index)),
        react_1.default.createElement("td", { className: "cornelius-people" }, options.formatNumber(baseValue)),
        cells));
}
function Cornelius({ data, options }) {
    options = (0, react_1.useMemo)(() => prepareOptions(options), [options]);
    const maxRowLength = (0, react_1.useMemo)(() => (0, lodash_1.min)([
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'length' does not exist on type 'number'.
        (0, lodash_1.max)((0, lodash_1.map)(data, d => d.length)) || 0,
        // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
        options.maxColumns + 1, // each row includes totals, but `maxColumns` is only for stage columns
    ]), [data, options.maxColumns]);
    if (data.length === 0) {
        return null;
    }
    return (react_1.default.createElement("div", { className: "cornelius-container" },
        options.title && react_1.default.createElement("div", { className: "cornelius-title" }, options.title),
        react_1.default.createElement("table", { className: "cornelius-table" },
            react_1.default.createElement("thead", null,
                react_1.default.createElement(CorneliusHeader, { options: options, maxRowLength: maxRowLength })),
            react_1.default.createElement("tbody", null, (0, lodash_1.map)(data, (row, index) => (react_1.default.createElement(CorneliusRow, { key: `row${index}`, options: options, data: row, index: index, maxRowLength: maxRowLength })))))));
}
Cornelius.defaultProps = {
    data: [],
    options: {},
};
