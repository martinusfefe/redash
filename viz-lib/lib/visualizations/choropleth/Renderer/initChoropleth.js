"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = initChoropleth;
const lodash_1 = require("lodash");
const react_1 = __importDefault(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
const leaflet_1 = __importDefault(require("leaflet"));
require("leaflet/dist/leaflet.css");
require("leaflet-fullscreen");
require("leaflet-fullscreen/dist/leaflet.fullscreen.css");
const value_format_1 = require("../../../lib/value-format");
const sanitize_1 = __importDefault(require("../../../services/sanitize"));
const resizeObserver_1 = __importDefault(require("../../../services/resizeObserver"));
const utils_1 = require("./utils");
const Legend_1 = __importDefault(require("./Legend"));
const CustomControl = leaflet_1.default.Control.extend({
    options: {
        position: "topright",
    },
    onAdd() {
        const div = document.createElement("div");
        div.className = "leaflet-bar leaflet-custom-toolbar";
        div.style.background = "#fff";
        div.style.backgroundClip = "padding-box";
        return div;
    },
    onRemove() {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'getContainer' does not exist on type '{ ... Remove this comment to see the full error message
        react_dom_1.default.unmountComponentAtNode(this.getContainer());
    },
});
function prepareLayer({ feature, layer, data, options, limits, colors, formatValue }) {
    const value = (0, utils_1.getValueForFeature)(feature, data, options.targetField);
    const valueFormatted = formatValue(value);
    const featureData = (0, utils_1.prepareFeatureProperties)(feature, valueFormatted, data, options.targetField);
    const color = (0, utils_1.getColorByValue)(value, limits, colors, options.colors.noValue);
    layer.setStyle({
        color: options.colors.borders,
        weight: 1,
        fillColor: color,
        fillOpacity: 1,
    });
    if (options.tooltip.enabled) {
        layer.bindTooltip((0, sanitize_1.default)((0, value_format_1.formatSimpleTemplate)(options.tooltip.template, featureData)), { sticky: true });
    }
    if (options.popup.enabled) {
        layer.bindPopup((0, sanitize_1.default)((0, value_format_1.formatSimpleTemplate)(options.popup.template, featureData)));
    }
    layer.on("mouseover", () => {
        layer.setStyle({
            weight: 2,
            fillColor: (0, utils_1.darkenColor)(color),
        });
    });
    layer.on("mouseout", () => {
        layer.setStyle({
            weight: 1,
            fillColor: color,
        });
    });
}
function validateBounds(bounds, fallbackBounds) {
    if (bounds) {
        bounds = leaflet_1.default.latLngBounds(bounds[0], bounds[1]);
        if (bounds.isValid()) {
            return bounds;
        }
    }
    if (fallbackBounds && fallbackBounds.isValid()) {
        return fallbackBounds;
    }
    return null;
}
function initChoropleth(container, onBoundsChange) {
    const _map = leaflet_1.default.map(container, {
        center: [0.0, 0.0],
        zoom: 1,
        zoomSnap: 0,
        scrollWheelZoom: false,
        maxBoundsViscosity: 1,
        attributionControl: false,
        // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{ center: [number, number]; zoom... Remove this comment to see the full error message
        fullscreenControl: true,
    });
    let _choropleth = null;
    const _legend = new CustomControl();
    function handleMapBoundsChange() {
        if ((0, lodash_1.isFunction)(onBoundsChange)) {
            const bounds = _map.getBounds();
            onBoundsChange([
                // @ts-expect-error ts-migrate(2551) FIXME: Property '_southWest' does not exist on type 'LatL... Remove this comment to see the full error message
                [bounds._southWest.lat, bounds._southWest.lng],
                // @ts-expect-error ts-migrate(2551) FIXME: Property '_northEast' does not exist on type 'LatL... Remove this comment to see the full error message
                [bounds._northEast.lat, bounds._northEast.lng],
            ]);
        }
    }
    let boundsChangedFromMap = false;
    const onMapMoveEnd = () => {
        handleMapBoundsChange();
    };
    _map.on("focus", () => {
        boundsChangedFromMap = true;
        _map.on("moveend", onMapMoveEnd);
    });
    _map.on("blur", () => {
        _map.off("moveend", onMapMoveEnd);
        boundsChangedFromMap = false;
    });
    function updateLayers(geoJson, data, options) {
        _map.eachLayer(layer => _map.removeLayer(layer));
        _map.removeControl(_legend);
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'features' does not exist on type 'object... Remove this comment to see the full error message
        if (!(0, lodash_1.isObject)(geoJson) || !(0, lodash_1.isArray)(geoJson.features)) {
            _choropleth = null;
            // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'null' is not assignable to param... Remove this comment to see the full error message
            _map.setMaxBounds(null);
            return;
        }
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'features' does not exist on type 'object... Remove this comment to see the full error message
        const { limits, colors, legend } = (0, utils_1.createScale)(geoJson.features, data, options);
        const formatValue = (0, utils_1.createNumberFormatter)(options.valueFormat, options.noValuePlaceholder);
        // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'object' is not assignable to par... Remove this comment to see the full error message
        _choropleth = leaflet_1.default.geoJSON(geoJson, {
            onEachFeature(feature, layer) {
                prepareLayer({ feature, layer, data, options, limits, colors, formatValue });
            },
        }).addTo(_map);
        const mapBounds = _choropleth.getBounds();
        const bounds = validateBounds(options.bounds, mapBounds);
        _map.fitBounds(bounds, { animate: false, duration: 0 });
        // equivalent to `_map.setMaxBounds(mapBounds)` but without animation
        _map.options.maxBounds = mapBounds;
        _map.panInsideBounds(mapBounds, { animate: false, duration: 0 });
        // update legend
        if (options.legend.visible && legend.length > 0) {
            _legend.setPosition(options.legend.position.replace("-", ""));
            _map.addControl(_legend);
            react_dom_1.default.render(
            // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
            react_1.default.createElement(Legend_1.default
            // @ts-expect-error ts-migrate(2322) FIXME: Type '{ text: any; color: any; limit: any; }[]' is... Remove this comment to see the full error message
            , { 
                // @ts-expect-error ts-migrate(2322) FIXME: Type '{ text: any; color: any; limit: any; }[]' is... Remove this comment to see the full error message
                items: (0, lodash_1.map)(legend, item => ({ ...item, text: formatValue(item.limit) })), alignText: options.legend.alignText }), _legend.getContainer());
        }
    }
    function updateBounds(bounds) {
        if (!boundsChangedFromMap) {
            const layerBounds = _choropleth ? _choropleth.getBounds() : _map.getBounds();
            bounds = validateBounds(bounds, layerBounds);
            if (bounds) {
                _map.fitBounds(bounds, { animate: false, duration: 0 });
            }
        }
    }
    const unwatchResize = (0, resizeObserver_1.default)(container, () => {
        _map.invalidateSize(false);
    });
    return {
        updateLayers,
        updateBounds,
        destroy() {
            unwatchResize();
            _map.removeControl(_legend); // _map.remove() does not cleanup controls - bug in Leaflet?
            _map.remove();
        },
    };
}
