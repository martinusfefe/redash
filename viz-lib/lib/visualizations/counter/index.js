"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Renderer_1 = __importDefault(require("./Renderer"));
const Editor_1 = __importDefault(require("./Editor"));
const DEFAULT_OPTIONS = {
    counterLabel: "",
    counterColName: "counter",
    rowNumber: 1,
    targetRowNumber: 1,
    stringDecimal: 0,
    stringDecChar: ".",
    stringThouSep: ",",
    tooltipFormat: "0,0.000", // TODO: Show in editor
};
exports.default = {
    type: "COUNTER",
    name: "Counter",
    getOptions: (options) => ({
        ...DEFAULT_OPTIONS,
        ...options,
    }),
    Renderer: Renderer_1.default,
    Editor: Editor_1.default,
    defaultColumns: 4,
    defaultRows: 5,
};
