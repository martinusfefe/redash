function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import { isFunction, isObject, isArray, map } from "lodash";
import React from "react";
import ReactDOM from "react-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-fullscreen";
import "leaflet-fullscreen/dist/leaflet.fullscreen.css";
import { formatSimpleTemplate } from "../../../lib/value-format";
import sanitize from "../../../services/sanitize";
import resizeObserver from "../../../services/resizeObserver";
import { createNumberFormatter, createScale, darkenColor, getColorByValue, getValueForFeature, prepareFeatureProperties } from "./utils";
import Legend from "./Legend";
var CustomControl = L.Control.extend({
  options: {
    position: "topright"
  },
  onAdd() {
    var div = document.createElement("div");
    div.className = "leaflet-bar leaflet-custom-toolbar";
    div.style.background = "#fff";
    div.style.backgroundClip = "padding-box";
    return div;
  },
  onRemove() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'getContainer' does not exist on type '{ ... Remove this comment to see the full error message
    ReactDOM.unmountComponentAtNode(this.getContainer());
  }
});
function prepareLayer(_ref) {
  var feature = _ref.feature,
    layer = _ref.layer,
    data = _ref.data,
    options = _ref.options,
    limits = _ref.limits,
    colors = _ref.colors,
    formatValue = _ref.formatValue;
  var value = getValueForFeature(feature, data, options.targetField);
  var valueFormatted = formatValue(value);
  var featureData = prepareFeatureProperties(feature, valueFormatted, data, options.targetField);
  var color = getColorByValue(value, limits, colors, options.colors.noValue);
  layer.setStyle({
    color: options.colors.borders,
    weight: 1,
    fillColor: color,
    fillOpacity: 1
  });
  if (options.tooltip.enabled) {
    layer.bindTooltip(sanitize(formatSimpleTemplate(options.tooltip.template, featureData)), {
      sticky: true
    });
  }
  if (options.popup.enabled) {
    layer.bindPopup(sanitize(formatSimpleTemplate(options.popup.template, featureData)));
  }
  layer.on("mouseover", () => {
    layer.setStyle({
      weight: 2,
      fillColor: darkenColor(color)
    });
  });
  layer.on("mouseout", () => {
    layer.setStyle({
      weight: 1,
      fillColor: color
    });
  });
}
function validateBounds(bounds, fallbackBounds) {
  if (bounds) {
    bounds = L.latLngBounds(bounds[0], bounds[1]);
    if (bounds.isValid()) {
      return bounds;
    }
  }
  if (fallbackBounds && fallbackBounds.isValid()) {
    return fallbackBounds;
  }
  return null;
}
export default function initChoropleth(container, onBoundsChange) {
  var _map = L.map(container, {
    center: [0.0, 0.0],
    zoom: 1,
    zoomSnap: 0,
    scrollWheelZoom: false,
    maxBoundsViscosity: 1,
    attributionControl: false,
    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{ center: [number, number]; zoom... Remove this comment to see the full error message
    fullscreenControl: true
  });
  var _choropleth = null;
  var _legend = new CustomControl();
  function handleMapBoundsChange() {
    if (isFunction(onBoundsChange)) {
      var bounds = _map.getBounds();
      onBoundsChange([
      // @ts-expect-error ts-migrate(2551) FIXME: Property '_southWest' does not exist on type 'LatL... Remove this comment to see the full error message
      [bounds._southWest.lat, bounds._southWest.lng],
      // @ts-expect-error ts-migrate(2551) FIXME: Property '_northEast' does not exist on type 'LatL... Remove this comment to see the full error message
      [bounds._northEast.lat, bounds._northEast.lng]]);
    }
  }
  var boundsChangedFromMap = false;
  var onMapMoveEnd = () => {
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
    if (!isObject(geoJson) || !isArray(geoJson.features)) {
      _choropleth = null;
      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'null' is not assignable to param... Remove this comment to see the full error message
      _map.setMaxBounds(null);
      return;
    }

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'features' does not exist on type 'object... Remove this comment to see the full error message
    var _createScale = createScale(geoJson.features, data, options),
      limits = _createScale.limits,
      colors = _createScale.colors,
      legend = _createScale.legend;
    var formatValue = createNumberFormatter(options.valueFormat, options.noValuePlaceholder);

    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'object' is not assignable to par... Remove this comment to see the full error message
    _choropleth = L.geoJSON(geoJson, {
      onEachFeature(feature, layer) {
        prepareLayer({
          feature,
          layer,
          data,
          options,
          limits,
          colors,
          formatValue
        });
      }
    }).addTo(_map);
    var mapBounds = _choropleth.getBounds();
    var bounds = validateBounds(options.bounds, mapBounds);
    _map.fitBounds(bounds, {
      animate: false,
      duration: 0
    });

    // equivalent to `_map.setMaxBounds(mapBounds)` but without animation
    _map.options.maxBounds = mapBounds;
    _map.panInsideBounds(mapBounds, {
      animate: false,
      duration: 0
    });

    // update legend
    if (options.legend.visible && legend.length > 0) {
      _legend.setPosition(options.legend.position.replace("-", ""));
      _map.addControl(_legend);
      ReactDOM.render(
      /*#__PURE__*/
      // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
      React.createElement(Legend
      // @ts-expect-error ts-migrate(2322) FIXME: Type '{ text: any; color: any; limit: any; }[]' is... Remove this comment to see the full error message
      , {
        items: map(legend, item => _objectSpread(_objectSpread({}, item), {}, {
          text: formatValue(item.limit)
        })),
        alignText: options.legend.alignText
      }), _legend.getContainer());
    }
  }
  function updateBounds(bounds) {
    if (!boundsChangedFromMap) {
      var layerBounds = _choropleth ? _choropleth.getBounds() : _map.getBounds();
      bounds = validateBounds(bounds, layerBounds);
      if (bounds) {
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
    updateLayers,
    updateBounds,
    destroy() {
      unwatchResize();
      _map.removeControl(_legend); // _map.remove() does not cleanup controls - bug in Leaflet?
      _map.remove();
    }
  };
}
//# sourceMappingURL=initChoropleth.js.map