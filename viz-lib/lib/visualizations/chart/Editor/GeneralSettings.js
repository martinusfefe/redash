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
exports.default = GeneralSettings;
const lodash_1 = require("lodash");
const react_1 = __importStar(require("react"));
const editor_1 = require("@/components/visualizations/editor");
const createTabbedEditor_1 = require("@/components/visualizations/editor/createTabbedEditor");
const prop_types_1 = require("@/visualizations/prop-types");
const ChartTypeSelect_1 = __importDefault(require("./ChartTypeSelect"));
const ColumnMappingSelect_1 = __importDefault(require("./ColumnMappingSelect"));
const lib_1 = require("use-debounce/lib");
function getAvailableColumnMappingTypes(options) {
    const result = ["x", "y"];
    if (!(0, lodash_1.includes)(["custom", "heatmap"], options.globalSeriesType)) {
        result.push("series");
    }
    if (options.globalSeriesType === "bubble" || (0, lodash_1.some)(options.seriesOptions, { type: "bubble" })) {
        result.push("size");
    }
    if (options.globalSeriesType === "heatmap") {
        result.push("zVal");
    }
    if (!(0, lodash_1.includes)(["custom", "bubble", "heatmap"], options.globalSeriesType)) {
        result.push("yError");
    }
    return result;
}
function getMappedColumns(options, availableColumns) {
    const mappedColumns = {};
    const availableTypes = getAvailableColumnMappingTypes(options);
    (0, lodash_1.each)(availableTypes, type => {
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        mappedColumns[type] = ColumnMappingSelect_1.default.MappingTypes[type].multiple ? [] : null;
    });
    availableColumns = (0, lodash_1.map)(availableColumns, c => c.name);
    const usedColumns = [];
    (0, lodash_1.each)(options.columnMapping, (type, column) => {
        if ((0, lodash_1.includes)(availableColumns, column) && (0, lodash_1.includes)(availableTypes, type)) {
            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            const { multiple } = ColumnMappingSelect_1.default.MappingTypes[type];
            if (multiple) {
                // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                mappedColumns[type].push(column);
            }
            else {
                // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                mappedColumns[type] = column;
            }
            usedColumns.push(column);
        }
    });
    return {
        mappedColumns,
        unusedColumns: (0, lodash_1.difference)(availableColumns, usedColumns),
    };
}
function mappedColumnsToColumnMappings(mappedColumns) {
    const result = {};
    (0, lodash_1.each)(mappedColumns, (value, type) => {
        if ((0, lodash_1.isArray)(value)) {
            (0, lodash_1.each)(value, v => {
                // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                result[v] = type;
            });
        }
        else {
            if (value) {
                // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                result[value] = type;
            }
        }
    });
    return result;
}
function GeneralSettings({ options, data, onOptionsChange }) {
    const { mappedColumns, unusedColumns } = (0, react_1.useMemo)(() => getMappedColumns(options, data.columns), [
        options,
        data.columns,
    ]);
    function handleGlobalSeriesTypeChange(globalSeriesType) {
        onOptionsChange({
            globalSeriesType,
            showDataLabels: globalSeriesType === "pie",
            swappedAxes: false,
            seriesOptions: (0, lodash_1.mapValues)(options.seriesOptions, series => ({
                ...series,
                type: globalSeriesType,
            })),
        });
    }
    function handleColumnMappingChange(column, type) {
        const columnMapping = mappedColumnsToColumnMappings({
            ...mappedColumns,
            [type]: column,
        });
        onOptionsChange({ columnMapping }, createTabbedEditor_1.UpdateOptionsStrategy.shallowMerge);
    }
    function handleLegendPlacementChange(value) {
        if (value === "hidden") {
            onOptionsChange({ legend: { enabled: false } });
        }
        else {
            onOptionsChange({ legend: { enabled: true, placement: value } });
        }
    }
    function handleAxesSwapping() {
        // moves any item in the right Y axis to the left one
        const seriesOptions = (0, lodash_1.mapValues)(options.seriesOptions, series => ({
            ...series,
            yAxis: 0,
        }));
        onOptionsChange({ swappedAxes: !options.swappedAxes, seriesOptions });
    }
    const [debouncedOnOptionsChange] = (0, lib_1.useDebouncedCallback)(onOptionsChange, 200);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(ChartTypeSelect_1.default
            // @ts-expect-error ts-migrate(2322) FIXME: Type '{ label: string; "data-test": string; defaul... Remove this comment to see the full error message
            , { 
                // @ts-expect-error ts-migrate(2322) FIXME: Type '{ label: string; "data-test": string; defaul... Remove this comment to see the full error message
                label: "Chart Type", "data-test": "Chart.GlobalSeriesType", defaultValue: options.globalSeriesType, onChange: handleGlobalSeriesTypeChange })),
        (0, lodash_1.includes)(["column", "line", "box"], options.globalSeriesType) && (
        // @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.Checkbox, { "data-test": "Chart.SwappedAxes", defaultChecked: options.swappedAxes, checked: options.swappedAxes, onChange: handleAxesSwapping }, "Horizontal Chart"))),
        (0, lodash_1.map)(mappedColumns, (value, type) => (react_1.default.createElement(ColumnMappingSelect_1.default
        // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
        , { 
            // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
            key: type, 
            // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
            type: type, value: value, 
            // @ts-expect-error ts-migrate(2322) FIXME: Type 'any' is not assignable to type 'never'.
            areAxesSwapped: options.swappedAxes, 
            // @ts-expect-error ts-migrate(2322) FIXME: Type 'unknown[]' is not assignable to type 'never'... Remove this comment to see the full error message
            availableColumns: unusedColumns, 
            // @ts-expect-error ts-migrate(2322) FIXME: Type '(column: any, type: any) => void' is not ass... Remove this comment to see the full error message
            onChange: handleColumnMappingChange }))),
        (0, lodash_1.includes)(["bubble"], options.globalSeriesType) && (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(editor_1.Section, null,
                react_1.default.createElement(editor_1.InputNumber, { label: "Bubble Size Coefficient", "data-test": "Chart.BubbleCoefficient", defaultValue: options.coefficient, onChange: (value) => onOptionsChange({ coefficient: (0, lodash_1.toNumber)(value) }) })),
            react_1.default.createElement(editor_1.Section, null,
                react_1.default.createElement(editor_1.Select, { label: "Bubble Size Proportional To", "data-test": "Chart.SizeMode", defaultValue: options.sizemode, onChange: (mode) => onOptionsChange({ sizemode: mode }) },
                    react_1.default.createElement(editor_1.Select.Option, { value: "area", "data-test": "Chart.SizeMode.Area" }, "Area"),
                    react_1.default.createElement(editor_1.Select.Option, { value: "diameter", "data-test": "Chart.SizeMode.Diameter" }, "Diameter"))))),
        (0, lodash_1.includes)(["pie"], options.globalSeriesType) && (
        // @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.Select, { label: "Direction", "data-test": "Chart.PieDirection", defaultValue: options.direction.type, onChange: (type) => onOptionsChange({ direction: { type } }) },
                react_1.default.createElement(editor_1.Select.Option, { value: "counterclockwise", "data-test": "Chart.PieDirection.Counterclockwise" }, "Counterclockwise"),
                react_1.default.createElement(editor_1.Select.Option, { value: "clockwise", "data-test": "Chart.PieDirection.Clockwise" }, "Clockwise")),
            react_1.default.createElement(editor_1.Select, { label: "Sort", defaultValue: options.piesort, onChange: (val) => onOptionsChange({ piesort: val }) },
                react_1.default.createElement(editor_1.Select.Option, { value: true }, "True"),
                react_1.default.createElement(editor_1.Select.Option, { value: false }, "False")))),
        !(0, lodash_1.includes)(["custom", "heatmap"], options.globalSeriesType) && (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(editor_1.Section, null,
                react_1.default.createElement(editor_1.Select, { label: "Legend Placement", "data-test": "Chart.LegendPlacement", value: options.legend.enabled ? options.legend.placement : "hidden", onChange: handleLegendPlacementChange },
                    react_1.default.createElement(editor_1.Select.Option, { value: "hidden", "data-test": "Chart.LegendPlacement.HideLegend" }, "Hide legend"),
                    react_1.default.createElement(editor_1.Select.Option, { value: "auto", "data-test": "Chart.LegendPlacement.Auto" }, "Right"),
                    react_1.default.createElement(editor_1.Select.Option, { value: "below", "data-test": "Chart.LegendPlacement.Below" }, "Bottom"))),
            options.legend.enabled && (
            // @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message
            react_1.default.createElement(editor_1.Section, null,
                react_1.default.createElement(editor_1.Select, { label: "Legend Items Order", "data-test": "Chart.LegendItemsOrder", value: options.legend.traceorder, onChange: (traceorder) => onOptionsChange({ legend: { traceorder } }) },
                    react_1.default.createElement(editor_1.Select.Option, { value: "normal", "data-test": "Chart.LegendItemsOrder.Normal" }, "Normal"),
                    react_1.default.createElement(editor_1.Select.Option, { value: "reversed", "data-test": "Chart.LegendItemsOrder.Reversed" }, "Reversed")))))),
        (0, lodash_1.includes)(["box"], options.globalSeriesType) && (
        // @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.Checkbox, { "data-test": "Chart.ShowPoints", defaultChecked: options.showpoints, onChange: event => onOptionsChange({ showpoints: event.target.checked }) }, "Show All Points"))),
        !(0, lodash_1.includes)(["custom", "heatmap"], options.globalSeriesType) && (
        // @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.Select, { label: "Stacking", "data-test": "Chart.Stacking", defaultValue: options.series.stacking, disabled: !(0, lodash_1.includes)(["line", "area", "column"], options.globalSeriesType), onChange: (stacking) => onOptionsChange({ series: { stacking } }) },
                react_1.default.createElement(editor_1.Select.Option, { value: null, "data-test": "Chart.Stacking.Disabled" }, "Disabled"),
                react_1.default.createElement(editor_1.Select.Option, { value: "stack", "data-test": "Chart.Stacking.Stack" }, "Stack")))),
        (0, lodash_1.includes)(["line", "area", "column"], options.globalSeriesType) && (
        // @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.Checkbox, { "data-test": "Chart.NormalizeValues", defaultChecked: options.series.percentValues, onChange: event => onOptionsChange({ series: { percentValues: event.target.checked } }) }, "Normalize values to percentage"))),
        !(0, lodash_1.includes)(["custom", "heatmap", "bubble", "scatter"], options.globalSeriesType) && (
        // @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.Select, { label: "Missing and NULL values", "data-test": "Chart.MissingValues", defaultValue: options.missingValuesAsZero ? 1 : 0, onChange: (value) => onOptionsChange({ missingValuesAsZero: !!value }) },
                react_1.default.createElement(editor_1.Select.Option, { value: 0, "data-test": "Chart.MissingValues.Keep" }, "Do not display in chart"),
                react_1.default.createElement(editor_1.Select.Option, { value: 1, "data-test": "Chart.MissingValues.Zero" }, "Convert to 0 and display in chart")))),
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.Checkbox, { "data-test": "Chart.EnableClickEvents", defaultChecked: options.enableLink, onChange: event => onOptionsChange({ enableLink: event.target.checked }) }, "Enable click events")),
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.Checkbox, { "data-test": "Chart.EnableClickEvents.NewTab", defaultChecked: options.linkOpenNewTab, onChange: event => onOptionsChange({ linkOpenNewTab: event.target.checked }), disabled: !(options.enableLink === true) }, "Open in new tab")),
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.Input, { label: react_1.default.createElement(react_1.default.Fragment, null,
                    "URL template",
                    react_1.default.createElement(editor_1.ContextHelp, { placement: "topLeft", arrowPointAtCenter: true, 
                        // @ts-expect-error ts-migrate(2322) FIXME: Type 'Element' is not assignable to type 'null | u... Remove this comment to see the full error message
                        icon: editor_1.ContextHelp.defaultIcon },
                        react_1.default.createElement("div", null,
                            "Every curve can be referenced using ",
                            react_1.default.createElement("code", null, "{{ @@x1 }} {{ @@y1 }} {{ @@x2 }} {{ @@y2 }} ..."),
                            " syntax:",
                            react_1.default.createElement("br", null),
                            "axis with any curve number according to the Series config."),
                        react_1.default.createElement("div", null,
                            "The first met curve X and Y values can be referenced by just",
                            react_1.default.createElement("code", null, "{{ @@x }} {{ @@y }}"),
                            " syntax."),
                        react_1.default.createElement("div", null, "Any unresolved reference would be replaced with an empty string."))), "data-test": "Chart.DataLabels.TextFormat", placeholder: "(nothing)", defaultValue: options.linkFormat, onChange: (e) => debouncedOnOptionsChange({ linkFormat: e.target.value }), disabled: !(options.enableLink === true) }))));
}
GeneralSettings.propTypes = prop_types_1.EditorPropTypes;
