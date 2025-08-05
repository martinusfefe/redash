"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable react/prop-types */
const react_1 = __importDefault(require("react"));
const createTabbedEditor_1 = __importDefault(require("@/components/visualizations/editor/createTabbedEditor"));
const GeneralSettings_1 = __importDefault(require("./GeneralSettings"));
const XAxisSettings_1 = __importDefault(require("./XAxisSettings"));
const YAxisSettings_1 = __importDefault(require("./YAxisSettings"));
const SeriesSettings_1 = __importDefault(require("./SeriesSettings"));
const ColorsSettings_1 = __importDefault(require("./ColorsSettings"));
const DataLabelsSettings_1 = __importDefault(require("./DataLabelsSettings"));
const CustomChartSettings_1 = __importDefault(require("./CustomChartSettings"));
require("./editor.less");
const isCustomChart = (options) => options.globalSeriesType === "custom";
const isPieChart = (options) => options.globalSeriesType === "pie";
exports.default = (0, createTabbedEditor_1.default)([
    {
        key: "General",
        title: "General",
        component: (props) => (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(GeneralSettings_1.default, { ...props }),
            isCustomChart(props.options) && react_1.default.createElement(CustomChartSettings_1.default, { ...props }))),
    },
    {
        key: "XAxis",
        title: ({ swappedAxes }) => (!swappedAxes ? "X Axis" : "Y Axis"),
        component: XAxisSettings_1.default,
        isAvailable: (options) => !isCustomChart(options) && !isPieChart(options),
    },
    {
        key: "YAxis",
        title: ({ swappedAxes }) => (!swappedAxes ? "Y Axis" : "X Axis"),
        component: YAxisSettings_1.default,
        isAvailable: (options) => !isCustomChart(options) && !isPieChart(options),
    },
    {
        key: "Series",
        title: "Series",
        component: SeriesSettings_1.default,
        isAvailable: (options) => !isCustomChart(options),
    },
    {
        key: "Colors",
        title: "Colors",
        component: ColorsSettings_1.default,
        isAvailable: (options) => !isCustomChart(options),
    },
    {
        key: "DataLabels",
        title: "Data Labels",
        component: DataLabelsSettings_1.default,
        isAvailable: (options) => !isCustomChart(options),
    },
]);
