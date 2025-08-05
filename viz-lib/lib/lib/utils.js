"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatColumnValue = formatColumnValue;
const moment_1 = __importDefault(require("moment"));
const visualizationsSettings_1 = require("@/visualizations/visualizationsSettings");
function formatDateTime(value) {
    if (!value) {
        return "";
    }
    const parsed = (0, moment_1.default)(value);
    if (!parsed.isValid()) {
        return "-";
    }
    return parsed.format(visualizationsSettings_1.visualizationsSettings.dateTimeFormat);
}
function formatDate(value) {
    if (!value) {
        return "";
    }
    const parsed = (0, moment_1.default)(value);
    if (!parsed.isValid()) {
        return "-";
    }
    return parsed.format(visualizationsSettings_1.visualizationsSettings.dateFormat);
}
function formatColumnValue(value, columnType = null) {
    if (moment_1.default.isMoment(value)) {
        if (columnType === "date") {
            return formatDate(value);
        }
        return formatDateTime(value);
    }
    if (typeof value === "boolean") {
        return value.toString();
    }
    return value;
}
