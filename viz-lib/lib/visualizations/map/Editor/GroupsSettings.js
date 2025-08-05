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
exports.default = GroupsSettings;
const lodash_1 = require("lodash");
const react_1 = __importStar(require("react"));
const table_1 = __importDefault(require("antd/lib/table"));
const ColorPicker_1 = __importDefault(require("@/components/ColorPicker"));
const prop_types_1 = require("@/visualizations/prop-types");
const ColorPalette_1 = __importDefault(require("@/visualizations/ColorPalette"));
const prepareData_1 = __importDefault(require("../prepareData"));
function GroupsSettings({ options, data, onOptionsChange }) {
    const groups = (0, react_1.useMemo)(() => (0, lodash_1.map)((0, prepareData_1.default)(data, options), ({ name }) => ({ name, color: (options.groups[name] || {}).color || null })), [data, options]);
    const colors = (0, react_1.useMemo)(() => ({
        Automatic: null,
        ...ColorPalette_1.default,
    }), []);
    const updateGroupOption = (0, react_1.useCallback)((name, prop, value) => {
        onOptionsChange({
            groups: {
                [name]: {
                    [prop]: value,
                },
            },
        });
    }, [onOptionsChange]);
    const columns = [
        {
            title: "Group",
            dataIndex: "name",
        },
        {
            title: "Color",
            dataIndex: "color",
            width: "1%",
            render: (unused, item) => (react_1.default.createElement(ColorPicker_1.default
            // @ts-expect-error ts-migrate(2322) FIXME: Type 'boolean' is not assignable to type 'never'.
            , { 
                // @ts-expect-error ts-migrate(2322) FIXME: Type 'boolean' is not assignable to type 'never'.
                interactive: true, 
                // @ts-expect-error ts-migrate(2322) FIXME: Type '{ "Indian Red": string; "Green 2": string; "... Remove this comment to see the full error message
                presetColors: colors, 
                // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
                placement: "topRight", 
                // @ts-expect-error ts-migrate(2322) FIXME: Type 'any' is not assignable to type 'never'.
                color: item.color, 
                // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
                triggerProps: { "data-test": `Map.Editor.Groups.${item.name}.Color` }, 
                // @ts-expect-error ts-migrate(2322) FIXME: Type '(value: any) => void' is not assignable to t... Remove this comment to see the full error message
                onChange: (value) => updateGroupOption(item.name, "color", value), 
                // @ts-expect-error ts-migrate(2322) FIXME: Type 'Element' is not assignable to type 'never'.
                addonAfter: react_1.default.createElement(ColorPicker_1.default.Label, { color: item.color, presetColors: colors }) })),
        },
    ];
    return react_1.default.createElement(table_1.default, { columns: columns, dataSource: groups, rowKey: "name", showHeader: false, pagination: false });
}
GroupsSettings.propTypes = prop_types_1.EditorPropTypes;
