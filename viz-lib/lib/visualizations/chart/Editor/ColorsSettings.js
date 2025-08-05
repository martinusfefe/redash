"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ColorsSettings;
const react_1 = __importDefault(require("react"));
const prop_types_1 = require("../../../visualizations/prop-types");
const PieColorsSettings_1 = __importDefault(require("./PieColorsSettings"));
const HeatmapColorsSettings_1 = __importDefault(require("./HeatmapColorsSettings"));
const DefaultColorsSettings_1 = __importDefault(require("./DefaultColorsSettings"));
const components = {
    pie: PieColorsSettings_1.default,
    heatmap: HeatmapColorsSettings_1.default,
};
function ColorsSettings({ options, ...props }) {
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    const Component = components[options.globalSeriesType] || DefaultColorsSettings_1.default;
    return react_1.default.createElement(Component, { options: options, ...props });
}
ColorsSettings.propTypes = prop_types_1.EditorPropTypes;
