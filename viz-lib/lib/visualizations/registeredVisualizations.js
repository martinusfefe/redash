"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDefaultVisualization = getDefaultVisualization;
exports.newVisualization = newVisualization;
const lodash_1 = require("lodash");
const prop_types_1 = __importDefault(require("prop-types"));
const box_plot_1 = __importDefault(require("./box-plot"));
const chart_1 = __importDefault(require("./chart"));
const choropleth_1 = __importDefault(require("./choropleth"));
const cohort_1 = __importDefault(require("./cohort"));
const counter_1 = __importDefault(require("./counter"));
const details_1 = __importDefault(require("./details"));
const funnel_1 = __importDefault(require("./funnel"));
const map_1 = __importDefault(require("./map"));
const pivot_1 = __importDefault(require("./pivot"));
const sankey_1 = __importDefault(require("./sankey"));
const sunburst_1 = __importDefault(require("./sunburst"));
const table_1 = __importDefault(require("./table"));
const word_cloud_1 = __importDefault(require("./word-cloud"));
// @ts-expect-error ts-migrate(2322) FIXME: Type 'Requireable<InferProps<{ type: Validator<str... Remove this comment to see the full error message
const VisualizationConfig = prop_types_1.default.shape({
    type: prop_types_1.default.string.isRequired,
    name: prop_types_1.default.string.isRequired,
    getOptions: prop_types_1.default.func.isRequired,
    isDefault: prop_types_1.default.bool,
    isDeprecated: prop_types_1.default.bool,
    Renderer: prop_types_1.default.func.isRequired,
    Editor: prop_types_1.default.func,
    // other config options
    autoHeight: prop_types_1.default.bool,
    defaultRows: prop_types_1.default.number,
    defaultColumns: prop_types_1.default.number,
    minRows: prop_types_1.default.number,
    maxRows: prop_types_1.default.number,
    minColumns: prop_types_1.default.number,
    maxColumns: prop_types_1.default.number,
});
const registeredVisualizations = {};
function validateVisualizationConfig(config) {
    const typeSpecs = { config: VisualizationConfig };
    const values = { config };
    prop_types_1.default.checkPropTypes(typeSpecs, values, "prop", "registerVisualization");
}
function registerVisualization(config) {
    validateVisualizationConfig(config);
    config = {
        Editor: () => null,
        ...config,
        isDefault: config.isDefault && !config.isDeprecated,
    };
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    if (registeredVisualizations[config.type]) {
        throw new Error(`Visualization ${config.type} already registered.`);
    }
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    registeredVisualizations[config.type] = config;
}
(0, lodash_1.each)((0, lodash_1.flatten)([
    box_plot_1.default,
    chart_1.default,
    choropleth_1.default,
    cohort_1.default,
    counter_1.default,
    details_1.default,
    funnel_1.default,
    map_1.default,
    pivot_1.default,
    sankey_1.default,
    sunburst_1.default,
    table_1.default,
    word_cloud_1.default,
]), registerVisualization);
exports.default = registeredVisualizations;
function getDefaultVisualization() {
    // return any visualization explicitly marked as default, or any non-deprecated otherwise
    return (
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'isDefault' does not exist on type 'never... Remove this comment to see the full error message
    (0, lodash_1.find)(registeredVisualizations, visualization => visualization.isDefault) ||
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'isDeprecated' does not exist on type 'ne... Remove this comment to see the full error message
        (0, lodash_1.find)(registeredVisualizations, visualization => !visualization.isDeprecated));
}
function newVisualization(type = null, options = {}) {
    // @ts-expect-error ts-migrate(2538) FIXME: Type 'null' cannot be used as an index type.
    const visualization = type ? registeredVisualizations[type] : getDefaultVisualization();
    return {
        type: visualization.type,
        name: visualization.name,
        description: "",
        options,
    };
}
