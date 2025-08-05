"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GridSettings;
const lodash_1 = require("lodash");
const react_1 = __importDefault(require("react"));
const editor_1 = require("@/components/visualizations/editor");
const prop_types_1 = require("@/visualizations/prop-types");
const ALLOWED_ITEM_PER_PAGE = [5, 10, 15, 20, 25, 50, 100, 150, 200, 250, 500];
function GridSettings({ options, onOptionsChange }) {
    return (
    // @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message
    react_1.default.createElement(editor_1.Section, null,
        react_1.default.createElement(editor_1.Select, { label: "Items per page", "data-test": "Table.ItemsPerPage", defaultValue: options.itemsPerPage, onChange: (itemsPerPage) => onOptionsChange({ itemsPerPage }) }, (0, lodash_1.map)(ALLOWED_ITEM_PER_PAGE, value => (
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message
        react_1.default.createElement(editor_1.Select.Option, { key: `ipp${value}`, value: value, "data-test": `Table.ItemsPerPage.${value}` }, value))))));
}
GridSettings.propTypes = prop_types_1.EditorPropTypes;
