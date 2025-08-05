function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import { omit, noop } from "lodash";
import React, { useState, useEffect, useRef } from "react";
import { RendererPropTypes } from "../../prop-types";
import useMemoWithDeepCompare from "../../../lib/hooks/useMemoWithDeepCompare";
import useLoadGeoJson from "../hooks/useLoadGeoJson";
import initChoropleth from "./initChoropleth";
import { prepareData } from "./utils";
import "./renderer.less";
export default function Renderer(_ref) {
  var data = _ref.data,
    options = _ref.options,
    onOptionsChange = _ref.onOptionsChange;
  var _useState = useState(null),
    _useState2 = _slicedToArray(_useState, 2),
    container = _useState2[0],
    setContainer = _useState2[1];
  var _useLoadGeoJson = useLoadGeoJson(options.mapType),
    _useLoadGeoJson2 = _slicedToArray(_useLoadGeoJson, 1),
    geoJson = _useLoadGeoJson2[0];
  var onBoundsChangeRef = useRef();
  // @ts-expect-error ts-migrate(2322) FIXME: Type '(...args: any[]) => void' is not assignable ... Remove this comment to see the full error message
  onBoundsChangeRef.current = onOptionsChange ? bounds => onOptionsChange(_objectSpread(_objectSpread({}, options), {}, {
    bounds
  })) : noop;
  var optionsWithoutBounds = useMemoWithDeepCompare(() => omit(options, ["bounds"]), [options]);
  var _useState3 = useState(null),
    _useState4 = _slicedToArray(_useState3, 2),
    map = _useState4[0],
    setMap = _useState4[1];
  useEffect(() => {
    if (container) {
      // @ts-expect-error ts-migrate(7019) FIXME: Rest parameter 'args' implicitly has an 'any[]' ty... Remove this comment to see the full error message
      var _map = initChoropleth(container, function () {
        return onBoundsChangeRef.current(...arguments);
      });
      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{ updateLayers: (geoJson: any, d... Remove this comment to see the full error message
      setMap(_map);
      return () => {
        _map.destroy();
      };
    }
  }, [container]);
  useEffect(() => {
    if (map) {
      // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
      map.updateLayers(geoJson,
      // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
      prepareData(data.rows, optionsWithoutBounds.keyColumn, optionsWithoutBounds.valueColumn), options // detect changes for all options except bounds, but pass them all!
      );
    }
  }, [map, geoJson, data.rows, optionsWithoutBounds]); // eslint-disable-line react-hooks/exhaustive-deps

  // This may come only from editor
  useEffect(() => {
    if (map) {
      // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
      map.updateBounds(options.bounds);
    }
  }, [map, options, onOptionsChange]);
  return (
    /*#__PURE__*/
    // @ts-expect-error ts-migrate(2322) FIXME: Type 'Dispatch<SetStateAction<null>>' is not assig... Remove this comment to see the full error message
    React.createElement("div", {
      className: "map-visualization-container",
      style: {
        background: options.colors.background
      },
      ref: setContainer
    })
  );
}
Renderer.propTypes = RendererPropTypes;
//# sourceMappingURL=index.js.map