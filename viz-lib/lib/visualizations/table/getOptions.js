"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getOptions;
const lodash_1 = __importDefault(require("lodash"));
const visualizationsSettings_1 = require("../../visualizations/visualizationsSettings");
const DEFAULT_OPTIONS = {
    itemsPerPage: 25,
    paginationSize: "default", // not editable through Editor
};
const filterTypes = ["filter", "multi-filter", "multiFilter"];
function getColumnNameWithoutType(column) {
    let typeSplit;
    if (column.indexOf("::") !== -1) {
        typeSplit = "::";
    }
    else if (column.indexOf("__") !== -1) {
        typeSplit = "__";
    }
    else {
        return column;
    }
    const parts = column.split(typeSplit);
    if (parts[0] === "" && parts.length === 2) {
        return parts[1];
    }
    if (!lodash_1.default.includes(filterTypes, parts[1])) {
        return column;
    }
    return parts[0];
}
function getColumnContentAlignment(type) {
    return ["integer", "float", "boolean", "date", "datetime"].indexOf(type) >= 0 ? "right" : "left";
}
function getDefaultColumnsOptions(columns) {
    const displayAs = {
        integer: "number",
        float: "number",
        boolean: "boolean",
        date: "datetime",
        datetime: "datetime",
    };
    return lodash_1.default.map(columns, (col, index) => ({
        name: col.name,
        type: col.type,
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        displayAs: displayAs[col.type] || "string",
        visible: true,
        order: 100000 + index,
        title: getColumnNameWithoutType(col.name),
        allowSearch: false,
        alignContent: getColumnContentAlignment(col.type),
        // `string` cell options
        allowHTML: false,
        highlightLinks: false,
    }));
}
function getDefaultFormatOptions(column) {
    const dateTimeFormat = {
        date: visualizationsSettings_1.visualizationsSettings.dateFormat || "DD/MM/YYYY",
        datetime: visualizationsSettings_1.visualizationsSettings.dateTimeFormat || "DD/MM/YYYY HH:mm",
    };
    const numberFormat = {
        integer: visualizationsSettings_1.visualizationsSettings.integerFormat || "0,0",
        float: visualizationsSettings_1.visualizationsSettings.floatFormat || "0,0.00",
    };
    return {
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        dateTimeFormat: dateTimeFormat[column.type],
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        numberFormat: numberFormat[column.type],
        nullValue: visualizationsSettings_1.visualizationsSettings.nullValue,
        booleanValues: visualizationsSettings_1.visualizationsSettings.booleanValues || ["false", "true"],
        // `image` cell options
        imageUrlTemplate: "{{ @ }}",
        imageTitleTemplate: "{{ @ }}",
        imageWidth: "",
        imageHeight: "",
        // `link` cell options
        linkUrlTemplate: "{{ @ }}",
        linkTextTemplate: "{{ @ }}",
        linkTitleTemplate: "{{ @ }}",
        linkOpenInNewTab: true,
    };
}
function wereColumnsReordered(queryColumns, visualizationColumns) {
    queryColumns = lodash_1.default.map(queryColumns, col => col.name);
    visualizationColumns = lodash_1.default.map(visualizationColumns, col => col.name);
    // Some columns may be removed - so skip them (but keep original order)
    visualizationColumns = lodash_1.default.filter(visualizationColumns, col => lodash_1.default.includes(queryColumns, col));
    // Pick query columns that were previously saved with viz (but keep order too)
    queryColumns = lodash_1.default.filter(queryColumns, col => lodash_1.default.includes(visualizationColumns, col));
    // Both array now have the same size as they both contains only common columns
    // (in fact, it was an intersection, that kept order of items on both arrays).
    // Now check for equality item-by-item; if common columns are in the same order -
    // they were not reordered in editor
    for (let i = 0; i < queryColumns.length; i += 1) {
        if (visualizationColumns[i] !== queryColumns[i]) {
            return true;
        }
    }
    return false;
}
function getColumnsOptions(columns, visualizationColumns) {
    const options = getDefaultColumnsOptions(columns);
    if (wereColumnsReordered(columns, visualizationColumns)) {
        visualizationColumns = lodash_1.default.fromPairs(lodash_1.default.map(visualizationColumns, (col, index) => [col.name, lodash_1.default.extend({}, col, { order: index })]));
    }
    else {
        visualizationColumns = lodash_1.default.fromPairs(lodash_1.default.map(visualizationColumns, col => [col.name, lodash_1.default.omit(col, "order")]));
    }
    lodash_1.default.each(options, col => lodash_1.default.extend(col, visualizationColumns[col.name]));
    return lodash_1.default.sortBy(options, "order");
}
function getOptions(options, { columns }) {
    options = { ...DEFAULT_OPTIONS, ...options };
    options.columns = lodash_1.default.map(getColumnsOptions(columns, options.columns), col => ({
        ...getDefaultFormatOptions(col),
        ...col,
    }));
    return options;
}
