import { isArray, isObject, isString, isFunction, startsWith, reduce, merge, map, each, isNil } from "lodash";
import resizeObserver from "../../../services/resizeObserver";
import { Plotly, prepareData, prepareLayout, updateData, updateAxes, updateChartSize } from "../plotly";
import { formatSimpleTemplate } from "../../../lib/value-format";
var navigateToUrl = function navigateToUrl(url) {
  var shouldOpenNewTab = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  return shouldOpenNewTab ? window.open(url, "_blank") : window.location.href = url;
};
function createErrorHandler(errorHandler) {
  return error => {
    // This error happens only when chart width is 20px and looks that
    // it's safe to just ignore it: 1px less or more and chart will get fixed.
    if (isString(error) && startsWith(error, "ax.dtick error")) {
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
  var actions = [];
  var updater = {
    append(action) {
      if (isArray(action) && isObject(action[0])) {
        actions.push(action);
      }
      return updater;
    },
    // @ts-expect-error ts-migrate(7023) FIXME: 'process' implicitly has return type 'any' because... Remove this comment to see the full error message
    process(plotlyElement) {
      if (actions.length > 0) {
        var updates = reduce(actions, (updates, action) => merge(updates, action[0]), {});
        var handlers = map(actions, action => isFunction(action[1]) ? action[1] : () => null);
        actions = [];
        return Plotly.relayout(plotlyElement, updates).then(() => {
          each(handlers, handler => updater.append(handler()));
          return updater.process(plotlyElement);
        });
      } else {
        return Promise.resolve();
      }
    }
  };
  return updater;
}
export default function initChart(container, options, data, additionalOptions, onError) {
  var handleError = createErrorHandler(onError);
  var plotlyOptions = {
    showLink: false,
    displaylogo: false
  };
  if (additionalOptions.hidePlotlyModeBar) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'displayModeBar' does not exist on type '... Remove this comment to see the full error message
    plotlyOptions.displayModeBar = false;
  }
  var plotlyData = prepareData(data, options);
  var plotlyLayout = prepareLayout(container, options, plotlyData);
  var isDestroyed = false;
  var updater = initPlotUpdater();
  function createSafeFunction(fn) {
    // @ts-expect-error ts-migrate(7019) FIXME: Rest parameter 'args' implicitly has an 'any[]' ty... Remove this comment to see the full error message
    return function () {
      if (!isDestroyed) {
        try {
          return fn(...arguments);
        } catch (error) {
          handleError(error);
        }
      }
    };
  }
  var unwatchResize = () => {};
  var promise = Promise.resolve().then(() => Plotly.newPlot(container, plotlyData, plotlyLayout, plotlyOptions)).then(createSafeFunction(() => updater.append(updateAxes(container, plotlyData, plotlyLayout, options)).append(updateChartSize(container, plotlyLayout, options)).process(container))).then(createSafeFunction(() => {
    container.on("plotly_restyle", createSafeFunction(updates => {
      // This event is triggered if some plotly data/layout has changed.
      // We need to catch only changes of traces visibility to update stacking
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'visible' does not exist on type 'object'... Remove this comment to see the full error message
      if (isArray(updates) && isObject(updates[0]) && updates[0].visible) {
        updateData(plotlyData, options);
        updater.append(updateAxes(container, plotlyData, plotlyLayout, options)).process(container);
      }
    }));
    options.onHover && container.on("plotly_hover", options.onHover);
    options.onUnHover && container.on("plotly_unhover", options.onUnHover);
    container.on('plotly_click', createSafeFunction(data => {
      if (options.enableLink === true) {
        try {
          var templateValues = {};
          data.points.forEach((point, i) => {
            var _$row, _ref, _point$data, _point$pointNumber;
            var sourceDataElement = (_$row = (_ref = [...((_point$data = point.data) === null || _point$data === void 0 || (_point$data = _point$data.sourceData) === null || _point$data === void 0 ? void 0 : _point$data.entries())][(_point$pointNumber = point.pointNumber) !== null && _point$pointNumber !== void 0 ? _point$pointNumber : 0]) === null || _ref === void 0 || (_ref = _ref[1]) === null || _ref === void 0 ? void 0 : _ref.row) !== null && _$row !== void 0 ? _$row : {};
            if (isNil(templateValues['@@x'])) templateValues['@@x'] = sourceDataElement.x;
            if (isNil(templateValues['@@y'])) templateValues['@@y'] = sourceDataElement.y;
            templateValues["@@y".concat(i + 1)] = sourceDataElement.y;
            templateValues["@@x".concat(i + 1)] = sourceDataElement.x;
          });
          navigateToUrl(formatSimpleTemplate(options.linkFormat, templateValues).replace(/{{\s*([^\s]+?)\s*}}/g, () => ''), options.linkOpenNewTab);
        } catch (error) {
          console.error('Click error: [%s]', error.message, {
            error
          });
        }
      }
    }));
    unwatchResize = resizeObserver(container, createSafeFunction(() => {
      updater.append(updateChartSize(container, plotlyLayout, options)).process(container);
    }));
  })).catch(handleError);

  // @ts-expect-error ts-migrate(7022) FIXME: 'result' implicitly has type 'any' because it does... Remove this comment to see the full error message
  var result = {
    initialized: promise.then(() => result),
    setZoomEnabled: createSafeFunction(allowZoom => {
      var layoutUpdates = {
        dragmode: allowZoom ? "zoom" : false
      };
      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{ dragmode: string | boolean; }'... Remove this comment to see the full error message
      return Plotly.relayout(container, layoutUpdates);
    }),
    destroy: createSafeFunction(() => {
      isDestroyed = true;
      container.removeAllListeners("plotly_restyle");
      unwatchResize();
      delete container.__previousSize; // added by `updateChartSize`
      Plotly.purge(container);
    })
  };
  return result;
}
//# sourceMappingURL=initChart.js.map