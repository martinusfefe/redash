"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Renderer_1 = __importDefault(require("./Renderer"));
const Editor_1 = __importDefault(require("./Editor"));
exports.default = {
    type: "BOXPLOT",
    name: "Boxplot (Deprecated)",
    isDeprecated: true,
    getOptions: (options) => ({
        ...options,
    }),
    Renderer: Renderer_1.default,
    Editor: Editor_1.default,
    defaultRows: 8,
    minRows: 5,
};
