"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = initMap;
const lodash_1 = require("lodash");
const chroma_js_1 = __importDefault(require("chroma-js"));
const leaflet_1 = __importDefault(require("leaflet"));
require("leaflet.markercluster");
require("leaflet/dist/leaflet.css");
require("leaflet.markercluster/dist/MarkerCluster.css");
require("leaflet.markercluster/dist/MarkerCluster.Default.css");
require("beautifymarker");
require("beautifymarker/leaflet-beautify-marker-icon.css");
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'leaflet/dist/images/marker-ico... Remove this comment to see the full error message
const marker_icon_png_1 = __importDefault(require("leaflet/dist/images/marker-icon.png"));
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'leaflet/dist/images/marker-ico... Remove this comment to see the full error message
const marker_icon_2x_png_1 = __importDefault(require("leaflet/dist/images/marker-icon-2x.png"));
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'leaflet/dist/images/marker-sha... Remove this comment to see the full error message
const marker_shadow_png_1 = __importDefault(require("leaflet/dist/images/marker-shadow.png"));
require("leaflet-fullscreen");
require("leaflet-fullscreen/dist/leaflet.fullscreen.css");
const value_format_1 = require("../../lib/value-format");
const sanitize_1 = __importDefault(require("../../services/sanitize"));
const resizeObserver_1 = __importDefault(require("../../services/resizeObserver"));
const chooseTextColorForBackground_1 = __importDefault(require("../../lib/chooseTextColorForBackground"));
// This is a workaround for an issue with giving Leaflet load the icon on its own.
leaflet_1.default.Icon.Default.mergeOptions({
    iconUrl: marker_icon_png_1.default,
    iconRetinaUrl: marker_icon_2x_png_1.default,
    shadowUrl: marker_shadow_png_1.default,
});
// @ts-expect-error ts-migrate(2339) FIXME: Property '_getIconUrl' does not exist on type 'Def... Remove this comment to see the full error message
delete leaflet_1.default.Icon.Default.prototype._getIconUrl;
const iconAnchors = {
    marker: [14, 32],
    circle: [10, 10],
    rectangle: [11, 11],
    "circle-dot": [1, 2],
    "rectangle-dot": [1, 2],
    doughnut: [8, 8],
};
const popupAnchors = {
    rectangle: [0, -3],
    circle: [1, -3],
};
const createHeatpointMarker = (lat, lon, color) => leaflet_1.default.circleMarker([lat, lon], { fillColor: color, fillOpacity: 0.9, stroke: false });
// @ts-expect-error ts-migrate(2339) FIXME: Property 'MarkerClusterIcon' does not exist on typ... Remove this comment to see the full error message
leaflet_1.default.MarkerClusterIcon = leaflet_1.default.DivIcon.extend({
    options: {
        color: null,
        className: "marker-cluster",
        iconSize: new leaflet_1.default.Point(40, 40),
    },
    // @ts-expect-error ts-migrate(7019) FIXME: Rest parameter 'args' implicitly has an 'any[]' ty... Remove this comment to see the full error message
    createIcon(...args) {
        const color = (0, chroma_js_1.default)(this.options.color);
        const textColor = (0, chooseTextColorForBackground_1.default)(color);
        const borderColor = color.alpha(0.4).css();
        const backgroundColor = color.alpha(0.8).css();
        const icon = leaflet_1.default.DivIcon.prototype.createIcon.call(this, ...args);
        icon.innerHTML = `
      <div style="background: ${backgroundColor}">
        <span style="color: ${textColor}">${(0, lodash_1.toString)(this.options.html)}</span>
      </div>
    `;
        icon.style.background = borderColor;
        return icon;
    },
});
// @ts-expect-error ts-migrate(2339) FIXME: Property 'markerClusterIcon' does not exist on typ... Remove this comment to see the full error message
leaflet_1.default.markerClusterIcon = (...args) => new leaflet_1.default.MarkerClusterIcon(...args);
function createIconMarker(lat, lon, { iconShape, iconFont, foregroundColor, backgroundColor, borderColor }) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'BeautifyIcon' does not exist on type 'ty... Remove this comment to see the full error message
    const icon = leaflet_1.default.BeautifyIcon.icon({
        iconShape,
        icon: iconFont,
        iconSize: iconShape === "rectangle" ? [22, 22] : false,
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        iconAnchor: iconAnchors[iconShape],
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        popupAnchor: popupAnchors[iconShape],
        prefix: "fa",
        textColor: foregroundColor,
        backgroundColor,
        borderColor,
    });
    return leaflet_1.default.marker([lat, lon], { icon });
}
function createMarkerClusterGroup(color) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'markerClusterGroup' does not exist on ty... Remove this comment to see the full error message
    return leaflet_1.default.markerClusterGroup({
        iconCreateFunction(cluster) {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'markerClusterIcon' does not exist on typ... Remove this comment to see the full error message
            return leaflet_1.default.markerClusterIcon({ color, html: cluster.getChildCount() });
        },
    });
}
function createMarkersLayer(options, { color, points }) {
    const { classify, clusterMarkers, customizeMarkers } = options;
    const result = clusterMarkers ? createMarkerClusterGroup(color) : leaflet_1.default.featureGroup();
    // create markers
    (0, lodash_1.each)(points, ({ lat, lon, row }) => {
        const rowCopy = (0, lodash_1.clone)(row);
        rowCopy[options.latColName] = lat;
        rowCopy[options.lonColName] = lon;
        let marker;
        if (classify) {
            marker = createHeatpointMarker(lat, lon, color);
        }
        else {
            if (customizeMarkers) {
                marker = createIconMarker(lat, lon, options);
            }
            else {
                marker = leaflet_1.default.marker([lat, lon]);
            }
        }
        if (options.tooltip.enabled) {
            if (options.tooltip.template !== "") {
                marker.bindTooltip((0, sanitize_1.default)((0, value_format_1.formatSimpleTemplate)(options.tooltip.template, rowCopy)));
            }
            else {
                marker.bindTooltip(`
          <strong>${lat}, ${lon}</strong>
        `);
            }
        }
        if (options.popup.enabled) {
            if (options.popup.template !== "") {
                marker.bindPopup((0, sanitize_1.default)((0, value_format_1.formatSimpleTemplate)(options.popup.template, rowCopy)));
            }
            else {
                marker.bindPopup(`
          <ul style="list-style-type: none; padding-left: 0">
            <li><strong>${lat}, ${lon}</strong>
            ${(0, lodash_1.map)(row, (v, k) => `<li>${k}: ${v}</li>`).join("")}
          </ul>
        `);
            }
        }
        result.addLayer(marker);
    });
    return result;
}
function initMap(container) {
    const _map = leaflet_1.default.map(container, {
        center: [0.0, 0.0],
        zoom: 1,
        scrollWheelZoom: false,
        // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{ center: [number, number]; zoom... Remove this comment to see the full error message
        fullscreenControl: true,
    });
    const _tileLayer = leaflet_1.default.tileLayer("//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(_map);
    const _markerLayers = leaflet_1.default.featureGroup().addTo(_map);
    const _layersControls = leaflet_1.default.control.layers().addTo(_map);
    let onBoundsChange = () => { };
    let boundsChangedFromMap = false;
    const onMapMoveEnd = () => {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 1.
        onBoundsChange(_map.getBounds());
    };
    _map.on("focus", () => {
        boundsChangedFromMap = true;
        _map.on("moveend", onMapMoveEnd);
    });
    _map.on("blur", () => {
        _map.off("moveend", onMapMoveEnd);
        boundsChangedFromMap = false;
    });
    function updateLayers(groups, options) {
        _tileLayer.setUrl(options.mapTileUrl);
        _markerLayers.eachLayer(layer => {
            _markerLayers.removeLayer(layer);
            _layersControls.removeLayer(layer);
        });
        (0, lodash_1.each)(groups, group => {
            const layer = createMarkersLayer(options, group);
            _markerLayers.addLayer(layer);
            _layersControls.addOverlay(layer, group.name);
        });
        // hide layers control if it is empty
        if (groups.length > 0) {
            _layersControls.addTo(_map);
        }
        else {
            _layersControls.remove();
        }
    }
    function updateBounds(bounds) {
        if (!boundsChangedFromMap) {
            bounds = bounds
                ? leaflet_1.default.latLngBounds([bounds._southWest.lat, bounds._southWest.lng], [bounds._northEast.lat, bounds._northEast.lng])
                : _markerLayers.getBounds();
            if (bounds.isValid()) {
                _map.fitBounds(bounds, { animate: false, duration: 0 });
            }
        }
    }
    const unwatchResize = (0, resizeObserver_1.default)(container, () => {
        _map.invalidateSize(false);
    });
    return {
        get onBoundsChange() {
            return onBoundsChange;
        },
        set onBoundsChange(value) {
            onBoundsChange = (0, lodash_1.isFunction)(value) ? value : () => { };
        },
        updateLayers,
        updateBounds,
        destroy() {
            unwatchResize();
            _map.remove();
        },
    };
}
