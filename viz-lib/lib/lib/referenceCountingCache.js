"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createReferenceCountingCache;
const lodash_1 = require("lodash");
function createReferenceCountingCache({ cleanupDelay = 2000 } = {}) {
    const items = {};
    const cleanup = (0, lodash_1.debounce)(() => {
        (0, lodash_1.each)(items, (item, key) => {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'refCount' does not exist on type 'never'... Remove this comment to see the full error message
            if (item.refCount <= 0) {
                // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                delete items[key];
            }
        });
    }, cleanupDelay);
    function get(key, getter) {
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        if (!items[key]) {
            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            items[key] = {
                value: getter(),
                refCount: 0,
            };
        }
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        const item = items[key];
        item.refCount += 1;
        return item.value;
    }
    function release(key) {
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        if (items[key]) {
            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            const item = items[key];
            if (item.refCount > 0) {
                item.refCount -= 1;
                if (item.refCount <= 0) {
                    cleanup();
                }
            }
        }
    }
    return { get, release };
}
