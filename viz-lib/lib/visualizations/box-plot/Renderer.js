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
exports.default = Renderer;
const lodash_1 = require("lodash");
const d3_1 = __importDefault(require("d3"));
const react_1 = __importStar(require("react"));
const resizeObserver_1 = __importDefault(require("@/services/resizeObserver"));
const prop_types_1 = require("@/visualizations/prop-types");
const d3box_1 = __importDefault(require("./d3box"));
require("./renderer.less");
function calcIqr(k) {
    return (d) => {
        const q1 = d.quartiles[0];
        const q3 = d.quartiles[2];
        const iqr = (q3 - q1) * k;
        let i = -1;
        let j = d.length;
        i += 1;
        while (d[i] < q1 - iqr) {
            i += 1;
        }
        j -= 1;
        while (d[j] > q3 + iqr) {
            j -= 1;
        }
        return [i, j];
    };
}
function render(container, data, { xAxisLabel, yAxisLabel }) {
    container = d3_1.default.select(container);
    const containerBounds = container.node().getBoundingClientRect();
    const containerWidth = Math.floor(containerBounds.width);
    const containerHeight = Math.floor(containerBounds.height);
    const margin = {
        top: 10,
        right: 50,
        bottom: 40,
        left: 50,
        inner: 25,
    };
    const width = containerWidth - margin.right - margin.left;
    const height = containerHeight - margin.top - margin.bottom;
    let min = Infinity;
    let max = -Infinity;
    const mydata = [];
    let value = 0;
    let d = [];
    const columns = (0, lodash_1.map)(data.columns, col => col.name);
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'scale' does not exist on type 'typeof im... Remove this comment to see the full error message
    const xscale = d3_1.default.scale
        .ordinal()
        .domain(columns)
        .rangeBands([0, containerWidth - margin.left - margin.right]);
    let boxWidth;
    if (columns.length > 1) {
        boxWidth = Math.min(xscale(columns[1]), 120.0);
    }
    else {
        boxWidth = 120.0;
    }
    margin.inner = boxWidth / 3.0;
    (0, lodash_1.each)(columns, (column, i) => {
        d = mydata[i] = [];
        (0, lodash_1.each)(data.rows, row => {
            value = row[column];
            d.push(value);
            if (value > max)
                max = Math.ceil(value);
            if (value < min)
                min = Math.floor(value);
        });
    });
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'scale' does not exist on type 'typeof im... Remove this comment to see the full error message
    const yscale = d3_1.default.scale
        .linear()
        .domain([min * 0.99, max * 1.01])
        .range([height, 0]);
    const chart = (0, d3box_1.default)()
        .whiskers(calcIqr(1.5))
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'width' does not exist on type '{ (g: any... Remove this comment to see the full error message
        .width(boxWidth - 2 * margin.inner)
        .height(height)
        .domain([min * 0.99, max * 1.01]);
    const xAxis = d3_1.default.svg
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'axis' does not exist on type '(url: stri... Remove this comment to see the full error message
        .axis()
        .scale(xscale)
        .orient("bottom");
    const yAxis = d3_1.default.svg
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'axis' does not exist on type '(url: stri... Remove this comment to see the full error message
        .axis()
        .scale(yscale)
        .orient("left");
    const xLines = d3_1.default.svg
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'axis' does not exist on type '(url: stri... Remove this comment to see the full error message
        .axis()
        .scale(xscale)
        .tickSize(height)
        .orient("bottom");
    const yLines = d3_1.default.svg
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'axis' does not exist on type '(url: stri... Remove this comment to see the full error message
        .axis()
        .scale(yscale)
        .tickSize(width)
        .orient("right");
    function barOffset(i) {
        return xscale(columns[i]) + (xscale(columns[1]) - margin.inner) / 2.0;
    }
    container.selectAll("*").remove();
    const svg = container
        .append("svg")
        .attr("width", containerWidth)
        .attr("height", height + margin.bottom + margin.top);
    const plot = svg
        .append("g")
        .attr("width", containerWidth - margin.left - margin.right)
        .attr("transform", `translate(${margin.left},${margin.top})`);
    svg
        .append("text")
        .attr("class", "box")
        .attr("x", containerWidth / 2.0)
        .attr("text-anchor", "middle")
        .attr("y", height + margin.bottom)
        .text(xAxisLabel);
    svg
        .append("text")
        .attr("class", "box")
        .attr("transform", `translate(10,${(height + margin.top + margin.bottom) / 2.0})rotate(-90)`)
        .attr("text-anchor", "middle")
        .text(yAxisLabel);
    plot
        .append("rect")
        .attr("class", "grid-background")
        .attr("width", width)
        .attr("height", height);
    plot
        .append("g")
        .attr("class", "grid")
        .call(yLines);
    plot
        .append("g")
        .attr("class", "grid")
        .call(xLines);
    plot
        .append("g")
        .attr("class", "x axis")
        .attr("transform", `translate(0,${height})`)
        .call(xAxis);
    plot
        .append("g")
        .attr("class", "y axis")
        .call(yAxis);
    plot
        .selectAll(".box")
        .data(mydata)
        .enter()
        .append("g")
        .attr("class", "box")
        .attr("width", boxWidth)
        .attr("height", height)
        .attr("transform", (_, i) => `translate(${barOffset(i)},${0})`)
        .call(chart);
}
function Renderer({ data, options }) {
    const [container, setContainer] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        if (container) {
            render(container, data, options);
            const unwatch = (0, resizeObserver_1.default)(container, () => {
                render(container, data, options);
            });
            return unwatch;
        }
    }, [container, data, options]);
    // @ts-expect-error ts-migrate(2322) FIXME: Type 'Dispatch<SetStateAction<null>>' is not assig... Remove this comment to see the full error message
    return react_1.default.createElement("div", { className: "box-plot-deprecated-visualization-container", ref: setContainer });
}
Renderer.propTypes = prop_types_1.RendererPropTypes;
