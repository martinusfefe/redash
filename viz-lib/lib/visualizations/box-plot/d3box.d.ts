declare function box(): {
    (g: any): void;
    width(x: any): number | /*elided*/ any;
    height(x: any): number | /*elided*/ any;
    tickFormat(x: any): any;
    duration(x: any): number | /*elided*/ any;
    domain(x: any): any;
    value(x: any): /*elided*/ any | NumberConstructor;
    whiskers(x: any): /*elided*/ any | typeof boxWhiskers;
    quartiles(x: any): /*elided*/ any | typeof boxQuartiles;
};
declare function boxWhiskers(d: any): number[];
declare function boxQuartiles(d: any): any[];
export default box;
