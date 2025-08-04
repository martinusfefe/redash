function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import { isEqual, omit, merge } from "lodash";
import React, { useState, useEffect, useRef, useMemo } from "react";
import { RendererPropTypes } from "../prop-types";
import prepareData from "./prepareData";
import initMap from "./initMap";
function useMemoWithDeepCompare(create, inputs) {
  var valueRef = useRef();
  var value = useMemo(create, inputs);
  if (!isEqual(value, valueRef.current)) {
    // @ts-expect-error ts-migrate(2322) FIXME: Type 'unknown' is not assignable to type 'undefine... Remove this comment to see the full error message
    valueRef.current = value;
  }
  return valueRef.current;
}
export default function Renderer(_ref) {
  var data = _ref.data,
    options = _ref.options,
    onOptionsChange = _ref.onOptionsChange;
  var _useState = useState(null),
    _useState2 = _slicedToArray(_useState, 2),
    container = _useState2[0],
    setContainer = _useState2[1];
  var optionsWithoutBounds = useMemoWithDeepCompare(() => omit(options, ["bounds"]), [options]);
  var groups = useMemo(() => prepareData(data, optionsWithoutBounds), [data, optionsWithoutBounds]);
  var _useState3 = useState(null),
    _useState4 = _slicedToArray(_useState3, 2),
    map = _useState4[0],
    setMap = _useState4[1];
  useEffect(() => {
    if (container) {
      var _map = initMap(container);
      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{ onBoundsChange: () => void; up... Remove this comment to see the full error message
      setMap(_map);
      return () => {
        _map.destroy();
      };
    }
  }, [container]);
  useEffect(() => {
    if (map) {
      // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
      map.updateLayers(groups, optionsWithoutBounds);
    }
  }, [map, groups, optionsWithoutBounds]);
  useEffect(() => {
    if (map) {
      // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
      map.updateBounds(options.bounds);
    }
  }, [map, options.bounds]);
  useEffect(() => {
    if (map && onOptionsChange) {
      // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
      map.onBoundsChange = bounds => {
        onOptionsChange(merge({}, options, {
          bounds
        }));
      };
    }
  }, [map, options, onOptionsChange]);

  // @ts-expect-error ts-migrate(2322) FIXME: Type 'Dispatch<SetStateAction<null>>' is not assig... Remove this comment to see the full error message
  return /*#__PURE__*/React.createElement("div", {
    className: "map-visualization-container",
    ref: setContainer
  });
}
Renderer.propTypes = RendererPropTypes;
//# sourceMappingURL=Renderer.js.map