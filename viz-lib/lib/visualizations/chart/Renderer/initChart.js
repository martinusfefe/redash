"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = initChart;
const lodash_1 = require("lodash");
const resizeObserver_1 = __importDefault(require("@/services/resizeObserver"));
const plotly_1 = require("../plotly");
const value_format_1 = require("@/lib/value-format");
const navigateToUrl = (url, shouldOpenNewTab = true) => shouldOpenNewTab
    ? window.open(url, "_blank")
    : window.location.href = url;
function createErrorHandler(errorHandler) {
    return (error) => {
        // This error happens only when chart width is 20px and looks that
        // it's safe to just ignore it: 1px less or more and chart will get fixed.
        if ((0, lodash_1.isString)(error) && (0, lodash_1.startsWith)(error, "ax.dtick error")) {
            return;
        }
        errorHandler(error);
    };
}
// This utility is intended to reduce amount of plot updates when multiple Plotly.relayout
// calls needed in order to compute/update the plot.
// `.append()` method takes an array of two element: first one is a object with updates for layout,
// and second is an optional function that will be called when plot is updated. That function may
// return an array with same structure if further updates needed.
// `.process()` merges all updates into a single object and calls `Plotly.relayout()`. After that
// it calls all callbacks, collects their return values and does another loop if needed.
function initPlotUpdater() {
    let actions = [];
    const updater = {
        append(action) {
            if ((0, lodash_1.isArray)(action) && (0, lodash_1.isObject)(action[0])) {
                actions.push(action);
            }
            return updater;
        },
        // @ts-expect-error ts-migrate(7023) FIXME: 'process' implicitly has return type 'any' because... Remove this comment to see the full error message
        process(plotlyElement) {
            if (actions.length > 0) {
                const updates = (0, lodash_1.reduce)(actions, (updates, action) => (0, lodash_1.merge)(updates, action[0]), {});
                const handlers = (0, lodash_1.map)(actions, action => ((0, lodash_1.isFunction)(action[1]) ? action[1] : () => null));
                actions = [];
                return plotly_1.Plotly.relayout(plotlyElement, updates).then(() => {
                    (0, lodash_1.each)(handlers, handler => updater.append(handler()));
                    return updater.process(plotlyElement);
                });
            }
            else {
                return Promise.resolve();
            }
        },
    };
    return updater;
}
function initChart(container, options, data, additionalOptions, onError) {
    const handleError = createErrorHandler(onError);
    const plotlyOptions = {
        showLink: false,
        displaylogo: false,
    };
    if (additionalOptions.hidePlotlyModeBar) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'displayModeBar' does not exist on type '... Remove this comment to see the full error message
        plotlyOptions.displayModeBar = false;
    }
    const plotlyData = (0, plotly_1.prepareData)(data, options);
    const plotlyLayout = (0, plotly_1.prepareLayout)(container, options, plotlyData);
    let isDestroyed = false;
    let updater = initPlotUpdater();
    function createSafeFunction(fn) {
        // @ts-expect-error ts-migrate(7019) FIXME: Rest parameter 'args' implicitly has an 'any[]' ty... Remove this comment to see the full error message
        return (...args) => {
            if (!isDestroyed) {
                try {
                    return fn(...args);
                }
                catch (error) {
                    handleError(error);
                }
            }
        };
    }
    let unwatchResize = () => { };
    const promise = Promise.resolve()
        .then(() => plotly_1.Plotly.newPlot(container, plotlyData, plotlyLayout, plotlyOptions))
        .then(createSafeFunction(() => updater
        .append((0, plotly_1.updateAxes)(container, plotlyData, plotlyLayout, options))
        .append((0, plotly_1.updateChartSize)(container, plotlyLayout, options))
        .process(container)))
        .then(createSafeFunction(() => {
        container.on("plotly_restyle", createSafeFunction((updates) => {
            // This event is triggered if some plotly data/layout has changed.
            // We need to catch only changes of traces visibility to update stacking
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'visible' does not exist on type 'object'... Remove this comment to see the full error message
            if ((0, lodash_1.isArray)(updates) && (0, lodash_1.isObject)(updates[0]) && updates[0].visible) {
                (0, plotly_1.updateData)(plotlyData, options);
                updater.append((0, plotly_1.updateAxes)(container, plotlyData, plotlyLayout, options)).process(container);
            }
        }));
        options.onHover && container.on("plotly_hover", options.onHover);
        options.onUnHover && container.on("plotly_unhover", options.onUnHover);
        container.on('plotly_click', createSafeFunction((data) => {
            if (options.enableLink === true) {
                try {
                    var templateValues = {};
                    data.points.forEach((point, i) => {
                        var _a, _b, _c, _d, _e, _f;
                        var sourceDataElement = (_f = (_e = (_d = [...(_b = (_a = point.data) === null || _a === void 0 ? void 0 : _a.sourceData) === null || _b === void 0 ? void 0 : _b.entries()][(_c = point.pointNumber) !== null && _c !== void 0 ? _c : 0]) === null || _d === void 0 ? void 0 : _d[1]) === null || _e === void 0 ? void 0 : _e.row) !== null && _f !== void 0 ? _f : {};
                        if ((0, lodash_1.isNil)(templateValues['@@x']))
                            templateValues['@@x'] = sourceDataElement.x;
                        if ((0, lodash_1.isNil)(templateValues['@@y']))
                            templateValues['@@y'] = sourceDataElement.y;
                        templateValues[`@@y${i + 1}`] = sourceDataElement.y;
                        templateValues[`@@x${i + 1}`] = sourceDataElement.x;
                    });
                    navigateToUrl((0, value_format_1.formatSimpleTemplate)(options.linkFormat, templateValues).replace(/{{\s*([^\s]+?)\s*}}/g, () => ''), options.linkOpenNewTab);
                }
                catch (error) {
                    console.error('Click error: [%s]', error.message, { error });
                }
            }
        }));
        unwatchResize = (0, resizeObserver_1.default)(container, createSafeFunction(() => {
            updater.append((0, plotly_1.updateChartSize)(container, plotlyLayout, options)).process(container);
        }));
    }))
        .catch(handleError);
    // @ts-expect-error ts-migrate(7022) FIXME: 'result' implicitly has type 'any' because it does... Remove this comment to see the full error message
    const result = {
        initialized: promise.then(() => result),
        setZoomEnabled: createSafeFunction((allowZoom) => {
            const layoutUpdates = { dragmode: allowZoom ? "zoom" : false };
            // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{ dragmode: string | boolean; }'... Remove this comment to see the full error message
            return plotly_1.Plotly.relayout(container, layoutUpdates);
        }),
        destroy: createSafeFunction(() => {
            isDestroyed = true;
            container.removeAllListeners("plotly_restyle");
            unwatchResize();
            delete container.__previousSize; // added by `updateChartSize`
            plotly_1.Plotly.purge(container);
        }),
    };
    return result;
}
