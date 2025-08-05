"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextAlignmentSelect = exports.ColorPicker = exports.InputNumber = exports.Input = exports.Select = exports.createTabbedEditor = exports.withControlLabel = exports.ContextHelp = exports.TextArea = exports.Switch = exports.Checkbox = exports.ControlLabel = exports.Section = void 0;
const select_1 = __importDefault(require("antd/lib/select"));
const input_1 = __importDefault(require("antd/lib/input"));
const input_number_1 = __importDefault(require("antd/lib/input-number"));
const checkbox_1 = __importDefault(require("antd/lib/checkbox"));
exports.Checkbox = checkbox_1.default;
const ColorPicker_1 = __importDefault(require("@/components/ColorPicker"));
const TextAlignmentSelect_1 = __importDefault(require("@/components/TextAlignmentSelect"));
const withControlLabel_1 = __importStar(require("./withControlLabel"));
exports.withControlLabel = withControlLabel_1.default;
Object.defineProperty(exports, "ControlLabel", { enumerable: true, get: function () { return withControlLabel_1.ControlLabel; } });
const createTabbedEditor_1 = __importDefault(require("./createTabbedEditor"));
exports.createTabbedEditor = createTabbedEditor_1.default;
const Section_1 = __importDefault(require("./Section"));
exports.Section = Section_1.default;
const Switch_1 = __importDefault(require("./Switch"));
exports.Switch = Switch_1.default;
const TextArea_1 = __importDefault(require("./TextArea"));
exports.TextArea = TextArea_1.default;
const ContextHelp_1 = __importDefault(require("./ContextHelp"));
exports.ContextHelp = ContextHelp_1.default;
exports.Select = (0, withControlLabel_1.default)(select_1.default);
exports.Input = (0, withControlLabel_1.default)(input_1.default);
exports.InputNumber = (0, withControlLabel_1.default)(input_number_1.default);
exports.ColorPicker = (0, withControlLabel_1.default)(ColorPicker_1.default);
exports.TextAlignmentSelect = (0, withControlLabel_1.default)(TextAlignmentSelect_1.default);
