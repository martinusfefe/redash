import { isNil, map, get, filter, each, sortBy, some, findIndex, toString } from "lodash";
import React from "react";
import cx from "classnames";
import Tooltip from "antd/lib/tooltip";
import ColumnTypes from "./columns";
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
function toggleOrderBy(columnName) {
  var orderBy = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var multiColumnSort = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'name' does not exist on type 'never'.
  var index = findIndex(orderBy, i => i.name === columnName);
  var item = {
    name: columnName,
    direction: "ascend"
  };
  if (index >= 0) {
    // @ts-expect-error ts-migrate(2322) FIXME: Type 'string | null' is not assignable to type 'st... Remove this comment to see the full error message
    item.direction = nextOrderByDirection(orderBy[index].direction);
  }
  if (multiColumnSort) {
    if (!item.direction) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'name' does not exist on type 'never'.
      return filter(orderBy, i => i.name !== columnName);
    }
    if (index >= 0) {
      // @ts-expect-error ts-migrate(2322) FIXME: Type '{ name: any; direction: string; }' is not as... Remove this comment to see the full error message
      orderBy[index] = item;
    } else {
      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{ name: any; direction: string; ... Remove this comment to see the full error message
      orderBy.push(item);
    }
    return [...orderBy];
  }
  return item.direction ? [item] : [];
}
function getOrderByInfo(orderBy) {
  var result = {};
  each(orderBy, (_ref, index) => {
    var name = _ref.name,
      direction = _ref.direction;
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    result[name] = {
      direction,
      index: index + 1
    };
  });
  return result;
}
export function prepareColumns(columns, searchInput, orderBy, onOrderByChange) {
  columns = filter(columns, "visible");
  columns = sortBy(columns, "order");
  var isMultiColumnSort = orderBy.length > 1;
  var orderByInfo = getOrderByInfo(orderBy);
  var tableColumns = map(columns, column => {
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    var isAscend = orderByInfo[column.name] && orderByInfo[column.name].direction === "ascend";
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    var isDescend = orderByInfo[column.name] && orderByInfo[column.name].direction === "descend";

    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    var sortColumnIndex = isMultiColumnSort && orderByInfo[column.name] ? orderByInfo[column.name].index : null;
    var result = {
      key: column.name,
      dataIndex: "record[".concat(JSON.stringify(column.name), "]"),
      align: column.alignContent,
      sorter: {
        multiple: 1
      },
      // using { multiple: 1 } to allow built-in multi-column sort arrows
      sortOrder: get(orderByInfo, [column.name, "direction"], null),
      title: /*#__PURE__*/React.createElement(React.Fragment, null, column.description && /*#__PURE__*/React.createElement("span", {
        style: {
          paddingRight: 5
        }
      }, /*#__PURE__*/React.createElement(Tooltip, {
        placement: "top",
        title: column.description
      }, /*#__PURE__*/React.createElement("div", {
        className: "table-visualization-heading"
      }, /*#__PURE__*/React.createElement("i", {
        className: "fa fa-info-circle",
        "aria-hidden": "true"
      })))), /*#__PURE__*/React.createElement(Tooltip, {
        placement: "top",
        title: column.title
      }, /*#__PURE__*/React.createElement("div", {
        className: "table-visualization-heading",
        "data-sort-column-index": sortColumnIndex
      }, column.title))),
      onHeaderCell: () => ({
        className: cx({
          "table-visualization-column-is-sorted": isAscend || isDescend
        }),
        onClick: event => onOrderByChange(toggleOrderBy(column.name, orderBy, event.shiftKey))
      })
    };

    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    var initColumn = ColumnTypes[column.displayAs];
    var Component = initColumn(column);
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'render' does not exist on type '{ key: a... Remove this comment to see the full error message
    result.render = (unused, row) => ({
      children: /*#__PURE__*/React.createElement(Component, {
        row: row.record
      }),
      props: {
        className: "display-as-".concat(column.displayAs)
      }
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
    onHeaderCell: () => ({
      className: "table-visualization-spacer"
    })
  });
  if (searchInput) {
    // Add searchInput as the ColumnGroup for all table columns
    tableColumns = [{
      key: "table-search",
      title: searchInput,
      // @ts-expect-error ts-migrate(2741) FIXME: Property 'onClick' is missing in type '{ className... Remove this comment to see the full error message
      onHeaderCell: () => ({
        className: "table-visualization-search"
      }),
      children: tableColumns
    }];
  }
  return tableColumns;
}
export function initRows(rows) {
  return map(rows, (record, index) => ({
    key: "record".concat(index),
    record
  }));
}
export function filterRows(rows, searchTerm, searchColumns) {
  if (searchTerm !== "" && searchColumns.length > 0) {
    searchTerm = searchTerm.toUpperCase();
    var matchFields = map(searchColumns, column => {
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      var initColumn = ColumnTypes[column.displayAs];
      var _initColumn = initColumn(column),
        prepareData = _initColumn.prepareData;
      return row => {
        var _prepareData = prepareData(row),
          text = _prepareData.text;
        return toString(text).toUpperCase().indexOf(searchTerm) >= 0;
      };
    });
    return filter(rows, row => some(matchFields, match => match(row.record)));
  }
  return rows;
}
export function sortRows(rows, orderBy) {
  if (orderBy.length === 0 || rows.length === 0) {
    return rows;
  }
  var directions = {
    ascend: 1,
    descend: -1
  };

  // Create a copy of array before sorting, because .sort() will modify original array
  return [...rows].sort((a, b) => {
    var va;
    var vb;
    for (var i = 0; i < orderBy.length; i += 1) {
      va = a.record[orderBy[i].name];
      vb = b.record[orderBy[i].name];
      if (isNil(va) || va < vb) {
        // if a < b - we should return -1, but take in account direction
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        return -1 * directions[orderBy[i].direction];
      }
      if (va > vb || isNil(vb)) {
        // if a > b - we should return 1, but take in account direction
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        return 1 * directions[orderBy[i].direction];
      }
    }
    return 0;
  });
}
//# sourceMappingURL=utils.js.map