function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import { map } from "lodash";
import React, { useMemo, useCallback } from "react";
import Table from "antd/lib/table";
import ColorPicker from "../../../components/ColorPicker";
import { EditorPropTypes } from "../../prop-types";
import ColorPalette from "../../ColorPalette";
import prepareData from "../prepareData";
export default function GroupsSettings(_ref) {
  var options = _ref.options,
    data = _ref.data,
    onOptionsChange = _ref.onOptionsChange;
  var groups = useMemo(() => map(prepareData(data, options), _ref2 => {
    var name = _ref2.name;
    return {
      name,
      color: (options.groups[name] || {}).color || null
    };
  }), [data, options]);
  var colors = useMemo(() => _objectSpread({
    Automatic: null
  }, ColorPalette), []);
  var updateGroupOption = useCallback((name, prop, value) => {
    onOptionsChange({
      groups: {
        [name]: {
          [prop]: value
        }
      }
    });
  }, [onOptionsChange]);
  var columns = [{
    title: "Group",
    dataIndex: "name"
  }, {
    title: "Color",
    dataIndex: "color",
    width: "1%",
    render: (unused, item) => /*#__PURE__*/React.createElement(ColorPicker
    // @ts-expect-error ts-migrate(2322) FIXME: Type 'boolean' is not assignable to type 'never'.
    , {
      interactive: true
      // @ts-expect-error ts-migrate(2322) FIXME: Type '{ "Indian Red": string; "Green 2": string; "... Remove this comment to see the full error message
      ,
      presetColors: colors
      // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
      ,
      placement: "topRight"
      // @ts-expect-error ts-migrate(2322) FIXME: Type 'any' is not assignable to type 'never'.
      ,
      color: item.color
      // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
      ,
      triggerProps: {
        "data-test": "Map.Editor.Groups.".concat(item.name, ".Color")
      }
      // @ts-expect-error ts-migrate(2322) FIXME: Type '(value: any) => void' is not assignable to t... Remove this comment to see the full error message
      ,
      onChange: value => updateGroupOption(item.name, "color", value)
      // @ts-expect-error ts-migrate(2322) FIXME: Type 'Element' is not assignable to type 'never'.
      ,
      addonAfter: /*#__PURE__*/React.createElement(ColorPicker.Label, {
        color: item.color,
        presetColors: colors
      })
    })
  }];
  return /*#__PURE__*/React.createElement(Table, {
    columns: columns,
    dataSource: groups,
    rowKey: "name",
    showHeader: false,
    pagination: false
  });
}
GroupsSettings.propTypes = EditorPropTypes;
//# sourceMappingURL=GroupsSettings.js.map