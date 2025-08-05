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
exports.default = StyleSettings;
const lodash_1 = require("lodash");
const react_1 = __importStar(require("react"));
const use_debounce_1 = require("use-debounce");
const editor_1 = require("../../../components/visualizations/editor");
const prop_types_1 = require("../../../visualizations/prop-types");
const ColorPalette_1 = __importDefault(require("../../../visualizations/ColorPalette"));
const mapTiles = [
    {
        name: "OpenStreetMap",
        url: "//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    },
    {
        name: "OpenStreetMap BW",
        url: "//{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png",
    },
    {
        name: "OpenStreetMap DE",
        url: "//{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png",
    },
    {
        name: "OpenStreetMap FR",
        url: "//{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png",
    },
    {
        name: "OpenStreetMap Hot",
        url: "//{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
    },
    {
        name: "Thunderforest",
        url: "//{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png",
    },
    {
        name: "Thunderforest Spinal",
        url: "//{s}.tile.thunderforest.com/spinal-map/{z}/{x}/{y}.png",
    },
    {
        name: "OpenMapSurfer",
        url: "//korona.geog.uni-heidelberg.de/tiles/roads/x={x}&y={y}&z={z}",
    },
    {
        name: "Stamen Toner",
        url: "//stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png",
    },
    {
        name: "Stamen Toner Background",
        url: "//stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}.png",
    },
    {
        name: "Stamen Toner Lite",
        url: "//stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.png",
    },
    {
        name: "OpenTopoMap",
        url: "//{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
    },
];
const CustomColorPalette = {
    White: "#ffffff",
    ...ColorPalette_1.default,
};
function getCustomIconOptionFields(iconShape) {
    switch (iconShape) {
        case "doughnut":
            return { showIcon: false, showBackgroundColor: true, showBorderColor: true };
        case "circle-dot":
        case "rectangle-dot":
            return { showIcon: false, showBackgroundColor: false, showBorderColor: true };
        default:
            return { showIcon: true, showBackgroundColor: true, showBorderColor: true };
    }
}
function StyleSettings({ options, onOptionsChange }) {
    const [debouncedOnOptionsChange] = (0, use_debounce_1.useDebouncedCallback)(onOptionsChange, 200);
    const { showIcon, showBackgroundColor, showBorderColor } = (0, react_1.useMemo)(() => getCustomIconOptionFields(options.iconShape), [options.iconShape]);
    const isCustomMarkersStyleAllowed = (0, lodash_1.isNil)(options.classify);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.Select, { label: "Map Tiles", "data-test": "Map.Editor.Tiles", value: options.mapTileUrl, onChange: (mapTileUrl) => onOptionsChange({ mapTileUrl }) }, (0, lodash_1.map)(mapTiles, ({ name, url }) => (
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message
            react_1.default.createElement(editor_1.Select.Option, { key: url, "data-test": "Map.Editor.Tiles." + name }, name))))),
        react_1.default.createElement(editor_1.Section.Title, null, "Markers"),
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.Checkbox, { "data-test": "Map.Editor.ClusterMarkers", defaultChecked: options.clusterMarkers, onChange: event => onOptionsChange({ clusterMarkers: event.target.checked }) }, "Cluster Markers")),
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement(editor_1.Checkbox, { "data-test": "Map.Editor.CustomizeMarkers", disabled: !isCustomMarkersStyleAllowed, defaultChecked: options.customizeMarkers, onChange: event => onOptionsChange({ customizeMarkers: event.target.checked }) }, "Override default style"),
            !isCustomMarkersStyleAllowed && (
            // @ts-expect-error ts-migrate(2746) FIXME: This JSX tag's 'children' prop expects a single ch... Remove this comment to see the full error message
            react_1.default.createElement(editor_1.ContextHelp, { placement: "topLeft", arrowPointAtCenter: true },
                "Custom marker styles are not available",
                react_1.default.createElement("br", null),
                "when ",
                react_1.default.createElement("b", null, "Group By"),
                " column selected."))),
        isCustomMarkersStyleAllowed && options.customizeMarkers && (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(editor_1.Section, null,
                react_1.default.createElement(editor_1.Select, { layout: "horizontal", label: "Shape", "data-test": "Map.Editor.MarkerShape", value: options.iconShape, onChange: (iconShape) => onOptionsChange({ iconShape }) },
                    react_1.default.createElement(editor_1.Select.Option, { key: "marker", "data-test": "Map.Editor.MarkerShape.marker" }, "Marker + Icon"),
                    react_1.default.createElement(editor_1.Select.Option, { key: "doughnut", "data-test": "Map.Editor.MarkerShape.doughnut" }, "Circle"),
                    react_1.default.createElement(editor_1.Select.Option, { key: "circle-dot", "data-test": "Map.Editor.MarkerShape.circle-dot" }, "Circle Dot"),
                    react_1.default.createElement(editor_1.Select.Option, { key: "circle", "data-test": "Map.Editor.MarkerShape.circle" }, "Circle + Icon"),
                    react_1.default.createElement(editor_1.Select.Option, { key: "rectangle-dot", "data-test": "Map.Editor.MarkerShape.rectangle-dot" }, "Square Dot"),
                    react_1.default.createElement(editor_1.Select.Option, { key: "rectangle", "data-test": "Map.Editor.MarkerShape.rectangle" }, "Square + Icon"))),
            showIcon && (
            // @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message
            react_1.default.createElement(editor_1.Section, null,
                react_1.default.createElement(editor_1.Input, { layout: "horizontal", label: react_1.default.createElement(react_1.default.Fragment, null,
                        "Icon",
                        react_1.default.createElement(editor_1.ContextHelp, { placement: "topLeft", arrowPointAtCenter: true },
                            react_1.default.createElement("div", { style: { marginBottom: 5 } },
                                "Enter an icon name from",
                                " ",
                                react_1.default.createElement("a", { href: "https://fontawesome.com/v4.7.0/icons/", target: "_blank", rel: "noopener noreferrer" }, "Font-Awesome 4.7")),
                            react_1.default.createElement("div", { style: { marginBottom: 5 } },
                                "Examples: ",
                                react_1.default.createElement("code", null, "check"),
                                ", ",
                                react_1.default.createElement("code", null, "times-circle"),
                                ", ",
                                react_1.default.createElement("code", null, "flag")),
                            react_1.default.createElement("div", null, "Leave blank to remove."))), "data-test": "Map.Editor.MarkerIcon", defaultValue: options.iconFont, onChange: (event) => debouncedOnOptionsChange({ iconFont: event.target.value }) }))),
            showIcon && (
            // @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message
            react_1.default.createElement(editor_1.Section, null,
                react_1.default.createElement(editor_1.ColorPicker, { layout: "horizontal", label: "Icon Color", interactive: true, presetColors: CustomColorPalette, placement: "topRight", color: options.foregroundColor, triggerProps: { "data-test": "Map.Editor.MarkerIconColor" }, onChange: (foregroundColor) => onOptionsChange({ foregroundColor }), 
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'Label' does not exist on type '({ classN... Remove this comment to see the full error message
                    addonAfter: react_1.default.createElement(editor_1.ColorPicker.Label, { color: options.foregroundColor, presetColors: CustomColorPalette }) }))),
            showBackgroundColor && (
            // @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message
            react_1.default.createElement(editor_1.Section, null,
                react_1.default.createElement(editor_1.ColorPicker, { layout: "horizontal", label: "Background Color", interactive: true, presetColors: CustomColorPalette, placement: "topRight", color: options.backgroundColor, triggerProps: { "data-test": "Map.Editor.MarkerBackgroundColor" }, onChange: (backgroundColor) => onOptionsChange({ backgroundColor }), 
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'Label' does not exist on type '({ classN... Remove this comment to see the full error message
                    addonAfter: react_1.default.createElement(editor_1.ColorPicker.Label, { color: options.backgroundColor, presetColors: CustomColorPalette }) }))),
            showBorderColor && (
            // @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message
            react_1.default.createElement(editor_1.Section, null,
                react_1.default.createElement(editor_1.ColorPicker, { layout: "horizontal", label: "Border Color", interactive: true, presetColors: CustomColorPalette, placement: "topRight", color: options.borderColor, triggerProps: { "data-test": "Map.Editor.MarkerBorderColor" }, onChange: (borderColor) => onOptionsChange({ borderColor }), 
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'Label' does not exist on type '({ classN... Remove this comment to see the full error message
                    addonAfter: react_1.default.createElement(editor_1.ColorPicker.Label, { color: options.borderColor, presetColors: CustomColorPalette }) })))))));
}
StyleSettings.propTypes = prop_types_1.EditorPropTypes;
