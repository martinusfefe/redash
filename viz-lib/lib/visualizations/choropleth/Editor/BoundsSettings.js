function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import { isArray, isFinite, cloneDeep } from "lodash";
import React, { useState, useEffect, useCallback } from "react";
import { useDebouncedCallback } from "use-debounce";
import * as Grid from "antd/lib/grid";
import { Section, InputNumber, ControlLabel } from "../../../components/visualizations/editor";
import { EditorPropTypes } from "../../prop-types";
import useLoadGeoJson from "../hooks/useLoadGeoJson";
import { getGeoJsonBounds } from "./utils";
export default function BoundsSettings(_ref) {
  var options = _ref.options,
    onOptionsChange = _ref.onOptionsChange;
  // Bounds may be changed in editor or on preview (by drag/zoom map).
  // Changes from preview does not come frequently (only when user release mouse button),
  // but changes from editor should be debounced.
  // Therefore this component has intermediate state to hold immediate user input,
  // which is updated from `options.bounds` and by inputs immediately on user input,
  // but `onOptionsChange` event is debounced and uses last value from internal state.

  var _useState = useState(options.bounds),
    _useState2 = _slicedToArray(_useState, 2),
    bounds = _useState2[0],
    setBounds = _useState2[1];
  var _useDebouncedCallback = useDebouncedCallback(onOptionsChange, 200),
    _useDebouncedCallback2 = _slicedToArray(_useDebouncedCallback, 1),
    onOptionsChangeDebounced = _useDebouncedCallback2[0];
  var _useLoadGeoJson = useLoadGeoJson(options.mapType),
    _useLoadGeoJson2 = _slicedToArray(_useLoadGeoJson, 1),
    geoJson = _useLoadGeoJson2[0];

  // `options.bounds` could be empty only if user didn't edit bounds yet - through preview or in this editor.
  // In this case we should keep empty bounds value because it tells renderer to fit map every time.
  useEffect(() => {
    if (options.bounds) {
      setBounds(options.bounds);
    } else {
      var defaultBounds = getGeoJsonBounds(geoJson);
      if (defaultBounds) {
        setBounds(defaultBounds);
      }
    }
  }, [options.bounds, geoJson]);
  var updateBounds = useCallback((i, j, v) => {
    v = parseFloat(v); // InputNumber may emit `null` and empty strings instead of numbers
    if (isFinite(v)) {
      var newBounds = cloneDeep(bounds);
      newBounds[i][j] = v;
      setBounds(newBounds);
      onOptionsChangeDebounced({
        bounds: newBounds
      });
    }
  }, [bounds, onOptionsChangeDebounced]);
  var boundsAvailable = isArray(bounds);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(ControlLabel, {
    label: "North-East Latitude and Longitude"
  }, /*#__PURE__*/React.createElement(Grid.Row, {
    gutter: 15
  }, /*#__PURE__*/React.createElement(Grid.Col, {
    span: 12
  }, /*#__PURE__*/React.createElement(InputNumber, {
    disabled: !boundsAvailable,
    value: boundsAvailable ? bounds[1][0] : undefined,
    onChange: value => updateBounds(1, 0, value)
  })), /*#__PURE__*/React.createElement(Grid.Col, {
    span: 12
  }, /*#__PURE__*/React.createElement(InputNumber, {
    disabled: !boundsAvailable,
    value: boundsAvailable ? bounds[1][1] : undefined,
    onChange: value => updateBounds(1, 1, value)
  }))))), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(ControlLabel, {
    label: "South-West Latitude and Longitude"
  }, /*#__PURE__*/React.createElement(Grid.Row, {
    gutter: 15
  }, /*#__PURE__*/React.createElement(Grid.Col, {
    span: 12
  }, /*#__PURE__*/React.createElement(InputNumber, {
    disabled: !boundsAvailable,
    value: boundsAvailable ? bounds[0][0] : undefined,
    onChange: value => updateBounds(0, 0, value)
  })), /*#__PURE__*/React.createElement(Grid.Col, {
    span: 12
  }, /*#__PURE__*/React.createElement(InputNumber, {
    disabled: !boundsAvailable,
    value: boundsAvailable ? bounds[0][1] : undefined,
    onChange: value => updateBounds(0, 1, value)
  }))))));
}
BoundsSettings.propTypes = EditorPropTypes;
//# sourceMappingURL=BoundsSettings.js.map