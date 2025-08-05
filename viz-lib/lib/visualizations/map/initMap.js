import { isFunction, each, map, toString, clone } from "lodash";
import chroma from "chroma-js";
import L from "leaflet";
import "leaflet.markercluster";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "beautifymarker";
import "beautifymarker/leaflet-beautify-marker-icon.css";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'leaflet/dist/images/marker-ico... Remove this comment to see the full error message
import markerIcon from "leaflet/dist/images/marker-icon.png";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'leaflet/dist/images/marker-ico... Remove this comment to see the full error message
import markerIconRetina from "leaflet/dist/images/marker-icon-2x.png";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'leaflet/dist/images/marker-sha... Remove this comment to see the full error message
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import "leaflet-fullscreen";
import "leaflet-fullscreen/dist/leaflet.fullscreen.css";
import { formatSimpleTemplate } from "../../lib/value-format";
import sanitize from "../../services/sanitize";
import resizeObserver from "../../services/resizeObserver";
import chooseTextColorForBackground from "../../lib/chooseTextColorForBackground";

// This is a workaround for an issue with giving Leaflet load the icon on its own.
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIconRetina,
  shadowUrl: markerShadow
});

// @ts-expect-error ts-migrate(2339) FIXME: Property '_getIconUrl' does not exist on type 'Def... Remove this comment to see the full error message
delete L.Icon.Default.prototype._getIconUrl;
var iconAnchors = {
  marker: [14, 32],
  circle: [10, 10],
  rectangle: [11, 11],
  "circle-dot": [1, 2],
  "rectangle-dot": [1, 2],
  doughnut: [8, 8]
};
var popupAnchors = {
  rectangle: [0, -3],
  circle: [1, -3]
};
var createHeatpointMarker = (lat, lon, color) => L.circleMarker([lat, lon], {
  fillColor: color,
  fillOpacity: 0.9,
  stroke: false
});

// @ts-expect-error ts-migrate(2339) FIXME: Property 'MarkerClusterIcon' does not exist on typ... Remove this comment to see the full error message
L.MarkerClusterIcon = L.DivIcon.extend({
  options: {
    color: null,
    className: "marker-cluster",
    iconSize: new L.Point(40, 40)
  },
  // @ts-expect-error ts-migrate(7019) FIXME: Rest parameter 'args' implicitly has an 'any[]' ty... Remove this comment to see the full error message
  createIcon() {
    var color = chroma(this.options.color);
    var textColor = chooseTextColorForBackground(color);
    var borderColor = color.alpha(0.4).css();
    var backgroundColor = color.alpha(0.8).css();
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    var icon = L.DivIcon.prototype.createIcon.call(this, ...args);
    icon.innerHTML = "\n      <div style=\"background: ".concat(backgroundColor, "\">\n        <span style=\"color: ").concat(textColor, "\">").concat(toString(this.options.html), "</span>\n      </div>\n    ");
    icon.style.background = borderColor;
    return icon;
  }
});
// @ts-expect-error ts-migrate(2339) FIXME: Property 'markerClusterIcon' does not exist on typ... Remove this comment to see the full error message
L.markerClusterIcon = function () {
  for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }
  return new L.MarkerClusterIcon(...args);
};
function createIconMarker(lat, lon, _ref) {
  var iconShape = _ref.iconShape,
    iconFont = _ref.iconFont,
    foregroundColor = _ref.foregroundColor,
    backgroundColor = _ref.backgroundColor,
    borderColor = _ref.borderColor;
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'BeautifyIcon' does not exist on type 'ty... Remove this comment to see the full error message
  var icon = L.BeautifyIcon.icon({
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
    borderColor
  });
  return L.marker([lat, lon], {
    icon
  });
}
function createMarkerClusterGroup(color) {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'markerClusterGroup' does not exist on ty... Remove this comment to see the full error message
  return L.markerClusterGroup({
    iconCreateFunction(cluster) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'markerClusterIcon' does not exist on typ... Remove this comment to see the full error message
      return L.markerClusterIcon({
        color,
        html: cluster.getChildCount()
      });
    }
  });
}
function createMarkersLayer(options, _ref2) {
  var color = _ref2.color,
    points = _ref2.points;
  var classify = options.classify,
    clusterMarkers = options.clusterMarkers,
    customizeMarkers = options.customizeMarkers;
  var result = clusterMarkers ? createMarkerClusterGroup(color) : L.featureGroup();

  // create markers
  each(points, _ref3 => {
    var lat = _ref3.lat,
      lon = _ref3.lon,
      row = _ref3.row;
    var rowCopy = clone(row);
    rowCopy[options.latColName] = lat;
    rowCopy[options.lonColName] = lon;
    var marker;
    if (classify) {
      marker = createHeatpointMarker(lat, lon, color);
    } else {
      if (customizeMarkers) {
        marker = createIconMarker(lat, lon, options);
      } else {
        marker = L.marker([lat, lon]);
      }
    }
    if (options.tooltip.enabled) {
      if (options.tooltip.template !== "") {
        marker.bindTooltip(sanitize(formatSimpleTemplate(options.tooltip.template, rowCopy)));
      } else {
        marker.bindTooltip("\n          <strong>".concat(lat, ", ").concat(lon, "</strong>\n        "));
      }
    }
    if (options.popup.enabled) {
      if (options.popup.template !== "") {
        marker.bindPopup(sanitize(formatSimpleTemplate(options.popup.template, rowCopy)));
      } else {
        marker.bindPopup("\n          <ul style=\"list-style-type: none; padding-left: 0\">\n            <li><strong>".concat(lat, ", ").concat(lon, "</strong>\n            ").concat(map(row, (v, k) => "<li>".concat(k, ": ").concat(v, "</li>")).join(""), "\n          </ul>\n        "));
      }
    }
    result.addLayer(marker);
  });
  return result;
}
export default function initMap(container) {
  var _map = L.map(container, {
    center: [0.0, 0.0],
    zoom: 1,
    scrollWheelZoom: false,
    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{ center: [number, number]; zoom... Remove this comment to see the full error message
    fullscreenControl: true
  });
  var _tileLayer = L.tileLayer("//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(_map);
  var _markerLayers = L.featureGroup().addTo(_map);
  var _layersControls = L.control.layers().addTo(_map);
  var onBoundsChange = () => {};
  var boundsChangedFromMap = false;
  var onMapMoveEnd = () => {
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
    each(groups, group => {
      var layer = createMarkersLayer(options, group);
      _markerLayers.addLayer(layer);
      _layersControls.addOverlay(layer, group.name);
    });

    // hide layers control if it is empty
    if (groups.length > 0) {
      _layersControls.addTo(_map);
    } else {
      _layersControls.remove();
    }
  }
  function updateBounds(bounds) {
    if (!boundsChangedFromMap) {
      bounds = bounds ? L.latLngBounds([bounds._southWest.lat, bounds._southWest.lng], [bounds._northEast.lat, bounds._northEast.lng]) : _markerLayers.getBounds();
      if (bounds.isValid()) {
        _map.fitBounds(bounds, {
          animate: false,
          duration: 0
        });
      }
    }
  }
  var unwatchResize = resizeObserver(container, () => {
    _map.invalidateSize(false);
  });
  return {
    get onBoundsChange() {
      return onBoundsChange;
    },
    set onBoundsChange(value) {
      onBoundsChange = isFunction(value) ? value : () => {};
    },
    updateLayers,
    updateBounds,
    destroy() {
      unwatchResize();
      _map.remove();
    }
  };
}
//# sourceMappingURL=initMap.js.map