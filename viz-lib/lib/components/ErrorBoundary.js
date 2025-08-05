"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorBoundaryContext = void 0;
exports.ErrorMessage = ErrorMessage;
const lodash_1 = require("lodash");
const react_1 = __importDefault(require("react"));
const debug_1 = __importDefault(require("debug"));
const alert_1 = __importDefault(require("antd/lib/alert"));
const logger = (0, debug_1.default)("redash:errors");
exports.ErrorBoundaryContext = react_1.default.createContext({
    handleError: (error) => {
        // Allow calling chain to roll up, and then throw the error in global context
        setTimeout(() => {
            throw error;
        });
    },
    reset: () => { },
});
function ErrorMessage({ children }) {
    return react_1.default.createElement(alert_1.default, { message: children, type: "error", showIcon: true });
}
ErrorMessage.defaultProps = {
    children: "Something went wrong.",
};
class ErrorBoundary extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.state = { error: null };
        this.handleError = (error) => {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'getDerivedStateFromError' does not exist... Remove this comment to see the full error message
            this.setState(this.constructor.getDerivedStateFromError(error));
            this.componentDidCatch(error, null);
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'handleException' does not exist on type ... Remove this comment to see the full error message
            if ((0, lodash_1.isFunction)(window.handleException)) {
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'handleException' does not exist on type ... Remove this comment to see the full error message
                window.handleException(error);
            }
        };
        this.reset = () => {
            this.setState({ error: null });
        };
    }
    static getDerivedStateFromError(error) {
        return { error };
    }
    componentDidCatch(error, errorInfo) {
        logger(error, errorInfo);
    }
    render() {
        const { renderError, children } = this.props;
        const { error } = this.state;
        if (error) {
            if ((0, lodash_1.isFunction)(renderError)) {
                // @ts-expect-error ts-migrate(2349) FIXME: This expression is not callable.
                return renderError(error);
            }
            return react_1.default.createElement(ErrorMessage, null);
        }
        return react_1.default.createElement(exports.ErrorBoundaryContext.Provider, { value: this }, children);
    }
}
ErrorBoundary.defaultProps = {
    children: null,
    renderError: null,
};
exports.default = ErrorBoundary;
