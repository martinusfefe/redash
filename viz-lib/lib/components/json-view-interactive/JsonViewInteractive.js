function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
/* eslint-disable react/prop-types */

import { isFinite, isString, isArray, isObject, keys, map } from "lodash";
import React, { useState } from "react";
import cx from "classnames";
import "./json-view-interactive.less";
function JsonBlock(_ref) {
  var value = _ref.value,
    children = _ref.children,
    openingBrace = _ref.openingBrace,
    closingBrace = _ref.closingBrace,
    withKeys = _ref.withKeys;
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    isExpanded = _useState2[0],
    setIsExpanded = _useState2[1];
  var objectKeys = keys(value);
  var count = objectKeys.length;
  return /*#__PURE__*/React.createElement(React.Fragment, null, count > 0 && /*#__PURE__*/React.createElement("span", {
    className: "jvi-toggle",
    onClick: () => setIsExpanded(!isExpanded)
  }, /*#__PURE__*/React.createElement("i", {
    className: cx("fa", {
      "fa-caret-right": !isExpanded,
      "fa-caret-down": isExpanded
    })
  })), /*#__PURE__*/React.createElement("span", {
    className: "jvi-punctuation jvi-braces"
  }, openingBrace), !isExpanded && count > 0 && /*#__PURE__*/React.createElement("span", {
    className: "jvi-punctuation jvi-ellipsis",
    onClick: () => setIsExpanded(true)
  }, "\u2026"), isExpanded && /*#__PURE__*/React.createElement("span", {
    className: "jvi-block"
  }, map(objectKeys, (key, index) => {
    var isFirst = index === 0;
    var isLast = index === count - 1;
    var comma = isLast ? null : /*#__PURE__*/React.createElement("span", {
      className: "jvi-punctuation jvi-comma"
    }, ",");
    return /*#__PURE__*/React.createElement("span", {
      key: "item-" + key,
      className: cx("jvi-item", {
        "jvi-nested-first": isFirst,
        "jvi-nested-last": isLast
      })
    }, withKeys && /*#__PURE__*/React.createElement("span", {
      className: "jvi-object-key"
    }, /*#__PURE__*/React.createElement(JsonValue, {
      value: key
    }, /*#__PURE__*/React.createElement("span", {
      className: "jvi-punctuation"
    }, ": "))), /*#__PURE__*/React.createElement(JsonValue, {
      value: value[key]
    }, comma));
  })), /*#__PURE__*/React.createElement("span", {
    className: "jvi-punctuation jvi-braces"
  }, closingBrace), children, !isExpanded && /*#__PURE__*/React.createElement("span", {
    className: "jvi-comment"
  }, " // " + count + " " + (count === 1 ? "item" : "items")));
}
function JsonValue(_ref2) {
  var value = _ref2.value,
    children = _ref2.children;
  if (value === null || value === false || value === true || isFinite(value)) {
    return /*#__PURE__*/React.createElement("span", {
      className: "jvi-value jvi-primitive"
    }, "" + value, children);
  }
  if (isString(value)) {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
      className: "jvi-punctuation jvi-string"
    }, "\""), /*#__PURE__*/React.createElement("span", {
      className: "jvi-value jvi-string"
    }, value), /*#__PURE__*/React.createElement("span", {
      className: "jvi-punctuation jvi-string"
    }, "\""), children);
  }
  if (isArray(value)) {
    return /*#__PURE__*/React.createElement(JsonBlock, {
      value: value,
      openingBrace: "[",
      closingBrace: "]"
    }, children);
  }
  if (isObject(value)) {
    return /*#__PURE__*/React.createElement(JsonBlock, {
      value: value,
      openingBrace: "{",
      closingBrace: "}",
      withKeys: true
    }, children);
  }
  return null;
}
export default function JsonViewInteractive(_ref3) {
  var value = _ref3.value;
  return /*#__PURE__*/React.createElement("span", {
    className: "jvi-item jvi-root"
  }, /*#__PURE__*/React.createElement(JsonValue, {
    value: value
  }));
}
JsonViewInteractive.defaultProps = {
  // `null` will be rendered as "null" because it is a valid JSON value, so use `undefined` for no value
  value: undefined
};
//# sourceMappingURL=JsonViewInteractive.js.map