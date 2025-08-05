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
exports.default = Editor;
const lodash_1 = require("lodash");
const react_1 = __importDefault(require("react"));
const Grid = __importStar(require("antd/lib/grid"));
const editor_1 = require("../../components/visualizations/editor");
const prop_types_1 = require("../../visualizations/prop-types");
function Editor({ options, data, onOptionsChange }) {
    const optionsChanged = (newOptions) => {
        onOptionsChange((0, lodash_1.merge)({}, options, newOptions));
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.Select, { label: "Words Column", "data-test": "WordCloud.WordsColumn", value: options.column, onChange: (column) => optionsChanged({ column }) }, (0, lodash_1.map)(data.columns, ({ name }) => (
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message
            react_1.default.createElement(editor_1.Select.Option, { key: name, "data-test": "WordCloud.WordsColumn." + name }, name))))),
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.Select, { label: "Frequencies Column", "data-test": "WordCloud.FrequenciesColumn", value: options.frequenciesColumn, onChange: (frequenciesColumn) => optionsChanged({ frequenciesColumn }) },
                react_1.default.createElement(editor_1.Select.Option, { key: "none", value: "" },
                    react_1.default.createElement("i", null, "(count word frequencies automatically)")),
                (0, lodash_1.map)(data.columns, ({ name }) => (
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message
                react_1.default.createElement(editor_1.Select.Option, { key: "column-" + name, value: name, "data-test": "WordCloud.FrequenciesColumn." + name }, name))))),
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.ControlLabel, { label: "Words Length Limit" },
                react_1.default.createElement(Grid.Row, { gutter: 15, type: "flex" },
                    react_1.default.createElement(Grid.Col, { span: 12 },
                        react_1.default.createElement(editor_1.InputNumber, { "data-test": "WordCloud.WordLengthLimit.Min", placeholder: "Min", min: 0, value: options.wordLengthLimit.min, onChange: (value) => optionsChanged({ wordLengthLimit: { min: value > 0 ? value : null } }) })),
                    react_1.default.createElement(Grid.Col, { span: 12 },
                        react_1.default.createElement(editor_1.InputNumber, { "data-test": "WordCloud.WordLengthLimit.Max", placeholder: "Max", min: 0, value: options.wordLengthLimit.max, onChange: (value) => optionsChanged({ wordLengthLimit: { max: value > 0 ? value : null } }) }))))),
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.ControlLabel, { label: "Frequencies Limit" },
                react_1.default.createElement(Grid.Row, { gutter: 15, type: "flex" },
                    react_1.default.createElement(Grid.Col, { span: 12 },
                        react_1.default.createElement(editor_1.InputNumber, { "data-test": "WordCloud.WordCountLimit.Min", placeholder: "Min", min: 0, value: options.wordCountLimit.min, onChange: (value) => optionsChanged({ wordCountLimit: { min: value > 0 ? value : null } }) })),
                    react_1.default.createElement(Grid.Col, { span: 12 },
                        react_1.default.createElement(editor_1.InputNumber, { "data-test": "WordCloud.WordCountLimit.Max", placeholder: "Max", min: 0, value: options.wordCountLimit.max, onChange: (value) => optionsChanged({ wordCountLimit: { max: value > 0 ? value : null } }) })))))));
}
Editor.propTypes = prop_types_1.EditorPropTypes;
