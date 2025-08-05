"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getOptions;
const lodash_1 = require("lodash");
const DEFAULT_OPTIONS = {
    stepCol: { colName: null, displayAs: "Steps" },
    valueCol: { colName: null, displayAs: "Value" },
    autoSort: true,
    sortKeyCol: { colName: null, reverse: false },
    itemsLimit: 100,
    percentValuesRange: { min: 0.01, max: 1000.0 },
    numberFormat: "0,0[.]00",
    percentFormat: "0[.]00%",
};
function getOptions(options, { columns }) {
    options = (0, lodash_1.merge)({}, DEFAULT_OPTIONS, options);
    // Validate
    const availableColumns = (0, lodash_1.map)(columns, c => c.name);
    if (!(0, lodash_1.includes)(availableColumns, options.stepCol.colName)) {
        options.stepCol.colName = null;
    }
    if (!(0, lodash_1.includes)(availableColumns, options.valueCol.colName)) {
        options.valueCol.colName = null;
    }
    if (!(0, lodash_1.includes)(availableColumns, options.sortKeyCol.colName)) {
        options.sortKeyCol.colName = null;
    }
    if (!(0, lodash_1.isFinite)(options.itemsLimit)) {
        options.itemsLimit = DEFAULT_OPTIONS.itemsLimit;
    }
    if (options.itemsLimit < 2) {
        options.itemsLimit = 2;
    }
    if (options.autoSort) {
        options.sortKeyCol.colName = options.valueCol.colName;
        options.sortKeyCol.reverse = true;
    }
    return options;
}
