"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useMemoWithDeepCompare;
const lodash_1 = require("lodash");
const react_1 = require("react");
function useMemoWithDeepCompare(create, inputs) {
    const valueRef = (0, react_1.useRef)();
    const value = (0, react_1.useMemo)(create, inputs);
    if (!(0, lodash_1.isEqual)(value, valueRef.current)) {
        // @ts-expect-error ts-migrate(2322) FIXME: Type 'unknown' is not assignable to type 'undefine... Remove this comment to see the full error message
        valueRef.current = value;
    }
    return valueRef.current;
}
