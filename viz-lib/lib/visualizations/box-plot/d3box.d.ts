declare function box(): {
    (g: any): void;
    width(x: any): number | /*elided*/ any;
    height(x: any): number | /*elided*/ any;
    tickFormat(x: any): any;
    duration(x: any): number | /*elided*/ any;
    domain(x: any): any;
    value(x: any): NumberConstructor | /*elided*/ any;
    whiskers(x: any): typeof boxWhiskers | /*elided*/ any;
    quartiles(x: any): typeof boxQuartiles | /*elided*/ any;
};
declare function boxWhiskers(d: any): number[];
declare function boxQuartiles(d: any): any[];
export default box;
