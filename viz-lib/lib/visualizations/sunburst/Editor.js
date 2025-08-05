"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Editor;
const react_1 = __importDefault(require("react"));
const editor_1 = require("@/components/visualizations/editor");
function Editor() {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("p", null, "This visualization expects the query result to have rows in one of the following formats:"),
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement("p", null,
                react_1.default.createElement("strong", null, "Option 1:")),
            react_1.default.createElement("ul", null,
                react_1.default.createElement("li", null,
                    react_1.default.createElement("strong", null, "sequence"),
                    " - sequence id"),
                react_1.default.createElement("li", null,
                    react_1.default.createElement("strong", null, "stage"),
                    " - what stage in sequence this is (1, 2, ...)"),
                react_1.default.createElement("li", null,
                    react_1.default.createElement("strong", null, "node"),
                    " - stage name"),
                react_1.default.createElement("li", null,
                    react_1.default.createElement("strong", null, "value"),
                    " - number of times this sequence occurred"))),
        react_1.default.createElement(editor_1.Section, null,
            react_1.default.createElement("p", null,
                react_1.default.createElement("strong", null, "Option 2:")),
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
                    " - number of times this sequence occurred")))));
}
