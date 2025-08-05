"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getOptions_1 = __importDefault(require("./getOptions"));
const Renderer_1 = __importDefault(require("./Renderer"));
const Editor_1 = __importDefault(require("./Editor"));
exports.default = {
    type: "TABLE",
    name: "Table",
    getOptions: getOptions_1.default,
    Renderer: Renderer_1.default,
    Editor: Editor_1.default,
    autoHeight: true,
    defaultRows: 14,
    defaultColumns: 6,
    minColumns: 2,
};
