"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const text_1 = __importDefault(require("./text"));
const number_1 = __importDefault(require("./number"));
const datetime_1 = __importDefault(require("./datetime"));
const boolean_1 = __importDefault(require("./boolean"));
const link_1 = __importDefault(require("./link"));
const image_1 = __importDefault(require("./image"));
const json_1 = __importDefault(require("./json"));
// this map should contain all possible values for `column.displayAs` property
exports.default = {
    string: text_1.default,
    number: number_1.default,
    datetime: datetime_1.default,
    boolean: boolean_1.default,
    link: link_1.default,
    image: image_1.default,
    json: json_1.default,
};
