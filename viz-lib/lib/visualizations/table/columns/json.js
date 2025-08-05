"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = initJsonColumn;
const lodash_1 = require("lodash");
const react_1 = __importDefault(require("react"));
const JsonViewInteractive_1 = __importDefault(require("../../../components/json-view-interactive/JsonViewInteractive"));
const visualizationsSettings_1 = require("../../../visualizations/visualizationsSettings");
function initJsonColumn(column) {
    function prepareData(row) {
        const text = row[column.name];
        if ((0, lodash_1.isString)(text) && text.length <= visualizationsSettings_1.visualizationsSettings.tableCellMaxJSONSize) {
            try {
                return { text, value: JSON.parse(text) };
            }
            catch (e) {
                // ignore `JSON.parse` error and return default value
            }
        }
        return { text, value: undefined };
    }
    function JsonColumn({ row }) {
        // eslint-disable-line react/prop-types
        const { text, value } = prepareData(row);
        if ((0, lodash_1.isUndefined)(value)) {
            return react_1.default.createElement("div", { className: "json-cell-invalid" }, "" + text);
        }
        return (react_1.default.createElement("div", { className: "json-cell-valid" },
            react_1.default.createElement(JsonViewInteractive_1.default, { value: value })));
    }
    JsonColumn.prepareData = prepareData;
    return JsonColumn;
}
initJsonColumn.friendlyName = "JSON";
