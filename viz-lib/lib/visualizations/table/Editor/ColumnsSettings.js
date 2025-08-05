"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ColumnsSettings;
const lodash_1 = require("lodash");
const react_1 = __importDefault(require("react"));
const collapse_1 = __importDefault(require("antd/lib/collapse"));
const tooltip_1 = __importDefault(require("antd/lib/tooltip"));
const typography_1 = __importDefault(require("antd/lib/typography"));
// @ts-expect-error ts-migrate(2724) FIXME: Module '"../../../../node_modules/react-sortable-h... Remove this comment to see the full error message
const react_sortable_hoc_1 = require("react-sortable-hoc");
const sortable_1 = require("../../../components/sortable");
const prop_types_1 = require("../../../visualizations/prop-types");
const EyeOutlined_1 = __importDefault(require("@ant-design/icons/EyeOutlined"));
const EyeInvisibleOutlined_1 = __importDefault(require("@ant-design/icons/EyeInvisibleOutlined"));
const ColumnEditor_1 = __importDefault(require("./ColumnEditor"));
const { Text } = typography_1.default;
const SortableItem = (0, react_sortable_hoc_1.sortableElement)(collapse_1.default.Panel);
function ColumnsSettings({ options, onOptionsChange }) {
    function handleColumnChange(newColumn, event) {
        if (event) {
            event.stopPropagation();
        }
        const columns = (0, lodash_1.map)(options.columns, c => (c.name === newColumn.name ? newColumn : c));
        onOptionsChange({ columns });
    }
    function handleColumnsReorder({ oldIndex, newIndex }) {
        const columns = [...options.columns];
        columns.splice(newIndex, 0, ...columns.splice(oldIndex, 1));
        onOptionsChange({ columns });
    }
    return (react_1.default.createElement(sortable_1.SortableContainer, { axis: "y", lockAxis: "y", useDragHandle: true, helperClass: "table-editor-columns-dragged-item", helperContainer: (container) => container.firstChild, onSortEnd: handleColumnsReorder, containerProps: {
            className: "table-visualization-editor-columns",
        } },
        react_1.default.createElement(collapse_1.default, { bordered: false, defaultActiveKey: [], expandIconPosition: "right" }, (0, lodash_1.map)(options.columns, (column, index) => (react_1.default.createElement(SortableItem, { key: column.name, index: index, header: react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(sortable_1.DragHandle, null),
                react_1.default.createElement("span", { "data-test": `Table.Column.${column.name}.Name` },
                    column.name,
                    column.title !== "" && column.title !== column.name && (react_1.default.createElement(Text, { type: "secondary", style: { marginLeft: 5 } },
                        react_1.default.createElement("i", null,
                            "(",
                            column.title,
                            ")"))))), extra: react_1.default.createElement(tooltip_1.default, { title: "Toggle visibility", mouseEnterDelay: 0, mouseLeaveDelay: 0 }, column.visible ? (react_1.default.createElement(EyeOutlined_1.default, { "data-test": `Table.Column.${column.name}.Visibility`, onClick: event => handleColumnChange({ ...column, visible: !column.visible }, event) })) : (react_1.default.createElement(EyeInvisibleOutlined_1.default, { "data-test": `Table.Column.${column.name}.Visibility`, onClick: event => handleColumnChange({ ...column, visible: !column.visible }, event) }))) },
            react_1.default.createElement(ColumnEditor_1.default, { column: column, onChange: handleColumnChange })))))));
}
ColumnsSettings.propTypes = prop_types_1.EditorPropTypes;
