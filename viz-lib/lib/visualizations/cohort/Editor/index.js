"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const createTabbedEditor_1 = __importDefault(require("@/components/visualizations/editor/createTabbedEditor"));
const ColumnsSettings_1 = __importDefault(require("./ColumnsSettings"));
const OptionsSettings_1 = __importDefault(require("./OptionsSettings"));
const ColorsSettings_1 = __importDefault(require("./ColorsSettings"));
const AppearanceSettings_1 = __importDefault(require("./AppearanceSettings"));
exports.default = (0, createTabbedEditor_1.default)([
    { key: "Columns", title: "Columns", component: ColumnsSettings_1.default },
    { key: "Options", title: "Options", component: OptionsSettings_1.default },
    { key: "Colors", title: "Colors", component: ColorsSettings_1.default },
    { key: "Appearance", title: "Appearance", component: AppearanceSettings_1.default },
]);
