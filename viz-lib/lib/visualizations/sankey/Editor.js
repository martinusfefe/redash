"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Editor;
const react_1 = __importDefault(require("react"));
function Editor() {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("p", null, "This visualization expects the query result to have rows in the following format:"),
        react_1.default.createElement("ul", null,
            react_1.default.createElement("li", null,
                react_1.default.createElement("strong", null, "stage1"),
                " - stage 1 value"),
            react_1.default.createElement("li", null,
                react_1.default.createElement("strong", null, "stage2"),
                " - stage 2 value (or null)"),
            react_1.default.createElement("li", null,
                react_1.default.createElement("strong", null, "stage3"),
                " - stage 3 value (or null)"),
            react_1.default.createElement("li", null,
                react_1.default.createElement("strong", null, "stage4"),
                " - stage 4 value (or null)"),
            react_1.default.createElement("li", null,
                react_1.default.createElement("strong", null, "stage5"),
                " - stage 5 value (or null)"),
            react_1.default.createElement("li", null,
                react_1.default.createElement("strong", null, "value"),
                " - number of times this sequence occurred"))));
}
