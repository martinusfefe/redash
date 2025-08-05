"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareColumns = prepareColumns;
exports.initRows = initRows;
exports.filterRows = filterRows;
exports.sortRows = sortRows;
const lodash_1 = require("lodash");
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const tooltip_1 = __importDefault(require("antd/lib/tooltip"));
const columns_1 = __importDefault(require("./columns"));
function nextOrderByDirection(direction) {
    switch (direction) {
        case "ascend":
            return "descend";
        case "descend":
            return null;
        default:
            return "ascend";
    }
}
function toggleOrderBy(columnName, orderBy = [], multiColumnSort = false) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'name' does not exist on type 'never'.
    const index = (0, lodash_1.findIndex)(orderBy, i => i.name === columnName);
    const item = { name: columnName, direction: "ascend" };
    if (index >= 0) {
        // @ts-expect-error ts-migrate(2322) FIXME: Type 'string | null' is not assignable to type 'st... Remove this comment to see the full error message
        item.direction = nextOrderByDirection(orderBy[index].direction);
    }
    if (multiColumnSort) {
        if (!item.direction) {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'name' does not exist on type 'never'.
            return (0, lodash_1.filter)(orderBy, i => i.name !== columnName);
        }
        if (index >= 0) {
            // @ts-expect-error ts-migrate(2322) FIXME: Type '{ name: any; direction: string; }' is not as... Remove this comment to see the full error message
            orderBy[index] = item;
        }
        else {
            // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{ name: any; direction: string; ... Remove this comment to see the full error message
            orderBy.push(item);
        }
        return [...orderBy];
    }
    return item.direction ? [item] : [];
}
function getOrderByInfo(orderBy) {
    const result = {};
    (0, lodash_1.each)(orderBy, ({ name, direction }, index) => {
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        result[name] = { direction, index: index + 1 };
    });
    return result;
}
function prepareColumns(columns, searchInput, orderBy, onOrderByChange) {
    columns = (0, lodash_1.filter)(columns, "visible");
    columns = (0, lodash_1.sortBy)(columns, "order");
    const isMultiColumnSort = orderBy.length > 1;
    const orderByInfo = getOrderByInfo(orderBy);
    let tableColumns = (0, lodash_1.map)(columns, column => {
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        const isAscend = orderByInfo[column.name] && orderByInfo[column.name].direction === "ascend";
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        const isDescend = orderByInfo[column.name] && orderByInfo[column.name].direction === "descend";
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        const sortColumnIndex = isMultiColumnSort && orderByInfo[column.name] ? orderByInfo[column.name].index : null;
        const result = {
            key: column.name,
            dataIndex: `record[${JSON.stringify(column.name)}]`,
            align: column.alignContent,
            sorter: { multiple: 1 }, // using { multiple: 1 } to allow built-in multi-column sort arrows
            sortOrder: (0, lodash_1.get)(orderByInfo, [column.name, "direction"], null),
            title: (react_1.default.createElement(react_1.default.Fragment, null,
                column.description && (react_1.default.createElement("span", { style: { paddingRight: 5 } },
                    react_1.default.createElement(tooltip_1.default, { placement: "top", title: column.description },
                        react_1.default.createElement("div", { className: "table-visualization-heading" },
                            react_1.default.createElement("i", { className: "fa fa-info-circle", "aria-hidden": "true" }))))),
                react_1.default.createElement(tooltip_1.default, { placement: "top", title: column.title },
                    react_1.default.createElement("div", { className: "table-visualization-heading", "data-sort-column-index": sortColumnIndex }, column.title)))),
            onHeaderCell: () => ({
                className: (0, classnames_1.default)({
                    "table-visualization-column-is-sorted": isAscend || isDescend,
                }),
                onClick: (event) => onOrderByChange(toggleOrderBy(column.name, orderBy, event.shiftKey)),
            }),
        };
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        const initColumn = columns_1.default[column.displayAs];
        const Component = initColumn(column);
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'render' does not exist on type '{ key: a... Remove this comment to see the full error message
        result.render = (unused, row) => ({
            children: react_1.default.createElement(Component, { row: row.record }),
            props: { className: `display-as-${column.displayAs}` },
        });
        return result;
    });
    tableColumns.push({
        key: "###Redash::Visualizations::Table::Spacer###",
        // @ts-expect-error ts-migrate(2322) FIXME: Type 'null' is not assignable to type 'string'.
        dataIndex: null,
        // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'Element'.
        title: "",
        className: "table-visualization-spacer",
        render: () => "",
        // @ts-expect-error ts-migrate(2741) FIXME: Property 'onClick' is missing in type '{ className... Remove this comment to see the full error message
        onHeaderCell: () => ({ className: "table-visualization-spacer" }),
    });
    if (searchInput) {
        // Add searchInput as the ColumnGroup for all table columns
        tableColumns = [
            {
                key: "table-search",
                title: searchInput,
                // @ts-expect-error ts-migrate(2741) FIXME: Property 'onClick' is missing in type '{ className... Remove this comment to see the full error message
                onHeaderCell: () => ({ className: "table-visualization-search" }),
                children: tableColumns,
            },
        ];
    }
    return tableColumns;
}
function initRows(rows) {
    return (0, lodash_1.map)(rows, (record, index) => ({ key: `record${index}`, record }));
}
function filterRows(rows, searchTerm, searchColumns) {
    if (searchTerm !== "" && searchColumns.length > 0) {
        searchTerm = searchTerm.toUpperCase();
        const matchFields = (0, lodash_1.map)(searchColumns, column => {
            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            const initColumn = columns_1.default[column.displayAs];
            const { prepareData } = initColumn(column);
            return (row) => {
                const { text } = prepareData(row);
                return ((0, lodash_1.toString)(text)
                    .toUpperCase()
                    .indexOf(searchTerm) >= 0);
            };
        });
        return (0, lodash_1.filter)(rows, row => (0, lodash_1.some)(matchFields, match => match(row.record)));
    }
    return rows;
}
function sortRows(rows, orderBy) {
    if (orderBy.length === 0 || rows.length === 0) {
        return rows;
    }
    const directions = { ascend: 1, descend: -1 };
    // Create a copy of array before sorting, because .sort() will modify original array
    return [...rows].sort((a, b) => {
        let va;
        let vb;
        for (let i = 0; i < orderBy.length; i += 1) {
            va = a.record[orderBy[i].name];
            vb = b.record[orderBy[i].name];
            if ((0, lodash_1.isNil)(va) || va < vb) {
                // if a < b - we should return -1, but take in account direction
                // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                return -1 * directions[orderBy[i].direction];
            }
            if (va > vb || (0, lodash_1.isNil)(vb)) {
                // if a > b - we should return 1, but take in account direction
                // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                return 1 * directions[orderBy[i].direction];
            }
        }
        return 0;
    });
}
