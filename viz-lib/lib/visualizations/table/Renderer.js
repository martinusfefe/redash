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
exports.default = Renderer;
const lodash_1 = require("lodash");
const react_1 = __importStar(require("react"));
const table_1 = __importDefault(require("antd/lib/table"));
const input_1 = __importDefault(require("antd/lib/input"));
const InfoCircleFilled_1 = __importDefault(require("@ant-design/icons/InfoCircleFilled"));
const popover_1 = __importDefault(require("antd/lib/popover"));
const prop_types_1 = require("@/visualizations/prop-types");
const utils_1 = require("./utils");
require("./renderer.less");
function joinColumns(array, separator = ", ") {
    return (0, lodash_1.reduce)(array, (result, item, index) => {
        // @ts-expect-error ts-migrate(2365) FIXME: Operator '>' cannot be applied to types 'string' a... Remove this comment to see the full error message
        if (index > 0) {
            // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
            result.push(separator);
        }
        // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'any' is not assignable to parame... Remove this comment to see the full error message
        result.push(item);
        return result;
    }, []);
}
function getSearchColumns(columns, { limit = Infinity, renderColumn = (col) => col.title } = {}) {
    const firstColumns = (0, lodash_1.map)(columns.slice(0, limit), col => renderColumn(col));
    const restColumns = (0, lodash_1.map)(columns.slice(limit), col => col.title);
    if (restColumns.length > 0) {
        return [...joinColumns(firstColumns), ` and ${restColumns.length} others`];
    }
    if (firstColumns.length > 1) {
        return [...joinColumns((0, lodash_1.initial)(firstColumns)), ` and `, (0, lodash_1.last)(firstColumns)];
    }
    return firstColumns;
}
function SearchInputInfoIcon({ searchColumns }) {
    return (react_1.default.createElement(popover_1.default, { arrowPointAtCenter: true, placement: "topRight", content: react_1.default.createElement("div", { className: "table-visualization-search-info-content" },
            "Search ",
            getSearchColumns(searchColumns, { renderColumn: col => react_1.default.createElement("code", { key: col.name }, col.title) })) },
        react_1.default.createElement(InfoCircleFilled_1.default, { className: "table-visualization-search-info-icon" })));
}
// @ts-expect-error ts-migrate(2339) FIXME: Property 'searchColumns' does not exist on type 'S... Remove this comment to see the full error message
function SearchInput({ searchColumns, ...props }) {
    if (searchColumns.length <= 0) {
        return null;
    }
    const searchColumnsLimit = 3;
    return (react_1.default.createElement(input_1.default.Search, { ...props, placeholder: `Search ${getSearchColumns(searchColumns, { limit: searchColumnsLimit }).join("")}...`, suffix: searchColumns.length > searchColumnsLimit ? react_1.default.createElement(SearchInputInfoIcon, { searchColumns: searchColumns }) : null }));
}
SearchInput.defaultProps = {
    onChange: () => { },
};
function Renderer({ options, data }) {
    const [searchTerm, setSearchTerm] = (0, react_1.useState)("");
    const [orderBy, setOrderBy] = (0, react_1.useState)([]);
    const searchColumns = (0, react_1.useMemo)(() => (0, lodash_1.filter)(options.columns, "allowSearch"), [options.columns]);
    const tableColumns = (0, react_1.useMemo)(() => {
        const searchInput = searchColumns.length > 0 ? (
        // @ts-expect-error ts-migrate(2322) FIXME: Type '(event: any) => void' is not assignable to t... Remove this comment to see the full error message
        react_1.default.createElement(SearchInput, { searchColumns: searchColumns, onChange: (event) => setSearchTerm(event.target.value) })) : null;
        return (0, utils_1.prepareColumns)(options.columns, searchInput, orderBy, (newOrderBy) => {
            setOrderBy(newOrderBy);
            // Remove text selection - may occur accidentally
            // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
            document.getSelection().removeAllRanges();
        });
    }, [options.columns, searchColumns, orderBy]);
    const preparedRows = (0, react_1.useMemo)(() => (0, utils_1.sortRows)((0, utils_1.filterRows)((0, utils_1.initRows)(data.rows), searchTerm, searchColumns), orderBy), [
        data.rows,
        searchTerm,
        searchColumns,
        orderBy,
    ]);
    // If data or config columns change - reset sorting
    (0, react_1.useEffect)(() => {
        setOrderBy([]);
    }, [options.columns, data.columns]);
    if (data.rows.length === 0) {
        return null;
    }
    return (react_1.default.createElement("div", { className: "table-visualization-container" },
        react_1.default.createElement(table_1.default, { className: "table-fixed-header", "data-percy": "show-scrollbars", "data-test": "TableVisualization", 
            // @ts-expect-error ts-migrate(2322) FIXME: Type '{ key: any; dataIndex: string; align: any; s... Remove this comment to see the full error message
            columns: tableColumns, dataSource: preparedRows, pagination: {
                size: (0, lodash_1.get)(options, "paginationSize", ""),
                // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'TablePagi... Remove this comment to see the full error message
                position: "bottom",
                pageSize: options.itemsPerPage,
                hideOnSinglePage: true,
                showSizeChanger: false,
            }, showSorterTooltip: false })));
}
Renderer.propTypes = prop_types_1.RendererPropTypes;
