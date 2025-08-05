"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const Renderer_1 = __importDefault(require("./Renderer"));
const Editor_1 = __importDefault(require("./Editor"));
const DEFAULT_OPTIONS = {
    column: "",
    frequenciesColumn: "",
    wordLengthLimit: { min: null, max: null },
    wordCountLimit: { min: null, max: null },
};
exports.default = {
    type: "WORD_CLOUD",
    name: "Word Cloud",
    getOptions: (options) => (0, lodash_1.merge)({}, DEFAULT_OPTIONS, options),
    Renderer: Renderer_1.default,
    Editor: Editor_1.default,
    defaultRows: 8,
};
