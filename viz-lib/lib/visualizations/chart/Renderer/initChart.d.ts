export default function initChart(container: any, options: any, data: any, additionalOptions: any, onError: any): {
    initialized: Promise<any>;
    setZoomEnabled: (...args: any[]) => any;
    destroy: (...args: any[]) => any;
};
