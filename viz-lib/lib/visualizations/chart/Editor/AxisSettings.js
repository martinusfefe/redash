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
exports.default = AxisSettings;
const lodash_1 = require("lodash");
const react_1 = __importDefault(require("react"));
const use_debounce_1 = require("use-debounce");
const Grid = __importStar(require("antd/lib/grid"));
const editor_1 = require("@/components/visualizations/editor");
function toNumber(value) {
    value = (0, lodash_1.isNumber)(value) ? value : parseFloat(value);
    return (0, lodash_1.isFinite)(value) ? value : null;
}
function AxisSettings({ id, options, features, onChange }) {
    function optionsChanged(newOptions) {
        onChange((0, lodash_1.merge)({}, options, newOptions));
    }
    const [handleNameChange] = (0, use_debounce_1.useDebouncedCallback)(text => {
        const title = (0, lodash_1.isString)(text) && text !== "" ? { text } : null;
        optionsChanged({ title });
    }, 200);
    const [handleMinMaxChange] = (0, use_debounce_1.useDebouncedCallback)(opts => optionsChanged(opts), 200);
    const [handleTickFormatChange] = (0, use_debounce_1.useDebouncedCallback)(opts => optionsChanged(opts), 200);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.Select, { label: "Scale", "data-test": `Chart.${id}.Type`, defaultValue: options.type, onChange: (type) => optionsChanged({ type }) },
                features.autoDetectType && (
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message
                react_1.default.createElement(editor_1.Select.Option, { value: "-", "data-test": `Chart.${id}.Type.Auto` }, "Auto Detect")),
                react_1.default.createElement(editor_1.Select.Option, { value: "datetime", "data-test": `Chart.${id}.Type.DateTime` }, "Datetime"),
                react_1.default.createElement(editor_1.Select.Option, { value: "linear", "data-test": `Chart.${id}.Type.Linear` }, "Linear"),
                react_1.default.createElement(editor_1.Select.Option, { value: "logarithmic", "data-test": `Chart.${id}.Type.Logarithmic` }, "Logarithmic"),
                react_1.default.createElement(editor_1.Select.Option, { value: "category", "data-test": `Chart.${id}.Type.Category` }, "Category"))),
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.Input, { label: "Name", "data-test": `Chart.${id}.Name`, defaultValue: (0, lodash_1.isObject)(options.title) ? options.title.text : null, onChange: (event) => handleNameChange(event.target.value) })),
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.Input, { label: react_1.default.createElement(react_1.default.Fragment, null,
                    "Tick Format",
                    react_1.default.createElement(editor_1.ContextHelp.TickFormatSpecs, null)), "data-test": `Chart.${id}.TickFormat`, defaultValue: options.tickFormat, onChange: (event) => handleTickFormatChange({ tickFormat: event.target.value }) })),
        features.range && (
        // @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(Grid.Row, { gutter: 15, type: "flex", align: "middle" },
                react_1.default.createElement(Grid.Col, { span: 12 },
                    react_1.default.createElement(editor_1.InputNumber, { label: "Min Value", placeholder: "Auto", "data-test": `Chart.${id}.RangeMin`, defaultValue: toNumber(options.rangeMin), onChange: (value) => handleMinMaxChange({ rangeMin: toNumber(value) }) })),
                react_1.default.createElement(Grid.Col, { span: 12 },
                    react_1.default.createElement(editor_1.InputNumber, { label: "Max Value", placeholder: "Auto", "data-test": `Chart.${id}.RangeMax`, defaultValue: toNumber(options.rangeMax), onChange: (value) => handleMinMaxChange({ rangeMax: toNumber(value) }) })))))));
}
AxisSettings.defaultProps = {
    features: {},
    onChange: () => { },
};
