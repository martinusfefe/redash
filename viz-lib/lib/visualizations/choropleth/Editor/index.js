"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const createTabbedEditor_1 = __importDefault(require("../../../components/visualizations/editor/createTabbedEditor"));
const GeneralSettings_1 = __importDefault(require("./GeneralSettings"));
const ColorsSettings_1 = __importDefault(require("./ColorsSettings"));
const FormatSettings_1 = __importDefault(require("./FormatSettings"));
const BoundsSettings_1 = __importDefault(require("./BoundsSettings"));
exports.default = (0, createTabbedEditor_1.default)([
    { key: "General", title: "General", component: GeneralSettings_1.default },
    { key: "Colors", title: "Colors", component: ColorsSettings_1.default },
    { key: "Format", title: "Format", component: FormatSettings_1.default },
    { key: "Bounds", title: "Bounds", component: BoundsSettings_1.default },
]);
