"use strict";
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
exports.default = DetailsRenderer;
const react_1 = __importStar(require("react"));
const lodash_1 = require("lodash");
const moment_1 = __importDefault(require("moment"));
const prop_types_1 = require("../../visualizations/prop-types");
const visualizationsSettings_1 = require("../../visualizations/visualizationsSettings");
const descriptions_1 = __importDefault(require("antd/lib/descriptions"));
const pagination_1 = __importDefault(require("antd/lib/pagination"));
require("./details.less");
function renderValue(value, type) {
    const formats = {
        date: visualizationsSettings_1.visualizationsSettings.dateFormat,
        datetime: visualizationsSettings_1.visualizationsSettings.dateTimeFormat,
    };
    if (type === "date" || type === "datetime") {
        if (moment_1.default.isMoment(value)) {
            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            return value.format(formats[type]);
        }
    }
    return "" + value;
}
function DetailsRenderer({ data }) {
    const [page, setPage] = (0, react_1.useState)(0);
    if (!data || !data.rows || data.rows.length === 0) {
        return null;
    }
    const types = (0, lodash_1.mapValues)((0, lodash_1.keyBy)(data.columns, "name"), "type");
    // We use columsn to maintain order of columns in the view.
    const columns = data.columns.map((column) => column.name);
    const row = data.rows[page];
    return (react_1.default.createElement("div", { className: "details-viz" },
        react_1.default.createElement(descriptions_1.default, { size: "small", column: 1, bordered: true }, (0, lodash_1.map)(columns, key => (react_1.default.createElement(descriptions_1.default.Item, { key: key, label: key }, renderValue(row[key], types[key]))))),
        data.rows.length > 1 && (react_1.default.createElement("div", { className: "paginator-container" },
            react_1.default.createElement(pagination_1.default, { showSizeChanger: false, current: page + 1, defaultPageSize: 1, total: data.rows.length, onChange: p => setPage(p - 1) })))));
}
DetailsRenderer.propTypes = prop_types_1.RendererPropTypes;
