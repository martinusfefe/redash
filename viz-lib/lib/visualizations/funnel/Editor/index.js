"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const createTabbedEditor_1 = __importDefault(require("../../../components/visualizations/editor/createTabbedEditor"));
const GeneralSettings_1 = __importDefault(require("./GeneralSettings"));
const AppearanceSettings_1 = __importDefault(require("./AppearanceSettings"));
exports.default = (0, createTabbedEditor_1.default)([
    { key: "General", title: "General", component: GeneralSettings_1.default },
    { key: "Appearance", title: "Appearance", component: AppearanceSettings_1.default },
]);
