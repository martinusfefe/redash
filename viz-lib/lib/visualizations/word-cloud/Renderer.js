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
const d3_1 = __importDefault(require("d3"));
const d3_cloud_1 = __importDefault(require("d3-cloud"));
const lodash_1 = require("lodash");
const react_1 = __importStar(require("react"));
const resizeObserver_1 = __importDefault(require("../../services/resizeObserver"));
const prop_types_1 = require("../../visualizations/prop-types");
require("./renderer.less");
function computeWordFrequencies(rows, column) {
    const result = {};
    (0, lodash_1.each)(rows, row => {
        const wordsList = (0, lodash_1.toString)(row[column]).split(/\s/g);
        (0, lodash_1.each)(wordsList, d => {
            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            result[d] = (result[d] || 0) + 1;
        });
    });
    return result;
}
function getWordsWithFrequencies(rows, wordColumn, frequencyColumn) {
    const result = {};
    (0, lodash_1.each)(rows, row => {
        const count = parseFloat(row[frequencyColumn]);
        if (Number.isFinite(count) && count > 0) {
            const word = (0, lodash_1.toString)(row[wordColumn]);
            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            result[word] = count;
        }
    });
    return result;
}
function applyLimitsToWords(words, { wordLength, wordCount }) {
    wordLength.min = Number.isFinite(wordLength.min) ? wordLength.min : null;
    wordLength.max = Number.isFinite(wordLength.max) ? wordLength.max : null;
    wordCount.min = Number.isFinite(wordCount.min) ? wordCount.min : null;
    wordCount.max = Number.isFinite(wordCount.max) ? wordCount.max : null;
    return (0, lodash_1.filter)(words, ({ text, count }) => {
        const wordLengthFits = (!wordLength.min || text.length >= wordLength.min) && (!wordLength.max || text.length <= wordLength.max);
        const wordCountFits = (!wordCount.min || count >= wordCount.min) && (!wordCount.max || count <= wordCount.max);
        return wordLengthFits && wordCountFits;
    });
}
function prepareWords(rows, options) {
    let result = [];
    if (options.column) {
        if (options.frequenciesColumn) {
            result = getWordsWithFrequencies(rows, options.column, options.frequenciesColumn);
        }
        else {
            result = computeWordFrequencies(rows, options.column);
        }
        result = (0, lodash_1.sortBy)((0, lodash_1.map)(result, (count, text) => ({ text, count })), [({ count }) => -count, ({ text }) => -text.length] // "count" desc, length("text") desc
        );
    }
    // Add additional attributes
    const counts = (0, lodash_1.map)(result, item => item.count);
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'scale' does not exist on type 'typeof im... Remove this comment to see the full error message
    const wordSize = d3_1.default.scale
        .linear()
        .domain([(0, lodash_1.min)(counts), (0, lodash_1.max)(counts)])
        .range([10, 100]); // min/max word size
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'scale' does not exist on type 'typeof im... Remove this comment to see the full error message
    const color = d3_1.default.scale.category20();
    (0, lodash_1.each)(result, (item, index) => {
        item.size = wordSize(item.count);
        item.color = color(index);
        // @ts-expect-error ts-migrate(2362) FIXME: The left-hand side of an arithmetic operation must... Remove this comment to see the full error message
        item.angle = (index % 2) * 90; // make it stable between renderings
    });
    return applyLimitsToWords(result, {
        wordLength: options.wordLengthLimit,
        wordCount: options.wordCountLimit,
    });
}
function scaleElement(node, container) {
    node.style.transform = null;
    const { width: nodeWidth, height: nodeHeight } = node.getBoundingClientRect();
    const { width: containerWidth, height: containerHeight } = container.getBoundingClientRect();
    const scaleX = containerWidth / nodeWidth;
    const scaleY = containerHeight / nodeHeight;
    node.style.transform = `scale(${Math.min(scaleX, scaleY)})`;
}
function createLayout() {
    const fontFamily = window.getComputedStyle(document.body).fontFamily;
    return (
    // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
    (0, d3_cloud_1.default)()
        // make the area large enough to contain even very long words; word cloud will be placed in the center of the area
        // TODO: dimensions probably should be larger, but `d3-cloud` has some performance issues related to these values
        .size([5000, 5000])
        .padding(3)
        .font(fontFamily)
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'angle' does not exist on type 'Word'.
        .rotate(d => d.angle)
        .fontSize(d => d.size)
        .random(() => 0.5)); // do not place words randomly - use compact layout
}
function render(container, words) {
    container = d3_1.default.select(container);
    container.selectAll("*").remove();
    const svg = container.append("svg");
    const g = svg.append("g");
    g.selectAll("text")
        .data(words)
        .enter()
        .append("text")
        .style("font-size", (d) => `${d.size}px`)
        .style("font-family", (d) => d.font)
        .style("fill", (d) => d.color)
        .attr("text-anchor", "middle")
        .attr("transform", (d) => `translate(${[d.x, d.y]}) rotate(${d.rotate})`)
        .text((d) => d.text);
    const svgBounds = svg.node().getBoundingClientRect();
    const gBounds = g.node().getBoundingClientRect();
    svg.attr("width", Math.ceil(gBounds.width)).attr("height", Math.ceil(gBounds.height));
    g.attr("transform", `translate(${svgBounds.left - gBounds.left},${svgBounds.top - gBounds.top})`);
    scaleElement(svg.node(), container.node());
}
function Renderer({ data, options }) {
    const [container, setContainer] = (0, react_1.useState)(null);
    const [words, setWords] = (0, react_1.useState)([]);
    const layout = (0, react_1.useMemo)(createLayout, []);
    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '() => () => layout.Cloud<cloud.W... Remove this comment to see the full error message
    (0, react_1.useEffect)(() => {
        layout
            .words(prepareWords(data.rows, options))
            // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'Word[]' is not assignable to par... Remove this comment to see the full error message
            .on("end", w => setWords(w))
            .start();
        // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
        return () => layout.on("end", null).stop();
    }, [layout, data, options, setWords]);
    (0, react_1.useEffect)(() => {
        if (container) {
            render(container, words);
        }
    }, [container, words]);
    (0, react_1.useEffect)(() => {
        if (container) {
            const unwatch = (0, resizeObserver_1.default)(container, () => {
                // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
                const svg = container.querySelector("svg");
                if (svg) {
                    scaleElement(svg, container);
                }
            });
            return unwatch;
        }
    }, [container]);
    // @ts-expect-error ts-migrate(2322) FIXME: Type 'Dispatch<SetStateAction<null>>' is not assig... Remove this comment to see the full error message
    return react_1.default.createElement("div", { className: "word-cloud-visualization-container", ref: setContainer });
}
Renderer.propTypes = prop_types_1.RendererPropTypes;
