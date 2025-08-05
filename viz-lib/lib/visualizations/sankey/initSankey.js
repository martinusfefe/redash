"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = initSankey;
const lodash_1 = require("lodash");
const d3_1 = __importDefault(require("d3"));
const d3sankey_1 = __importDefault(require("./d3sankey"));
function getConnectedNodes(node) {
    console.log(node);
    // source link = this node is the source, I need the targets
    const nodes = [];
    node.sourceLinks.forEach((link) => {
        nodes.push(link.target);
    });
    node.targetLinks.forEach((link) => {
        nodes.push(link.source);
    });
    return nodes;
}
function graph(data) {
    const nodesDict = {};
    const links = {};
    const nodes = [];
    const validKey = (key) => key !== "value";
    // @ts-expect-error
    const dataKeys = (0, lodash_1.sortBy)((0, lodash_1.filter)((0, lodash_1.keys)(data[0]), validKey), lodash_1.identity);
    function normalizeName(name) {
        if (!(0, lodash_1.isNil)(name)) {
            return "" + name;
        }
        return "Exit";
    }
    function getNode(name, level) {
        name = normalizeName(name);
        const key = `${name}:${String(level)}`;
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        let node = nodesDict[key];
        if (!node) {
            node = { name };
            node.id = nodes.push(node) - 1;
            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            nodesDict[key] = node;
        }
        return node;
    }
    function getLink(source, target) {
        // @ts-expect-error ts-migrate(2538) FIXME: Type 'any[]' cannot be used as an index type.
        let link = links[[source, target]];
        if (!link) {
            link = { target, source, value: 0 };
            // @ts-expect-error ts-migrate(2538) FIXME: Type 'any[]' cannot be used as an index type.
            links[[source, target]] = link;
        }
        return link;
    }
    function addLink(sourceName, targetName, value, depth) {
        if ((sourceName === "" || !sourceName) && depth > 1) {
            return;
        }
        const source = getNode(sourceName, depth);
        const target = getNode(targetName, depth + 1);
        const link = getLink(source.id, target.id);
        link.value += parseInt(value, 10);
    }
    // @ts-expect-error
    data.forEach((row) => {
        addLink(row[dataKeys[0]], row[dataKeys[1]], row.value || 0, 1);
        addLink(row[dataKeys[1]], row[dataKeys[2]], row.value || 0, 2);
        addLink(row[dataKeys[2]], row[dataKeys[3]], row.value || 0, 3);
        addLink(row[dataKeys[3]], row[dataKeys[4]], row.value || 0, 4);
        addLink(row[dataKeys[4]], null, row.value || 0, 5); // this line ensures that the last stage has a corresponding exit node
    });
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'scale' does not exist on type 'typeof im... Remove this comment to see the full error message
    const color = d3_1.default.scale.category20();
    return {
        nodes: (0, lodash_1.map)(nodes, d => (0, lodash_1.extend)(d, { color: color(d.name.replace(/ .*/, "")) })),
        links: (0, lodash_1.values)(links),
    };
}
function spreadNodes(height, data) {
    const nodesByBreadth = d3_1.default
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'nest' does not exist on type 'typeof imp... Remove this comment to see the full error message
        .nest()
        .key((d) => d.x)
        .entries(data.nodes)
        // @ts-expect-error
        .map((d) => d.values);
    nodesByBreadth.forEach((nodes) => {
        nodes = (0, lodash_1.filter)((0, lodash_1.sortBy)(nodes, node => -node.value), node => node.name !== "Exit");
        // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
        const sum = d3_1.default.sum(nodes, o => o.dy);
        const padding = (height - sum) / nodes.length;
        (0, lodash_1.reduce)(nodes, (y0, node) => {
            node.y = y0;
            return y0 + node.dy + padding;
        }, 0);
    });
}
function isDataValid(data) {
    // data should contain column named 'value', otherwise no reason to render anything at all
    if (!data || !(0, lodash_1.find)(data.columns, c => c.name === "value")) {
        return false;
    }
    // prepareData will have coerced any invalid data rows into NaN, which is verified below
    return (0, lodash_1.every)(data.rows, row => (0, lodash_1.every)(row, v => {
        if (!v || (0, lodash_1.isString)(v)) {
            return true;
        }
        return isFinite(v);
    }));
}
// will coerce number strings into valid numbers
function prepareDataRows(rows) {
    return (0, lodash_1.map)(rows, row => (0, lodash_1.mapValues)(row, v => {
        if (!v || (0, lodash_1.isNumber)(v)) {
            return v;
        }
        return (0, lodash_1.isNaN)(parseFloat(v)) ? v : parseFloat(v);
    }));
}
function initSankey(data) {
    data.rows = prepareDataRows(data.rows);
    if (!isDataValid(data)) {
        return (element) => {
            d3_1.default.select(element)
                .selectAll("*")
                .remove();
        };
    }
    data = graph(data.rows);
    // @ts-expect-error
    const format = (d) => d3_1.default.format(",.0f")(d); // TODO: editor option ?
    return (element) => {
        d3_1.default.select(element)
            .selectAll("*")
            .remove();
        const margin = {
            top: 10,
            right: 10,
            bottom: 10,
            left: 10,
        };
        const width = element.offsetWidth - margin.left - margin.right;
        const height = element.offsetHeight - margin.top - margin.bottom;
        if (width <= 0 || height <= 0) {
            return;
        }
        // append the svg canvas to the page
        const svg = d3_1.default
            .select(element)
            .append("svg")
            .attr("class", "sankey")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);
        // Set the sankey diagram properties
        const sankey = (0, d3sankey_1.default)()
            .nodeWidth(15)
            .nodePadding(10)
            .size([width, height]);
        const path = sankey.link();
        sankey
            .nodes(data.nodes)
            .links(data.links)
            .layout(0);
        spreadNodes(height, data);
        sankey.relayout();
        // add in the links
        const link = svg
            .append("g")
            .selectAll(".link")
            .data(data.links)
            .enter()
            .append("path")
            .filter(l => l.target.name !== "Exit")
            .attr("class", "link")
            .attr("d", path)
            .style("stroke-width", d => Math.max(1, d.dy))
            .sort((a, b) => b.dy - a.dy);
        // add the link titles
        link.append("title").text(d => `${d.source.name} → ${d.target.name}\n${format(d.value)}`);
        const node = svg
            .append("g")
            .selectAll(".node")
            .data(data.nodes)
            .enter()
            .append("g")
            .filter(n => n.name !== "Exit")
            .attr("class", "node")
            .attr("transform", (d) => `translate(${d.x},${d.y})`);
        function nodeMouseOver(currentNode) {
            let nodes = getConnectedNodes(currentNode);
            nodes = (0, lodash_1.map)(nodes, i => i.id);
            node
                .filter(d => {
                if (d === currentNode) {
                    return false;
                }
                return !(0, lodash_1.includes)(nodes, d.id);
            })
                .style("opacity", 0.2);
            link
                .filter(l => !((0, lodash_1.includes)(currentNode.sourceLinks, l) || (0, lodash_1.includes)(currentNode.targetLinks, l)))
                .style("opacity", 0.2);
        }
        function nodeMouseOut() {
            node.style("opacity", 1);
            link.style("opacity", 1);
        }
        // add in the nodes
        node.on("mouseover", nodeMouseOver).on("mouseout", nodeMouseOut);
        // add the rectangles for the nodes
        // FIXME: d is DType, but d3 will not accept a nonstandard function
        node
            .append("rect")
            .attr("height", (d) => d.dy)
            .attr("width", sankey.nodeWidth())
            .style("fill", (d) => d.color)
            // @ts-expect-error
            .style("stroke", (d) => d3_1.default.rgb(d.color).darker(2))
            .append("title")
            .text((d) => `${d.name}\n${format(d.value)}`);
        // add in the title for the nodes
        node
            .append("text")
            .attr("x", -6)
            .attr("y", (d) => d.dy / 2)
            .attr("dy", ".35em")
            .attr("text-anchor", "end")
            .attr("transform", null)
            .text((d) => d.name)
            .filter((d) => d.x < width / 2)
            .attr("x", 6 + sankey.nodeWidth())
            .attr("text-anchor", "start");
    };
}
