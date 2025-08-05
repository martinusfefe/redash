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
exports.default = ColorPicker;
const lodash_1 = require("lodash");
const react_1 = __importStar(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const popover_1 = __importDefault(require("antd/lib/popover"));
const card_1 = __importDefault(require("antd/lib/card"));
const tooltip_1 = __importDefault(require("antd/lib/tooltip"));
const chooseTextColorForBackground_1 = __importDefault(require("../../lib/chooseTextColorForBackground"));
const CloseOutlined_1 = __importDefault(require("@ant-design/icons/CloseOutlined"));
const CheckOutlined_1 = __importDefault(require("@ant-design/icons/CheckOutlined"));
const Input_1 = __importDefault(require("./Input"));
const Swatch_1 = __importDefault(require("./Swatch"));
const Label_1 = __importDefault(require("./Label"));
const utils_1 = require("./utils");
require("./index.less");
function ColorPicker({ color, placement, presetColors, presetColumns, interactive, children, onChange, triggerProps, addonBefore, addonAfter, }) {
    const [visible, setVisible] = (0, react_1.useState)(false);
    const validatedColor = (0, react_1.useMemo)(() => (0, utils_1.validateColor)(color), [color]);
    const [currentColor, setCurrentColor] = (0, react_1.useState)("");
    function handleApply() {
        setVisible(false);
        if (!interactive) {
            // @ts-expect-error ts-migrate(2349) FIXME: This expression is not callable.
            onChange(currentColor);
        }
    }
    function handleCancel() {
        setVisible(false);
    }
    const actions = [];
    if (!interactive) {
        actions.push(react_1.default.createElement(tooltip_1.default, { key: "cancel", title: "Cancel" },
            react_1.default.createElement(CloseOutlined_1.default, { onClick: handleCancel })));
        actions.push(react_1.default.createElement(tooltip_1.default, { key: "apply", title: "Apply" },
            react_1.default.createElement(CheckOutlined_1.default, { onClick: handleApply })));
    }
    function handleInputChange(newColor) {
        setCurrentColor(newColor);
        if (interactive) {
            // @ts-expect-error ts-migrate(2349) FIXME: This expression is not callable.
            onChange(newColor);
        }
    }
    (0, react_1.useEffect)(() => {
        if (visible) {
            // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'string | null' is not assignable... Remove this comment to see the full error message
            setCurrentColor(validatedColor);
        }
    }, [validatedColor, visible]);
    return (react_1.default.createElement("span", { className: "color-picker-wrapper" },
        addonBefore,
        react_1.default.createElement(popover_1.default, { arrowPointAtCenter: true, overlayClassName: `color-picker ${interactive ? "color-picker-interactive" : "color-picker-with-actions"}`, 
            // @ts-expect-error ts-migrate(2322) FIXME: Type '{ "--color-picker-selected-color": string; }... Remove this comment to see the full error message
            overlayStyle: { "--color-picker-selected-color": currentColor }, content: react_1.default.createElement(card_1.default, { "data-test": "ColorPicker", className: "color-picker-panel", bordered: false, title: (0, lodash_1.toString)(currentColor).toUpperCase(), headStyle: {
                    backgroundColor: currentColor,
                    // @ts-expect-error ts-migrate(2322) FIXME: Type 'string | null | undefined' is not assignable... Remove this comment to see the full error message
                    color: (0, chooseTextColorForBackground_1.default)(currentColor),
                }, actions: actions },
                react_1.default.createElement(Input_1.default
                // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
                , { 
                    // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
                    color: currentColor, presetColors: presetColors, presetColumns: presetColumns, 
                    // @ts-expect-error ts-migrate(2322) FIXME: Type '(newColor: any) => void' is not assignable t... Remove this comment to see the full error message
                    onChange: handleInputChange, 
                    // @ts-expect-error ts-migrate(2322) FIXME: Type '() => void' is not assignable to type 'never... Remove this comment to see the full error message
                    onPressEnter: handleApply })), trigger: "click", placement: placement, visible: visible, onVisibleChange: setVisible }, children || (react_1.default.createElement(Swatch_1.default, { color: validatedColor, size: 30, ...triggerProps, 
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'className' does not exist on type 'never... Remove this comment to see the full error message
            className: (0, classnames_1.default)("color-picker-trigger", triggerProps.className) }))),
        addonAfter));
}
ColorPicker.defaultProps = {
    color: "#FFFFFF",
    placement: "top",
    presetColors: null,
    presetColumns: 8,
    interactive: false,
    triggerProps: {},
    children: null,
    addonBefore: null,
    addonAfter: null,
    onChange: () => { },
};
ColorPicker.Input = Input_1.default;
ColorPicker.Swatch = Swatch_1.default;
ColorPicker.Label = Label_1.default;
