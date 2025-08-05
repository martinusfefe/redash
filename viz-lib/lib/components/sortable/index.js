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
exports.SortableElement = exports.SortableContainerWrapper = exports.DragHandle = void 0;
exports.SortableContainer = SortableContainer;
const lodash_1 = require("lodash");
const react_1 = __importStar(require("react"));
const classnames_1 = __importDefault(require("classnames"));
// @ts-expect-error ts-migrate(2724) FIXME: Module '"../../../node_modules/react-sortable-hoc/... Remove this comment to see the full error message
const react_sortable_hoc_1 = require("react-sortable-hoc");
require("./style.less");
exports.DragHandle = (0, react_sortable_hoc_1.sortableHandle)(({ className, ...restProps }) => (react_1.default.createElement("div", { className: (0, classnames_1.default)("drag-handle", className), ...restProps })));
exports.SortableContainerWrapper = (0, react_sortable_hoc_1.sortableContainer)(({ children }) => children);
exports.SortableElement = (0, react_sortable_hoc_1.sortableElement)(({ children }) => children);
function SortableContainer({ disabled, containerComponent, containerProps, children, ...wrapperProps }) {
    const containerRef = (0, react_1.useRef)();
    const [isDragging, setIsDragging] = (0, react_1.useState)(false);
    wrapperProps = { ...wrapperProps };
    containerProps = { ...containerProps };
    if (disabled) {
        // Disabled state:
        // - forbid drag'n'drop (and therefore no need to hook events
        // - don't override anything on container element
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'shouldCancelStart' does not exist on typ... Remove this comment to see the full error message
        wrapperProps.shouldCancelStart = () => true;
    }
    else {
        // Enabled state:
        // - use container element as a default helper element
        // @ts-expect-error
        wrapperProps.helperContainer = (0, lodash_1.wrap)(wrapperProps.helperContainer, helperContainer => (0, lodash_1.isFunction)(helperContainer) ? helperContainer(containerRef.current) : containerRef.current);
        // - hook drag start/end events
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'updateBeforeSortStart' does not exist on... Remove this comment to see the full error message
        wrapperProps.updateBeforeSortStart = (0, lodash_1.wrap)(wrapperProps.updateBeforeSortStart, (updateBeforeSortStart, ...args) => {
            setIsDragging(true);
            if ((0, lodash_1.isFunction)(updateBeforeSortStart)) {
                updateBeforeSortStart(...args);
            }
        });
        // @ts-expect-error
        wrapperProps.onSortStart = (0, lodash_1.wrap)(wrapperProps.onSortStart, (onSortStart, ...args) => {
            if ((0, lodash_1.isFunction)(onSortStart)) {
                onSortStart(...args);
            }
            else {
                const event = args[1];
                event.preventDefault();
            }
        });
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'onSortEnd' does not exist on type '{}'.
        wrapperProps.onSortEnd = (0, lodash_1.wrap)(wrapperProps.onSortEnd, (onSortEnd, ...args) => {
            setIsDragging(false);
            if ((0, lodash_1.isFunction)(onSortEnd)) {
                onSortEnd(...args);
            }
        });
        // - update container element: add classes and take a ref
        containerProps.className = (0, classnames_1.default)("sortable-container", { "sortable-container-dragging": isDragging }, containerProps.className);
        containerProps.ref = containerRef;
    }
    const ContainerComponent = containerComponent;
    return (react_1.default.createElement(exports.SortableContainerWrapper, { ...wrapperProps },
        react_1.default.createElement(ContainerComponent, { ...containerProps }, children)));
}
SortableContainer.defaultProps = {
    disabled: false,
    containerComponent: "div",
    containerProps: {},
    children: null,
};
