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
exports.ControlLabel = ControlLabel;
exports.default = withControlLabel;
const react_1 = __importStar(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const hoist_non_react_statics_1 = __importDefault(require("hoist-non-react-statics"));
const Grid = __importStar(require("antd/lib/grid"));
const typography_1 = __importDefault(require("antd/lib/typography"));
require("./control-label.less");
function ControlLabel({ layout, label, labelProps, disabled, children }) {
    if (layout === "vertical" && label) {
        return (react_1.default.createElement("div", { className: "visualization-editor-control-label visualization-editor-control-label-vertical" },
            react_1.default.createElement("label", { ...labelProps },
                react_1.default.createElement(typography_1.default.Text, { disabled: disabled }, label)),
            children));
    }
    if (layout === "horizontal" && label) {
        return (react_1.default.createElement(Grid.Row, { className: "visualization-editor-control-label visualization-editor-control-label-horizontal", 
            // @ts-expect-error ts-migrate(2322) FIXME: Type '{ children: Element[]; className: string; ty... Remove this comment to see the full error message
            type: "flex", align: "middle", gutter: 15 },
            react_1.default.createElement(Grid.Col, { span: 12 },
                react_1.default.createElement("label", { ...labelProps },
                    react_1.default.createElement(typography_1.default.Text, { disabled: disabled }, label))),
            react_1.default.createElement(Grid.Col, { span: 12 }, children)));
    }
    return children;
}
ControlLabel.defaultProps = {
    layout: "vertical",
    label: null,
    disabled: false,
    children: null,
};
function withControlLabel(WrappedControl) {
    // eslint-disable-next-line react/prop-types
    function ControlWrapper({ className, id, layout, label, labelProps, disabled, ...props }) {
        const fallbackId = (0, react_1.useMemo)(() => `visualization-editor-control-${Math.random()
            .toString(36)
            .substr(2, 10)}`, []);
        labelProps = {
            ...labelProps,
            htmlFor: id || fallbackId,
        };
        return (react_1.default.createElement(ControlLabel, { layout: layout, label: label, labelProps: labelProps, disabled: disabled },
            react_1.default.createElement(WrappedControl, { className: (0, classnames_1.default)("visualization-editor-input", className), id: labelProps.htmlFor, disabled: disabled, ...props })));
    }
    // Copy static methods from `WrappedComponent`
    (0, hoist_non_react_statics_1.default)(ControlWrapper, WrappedControl);
    return ControlWrapper;
}
