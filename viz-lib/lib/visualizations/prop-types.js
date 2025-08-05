"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditorPropTypes = exports.RendererPropTypes = exports.VisualizationType = void 0;
const prop_types_1 = __importDefault(require("prop-types"));
const VisualizationOptions = prop_types_1.default.object;
const Data = prop_types_1.default.shape({
    columns: prop_types_1.default.arrayOf(prop_types_1.default.object).isRequired,
    rows: prop_types_1.default.arrayOf(prop_types_1.default.object).isRequired,
});
// @ts-expect-error ts-migrate(2322) FIXME: Type 'Requireable<InferProps<{ id: Requireable<num... Remove this comment to see the full error message
const VisualizationType = prop_types_1.default.shape({
    id: prop_types_1.default.number,
    type: prop_types_1.default.string.isRequired,
    name: prop_types_1.default.string.isRequired,
    options: VisualizationOptions.isRequired,
});
exports.VisualizationType = VisualizationType;
// For each visualization's renderer
exports.RendererPropTypes = {
    visualizationName: prop_types_1.default.string,
    data: Data.isRequired,
    options: VisualizationOptions.isRequired,
    onOptionsChange: prop_types_1.default.func, // (newOptions) => void
};
// For each visualization's editor
exports.EditorPropTypes = {
    visualizationName: prop_types_1.default.string,
    data: Data.isRequired,
    options: VisualizationOptions.isRequired,
    onOptionsChange: prop_types_1.default.func.isRequired, // (newOptions) => void
};
