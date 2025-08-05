"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DetailsRenderer_1 = __importDefault(require("./DetailsRenderer"));
const DEFAULT_OPTIONS = {};
exports.default = {
    type: "DETAILS",
    name: "Details View",
    getOptions: (options) => ({
        ...DEFAULT_OPTIONS,
        ...options,
    }),
    Renderer: DetailsRenderer_1.default,
    defaultColumns: 4,
    defaultRows: 2,
};
