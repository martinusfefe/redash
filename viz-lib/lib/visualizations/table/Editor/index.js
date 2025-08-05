"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const createTabbedEditor_1 = __importDefault(require("@/components/visualizations/editor/createTabbedEditor"));
const ColumnsSettings_1 = __importDefault(require("./ColumnsSettings"));
const GridSettings_1 = __importDefault(require("./GridSettings"));
require("./editor.less");
exports.default = (0, createTabbedEditor_1.default)([
    { key: "Columns", title: "Columns", component: ColumnsSettings_1.default },
    { key: "Grid", title: "Grid", component: GridSettings_1.default },
]);
