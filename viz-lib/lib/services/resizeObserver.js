"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = observe;
const items = new Map();
function checkItems() {
    if (items.size > 0) {
        items.forEach((item, node) => {
            const bounds = node.getBoundingClientRect();
            // convert to int (because these numbers needed for comparisons), but preserve 1 decimal point
            const width = Math.round(bounds.width * 10);
            const height = Math.round(bounds.height * 10);
            if (item.width !== width || item.height !== height) {
                item.width = width;
                item.height = height;
                item.callback(node);
            }
        });
        setTimeout(checkItems, 100);
    }
}
function observe(node, callback) {
    if (node && !items.has(node)) {
        const shouldTrigger = items.size === 0;
        items.set(node, { callback });
        if (shouldTrigger) {
            checkItems();
        }
        return () => items.delete(node);
    }
    return () => { };
}
