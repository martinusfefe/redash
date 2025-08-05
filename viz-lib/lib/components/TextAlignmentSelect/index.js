"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TextAlignmentSelect;
const lodash_1 = require("lodash");
const react_1 = __importDefault(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const radio_1 = __importDefault(require("antd/lib/radio"));
const tooltip_1 = __importDefault(require("antd/lib/tooltip"));
const AlignLeftOutlined_1 = __importDefault(require("@ant-design/icons/AlignLeftOutlined"));
const AlignCenterOutlined_1 = __importDefault(require("@ant-design/icons/AlignCenterOutlined"));
const AlignRightOutlined_1 = __importDefault(require("@ant-design/icons/AlignRightOutlined"));
require("./index.less");
// @ts-expect-error ts-migrate(2700) FIXME: Rest types may only be created from object types.
function TextAlignmentSelect({ className, ...props }) {
    return (
    // Antd RadioGroup does not use any custom attributes
    react_1.default.createElement("div", { ...(0, lodash_1.pickBy)(props, (v, k) => (0, lodash_1.startsWith)(k, "data-")) },
        react_1.default.createElement(radio_1.default.Group, { className: (0, classnames_1.default)("text-alignment-select", className), ...props },
            react_1.default.createElement(tooltip_1.default, { title: "Align left", mouseEnterDelay: 0, mouseLeaveDelay: 0 },
                react_1.default.createElement(radio_1.default.Button, { value: "left", "data-test": "TextAlignmentSelect.Left" },
                    react_1.default.createElement(AlignLeftOutlined_1.default, null))),
            react_1.default.createElement(tooltip_1.default, { title: "Align center", mouseEnterDelay: 0, mouseLeaveDelay: 0 },
                react_1.default.createElement(radio_1.default.Button, { value: "center", "data-test": "TextAlignmentSelect.Center" },
                    react_1.default.createElement(AlignCenterOutlined_1.default, null))),
            react_1.default.createElement(tooltip_1.default, { title: "Align right", mouseEnterDelay: 0, mouseLeaveDelay: 0 },
                react_1.default.createElement(radio_1.default.Button, { value: "right", "data-test": "TextAlignmentSelect.Right" },
                    react_1.default.createElement(AlignRightOutlined_1.default, null))))));
}
TextAlignmentSelect.defaultProps = {
    className: null,
};
