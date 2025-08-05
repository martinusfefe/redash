declare module "components/ErrorBoundary" {
    import React from "react";
    export const ErrorBoundaryContext: React.Context<{
        handleError: (error: any) => void;
        reset: () => void;
    }>;
    type OwnErrorMessageProps = {
        children?: React.ReactNode;
    };
    type ErrorMessageProps = OwnErrorMessageProps & typeof ErrorMessage.defaultProps;
    export function ErrorMessage({ children }: ErrorMessageProps): JSX.Element;
    export namespace ErrorMessage {
        var defaultProps: {
            children: string;
        };
    }
    type OwnErrorBoundaryProps = {
        renderError?: (...args: any[]) => any;
    };
    type ErrorBoundaryState = any;
    type ErrorBoundaryProps = OwnErrorBoundaryProps & typeof ErrorBoundary.defaultProps;
    export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
        static defaultProps: {
            children: null;
            renderError: null;
        };
        state: {
            error: null;
        };
        handleError: (error: any) => void;
        reset: () => void;
        static getDerivedStateFromError(error: any): {
            error: any;
        };
        componentDidCatch(error: any, errorInfo: any): void;
        render(): any;
    }
}
declare module "visualizations/prop-types" {
    import PropTypes from "prop-types";
    const VisualizationOptions: PropTypes.Requireable<object>;
    type VisualizationOptions = any;
    type Data = {
        columns: any[];
        rows: any[];
    };
    const Data: PropTypes.Requireable<Data>;
    type VisualizationType = {
        id?: number;
        type: string;
        name: string;
        options: VisualizationOptions;
    };
    const VisualizationType: PropTypes.Requireable<VisualizationType>;
    export { VisualizationType };
    export const RendererPropTypes: {
        visualizationName: PropTypes.Requireable<string>;
        data: PropTypes.Validator<Data>;
        options: PropTypes.Validator<object>;
        onOptionsChange: PropTypes.Requireable<(...args: any[]) => any>;
    };
    export const EditorPropTypes: {
        visualizationName: PropTypes.Requireable<string>;
        data: PropTypes.Validator<Data>;
        options: PropTypes.Validator<object>;
        onOptionsChange: PropTypes.Validator<(...args: any[]) => any>;
    };
}
declare module "services/resizeObserver" {
    export default function observe(node: any, callback: any): () => void;
}
declare module "visualizations/box-plot/d3box" {
    function box(): {
        (g: any): void;
        width(x: any): number | /*elided*/ any;
        height(x: any): number | /*elided*/ any;
        tickFormat(x: any): any;
        duration(x: any): number | /*elided*/ any;
        domain(x: any): any;
        value(x: any): /*elided*/ any | NumberConstructor;
        whiskers(x: any): /*elided*/ any | typeof boxWhiskers;
        quartiles(x: any): /*elided*/ any | typeof boxQuartiles;
    };
    function boxWhiskers(d: any): number[];
    function boxQuartiles(d: any): any[];
    export default box;
}
declare module "visualizations/box-plot/Renderer" {
    import "./renderer.less";
    declare function Renderer({ data, options }: any): JSX.Element;
    declare namespace Renderer {
        var propTypes: {
            visualizationName: import("prop-types").Requireable<string>;
            data: import("prop-types").Validator<{
                columns: any[];
                rows: any[];
            }>;
            options: import("prop-types").Validator<object>;
            onOptionsChange: import("prop-types").Requireable<(...args: any[]) => any>;
        };
    }
    export default Renderer;
}
declare module "lib/chooseTextColorForBackground" {
    export default function chooseTextColorForBackground(backgroundColor: any, textColors?: string[]): string | null | undefined;
}
declare module "components/ColorPicker/Swatch" {
    import "./swatch.less";
    type OwnProps = {
        className?: string;
        style?: any;
        title?: string;
        color?: string;
        size?: number;
    };
    type Props = OwnProps & typeof Swatch.defaultProps;
    declare function Swatch({ className, color, title, size, style, ...props }: Props): JSX.Element;
    declare namespace Swatch {
        var defaultProps: {
            className: null;
            style: null;
            title: null;
            color: string;
            size: number;
        };
    }
    export default Swatch;
}
declare module "components/ColorPicker/Input" {
    import "./input.less";
    type OwnProps = {
        color?: string;
        presetColors?: string[] | {
            [key: string]: string;
        };
        presetColumns?: number;
        onChange?: (...args: any[]) => any;
        onPressEnter?: (...args: any[]) => any;
    };
    type Props = OwnProps & typeof Input.defaultProps;
    declare function Input({ color, presetColors, presetColumns, onChange, onPressEnter }: Props): JSX.Element;
    declare namespace Input {
        var defaultProps: {
            color: string;
            presetColors: null;
            presetColumns: number;
            onChange: () => void;
            onPressEnter: () => void;
        };
    }
    export default Input;
}
declare module "components/ColorPicker/utils" {
    export function validateColor(value: any, fallback?: null): string | null;
    export function getColorName(color: any, presetColors: any): any;
}
declare module "components/ColorPicker/Label" {
    import "./label.less";
    type OwnProps = {
        className?: string;
        color?: string;
        presetColors?: string[] | {
            [key: string]: string;
        };
    };
    type Props = OwnProps & typeof Label.defaultProps;
    declare function Label({ className, color, presetColors, ...props }: Props): JSX.Element;
    declare namespace Label {
        var defaultProps: {
            className: null;
            color: string;
            presetColors: null;
        };
    }
    export default Label;
}
declare module "components/ColorPicker/index" {
    import React from "react";
    import ColorInput from "components/ColorPicker/Input";
    import "./index.less";
    type OwnProps = {
        color?: string;
        placement?: "top" | "left" | "right" | "bottom" | "topLeft" | "topRight" | "bottomLeft" | "bottomRight" | "leftTop" | "leftBottom" | "rightTop" | "rightBottom";
        presetColors?: string[] | {
            [key: string]: string;
        };
        presetColumns?: number;
        interactive?: boolean;
        triggerProps?: any;
        children?: React.ReactNode;
        addonBefore?: React.ReactNode;
        addonAfter?: React.ReactNode;
        onChange?: (...args: any[]) => any;
    };
    type Props = OwnProps & typeof ColorPicker.defaultProps;
    declare function ColorPicker({ color, placement, presetColors, presetColumns, interactive, children, onChange, triggerProps, addonBefore, addonAfter, }: Props): JSX.Element;
    declare namespace ColorPicker {
        var defaultProps: {
            color: string;
            placement: string;
            presetColors: null;
            presetColumns: number;
            interactive: boolean;
            triggerProps: {};
            children: null;
            addonBefore: null;
            addonAfter: null;
            onChange: () => void;
        };
        var Input: typeof ColorInput;
        var Swatch: typeof import("components/ColorPicker/Swatch").default;
        var Label: typeof import("components/ColorPicker/Label").default;
    }
    export default ColorPicker;
}
declare module "components/TextAlignmentSelect/index" {
    import "./index.less";
    type OwnProps = {
        className?: string;
    };
    type Props = OwnProps & typeof TextAlignmentSelect.defaultProps;
    declare function TextAlignmentSelect({ className, ...props }: Props): JSX.Element;
    declare namespace TextAlignmentSelect {
        var defaultProps: {
            className: null;
        };
    }
    export default TextAlignmentSelect;
}
declare module "components/visualizations/editor/withControlLabel" {
    import React from "react";
    import "./control-label.less";
    type OwnProps = {
        layout?: "vertical" | "horizontal";
        label?: React.ReactNode;
        labelProps?: any;
        disabled?: boolean;
        children?: React.ReactNode;
    };
    type Props = OwnProps & typeof ControlLabel.defaultProps;
    export function ControlLabel({ layout, label, labelProps, disabled, children }: Props): JSX.Element | null;
    export namespace ControlLabel {
        var defaultProps: {
            layout: string;
            label: null;
            disabled: boolean;
            children: null;
        };
    }
    export default function withControlLabel(WrappedControl: any): ({ className, id, layout, label, labelProps, disabled, ...props }: any) => JSX.Element;
}
declare module "components/visualizations/editor/createTabbedEditor" {
    export const UpdateOptionsStrategy: {
        replace: (existingOptions: any, newOptions: any) => any;
        shallowMerge: (existingOptions: any, newOptions: any) => any;
        deepMerge: (existingOptions: any, newOptions: any) => any;
    };
    type OwnProps = {
        tabs?: {
            key: string;
            title: string | ((...args: any[]) => any);
            isAvailable?: (...args: any[]) => any;
            component: (...args: any[]) => any;
        }[];
    };
    type Props = OwnProps & typeof TabbedEditor.defaultProps;
    export function TabbedEditor({ tabs, options, data, onOptionsChange, ...restProps }: Props): JSX.Element;
    export namespace TabbedEditor {
        var defaultProps: {
            tabs: never[];
        };
    }
    export default function createTabbedEditor(tabs: any): (props: any) => JSX.Element;
}
declare module "components/visualizations/editor/Section" {
    import React from "react";
    import "./Section.less";
    type OwnSectionTitleProps = {
        className?: string;
        children?: React.ReactNode;
    };
    type SectionTitleProps = OwnSectionTitleProps & typeof SectionTitle.defaultProps;
    function SectionTitle({ className, children, ...props }: SectionTitleProps): JSX.Element | null;
    namespace SectionTitle {
        var defaultProps: {
            className: null;
            children: null;
        };
    }
    type OwnSectionProps = {
        className?: string;
        children?: React.ReactNode;
    };
    type SectionProps = OwnSectionProps & typeof Section.defaultProps;
    declare function Section({ className, children, ...props }: SectionProps): JSX.Element;
    declare namespace Section {
        var defaultProps: {
            className: null;
            children: null;
        };
        var Title: typeof SectionTitle;
    }
    export default Section;
}
declare module "components/visualizations/editor/Switch" {
    import React from "react";
    import "./Switch.less";
    type OwnProps = {
        id?: string;
        disabled?: boolean;
        children?: React.ReactNode;
    };
    type Props = OwnProps & typeof Switch.defaultProps;
    declare function Switch({ id, children, disabled, ...props }: Props): JSX.Element;
    declare namespace Switch {
        var defaultProps: {
            id: null;
            disabled: boolean;
            children: null;
        };
    }
    export default Switch;
}
declare module "components/visualizations/editor/TextArea" {
    import "./TextArea.less";
    const _default: ({ className, id, layout, label, labelProps, disabled, ...props }: any) => JSX.Element;
    export default _default;
}
declare module "visualizations/visualizationsSettings" {
    import React from "react";
    type HelpTriggerProps = {
        title?: React.ReactNode;
        href: string;
        className?: string;
        children?: React.ReactNode;
    };
    function HelpTrigger({ title, href, className, children }: HelpTriggerProps): JSX.Element;
    namespace HelpTrigger {
        var defaultValues: {
            title: null;
            className: null;
            children: null;
        };
    }
    function Link(props: any): JSX.Element;
    export const visualizationsSettings: {
        HelpTriggerComponent: typeof HelpTrigger;
        LinkComponent: typeof Link;
        dateFormat: string;
        dateTimeFormat: string;
        integerFormat: string;
        floatFormat: string;
        nullValue: string;
        booleanValues: string[];
        tableCellMaxJSONSize: number;
        allowCustomJSVisualizations: boolean;
        hidePlotlyModeBar: boolean;
        choroplethAvailableMaps: {};
    };
    export function updateVisualizationsSettings(options: any): void;
}
declare module "components/visualizations/editor/ContextHelp" {
    import React from "react";
    import "./context-help.less";
    type OwnContextHelpProps = {
        icon?: React.ReactNode;
        children?: React.ReactNode;
    };
    type ContextHelpProps = OwnContextHelpProps & typeof ContextHelp.defaultProps;
    declare function ContextHelp({ icon, children, ...props }: ContextHelpProps): JSX.Element;
    declare namespace ContextHelp {
        var defaultProps: {
            icon: null;
            children: null;
        };
        var defaultIcon: JSX.Element;
        var NumberFormatSpecs: () => JSX.Element;
        var DateTimeFormatSpecs: () => JSX.Element;
        var TickFormatSpecs: () => JSX.Element;
    }
    export default ContextHelp;
}
declare module "components/visualizations/editor/index" {
    import Checkbox from "antd/lib/checkbox";
    import withControlLabel, { ControlLabel } from "components/visualizations/editor/withControlLabel";
    import createTabbedEditor from "components/visualizations/editor/createTabbedEditor";
    import Section from "components/visualizations/editor/Section";
    import Switch from "components/visualizations/editor/Switch";
    import TextArea from "components/visualizations/editor/TextArea";
    import ContextHelp from "components/visualizations/editor/ContextHelp";
    export { Section, ControlLabel, Checkbox, Switch, TextArea, ContextHelp, withControlLabel, createTabbedEditor };
    export const Select: ({ className, id, layout, label, labelProps, disabled, ...props }: any) => JSX.Element;
    export const Input: ({ className, id, layout, label, labelProps, disabled, ...props }: any) => JSX.Element;
    export const InputNumber: ({ className, id, layout, label, labelProps, disabled, ...props }: any) => JSX.Element;
    export const ColorPicker: ({ className, id, layout, label, labelProps, disabled, ...props }: any) => JSX.Element;
    export const TextAlignmentSelect: ({ className, id, layout, label, labelProps, disabled, ...props }: any) => JSX.Element;
}
declare module "visualizations/box-plot/Editor" {
    declare function Editor({ options, onOptionsChange }: any): JSX.Element;
    declare namespace Editor {
        var propTypes: {
            visualizationName: import("prop-types").Requireable<string>;
            data: import("prop-types").Validator<{
                columns: any[];
                rows: any[];
            }>;
            options: import("prop-types").Validator<object>;
            onOptionsChange: import("prop-types").Validator<(...args: any[]) => any>;
        };
    }
    export default Editor;
}
declare module "visualizations/box-plot/index" {
    import Renderer from "visualizations/box-plot/Renderer";
    import Editor from "visualizations/box-plot/Editor";
    const _default_1: {
        type: string;
        name: string;
        isDeprecated: boolean;
        getOptions: (options: any) => any;
        Renderer: typeof Renderer;
        Editor: typeof Editor;
        defaultRows: number;
        minRows: number;
    };
    export default _default_1;
}
declare module "visualizations/chart/getOptions" {
    export default function getOptions(options: any): any;
}
declare module "visualizations/chart/getChartData" {
    export default function getChartData(data: any, options: any): unknown[];
}
declare module "visualizations/chart/plotly/locales" { }
declare module "visualizations/ColorPalette" {
    export const BaseColors: {
        Blue: string;
        Red: string;
        Green: string;
        Purple: string;
        Cyan: string;
        Orange: string;
        "Light Blue": string;
        Lilac: string;
        "Light Green": string;
        Brown: string;
        Black: string;
        Gray: string;
        Pink: string;
        "Dark Blue": string;
    };
    export const AdditionalColors: {
        "Indian Red": string;
        "Green 2": string;
        "Green 3": string;
        "Dark Turquoise": string;
        "Dark Violet": string;
        "Pink 2": string;
    };
    let ColorPalette: {
        "Indian Red": string;
        "Green 2": string;
        "Green 3": string;
        "Dark Turquoise": string;
        "Dark Violet": string;
        "Pink 2": string;
        Blue: string;
        Red: string;
        Green: string;
        Purple: string;
        Cyan: string;
        Orange: string;
        "Light Blue": string;
        Lilac: string;
        "Light Green": string;
        Brown: string;
        Black: string;
        Gray: string;
        Pink: string;
        "Dark Blue": string;
    };
    export const ColorPaletteArray: string[];
    export default ColorPalette;
    export const AllColorPalettes: {
        Redash: {
            "Indian Red": string;
            "Green 2": string;
            "Green 3": string;
            "Dark Turquoise": string;
            "Dark Violet": string;
            "Pink 2": string;
            Blue: string;
            Red: string;
            Green: string;
            Purple: string;
            Cyan: string;
            Orange: string;
            "Light Blue": string;
            Lilac: string;
            "Light Green": string;
            Brown: string;
            Black: string;
            Gray: string;
            Pink: string;
            "Dark Blue": string;
        };
        Viridis: {
            1: string;
            2: string;
            3: string;
            4: string;
            5: string;
            6: string;
            7: string;
            8: string;
            9: string;
            10: string;
            11: string;
            12: string;
            13: string;
            14: string;
            15: string;
            16: string;
            17: string;
        };
        "Tableau 10": {
            1: string;
            2: string;
            3: string;
            4: string;
            5: string;
            6: string;
            7: string;
            8: string;
            9: string;
            10: string;
        };
        "D3 Category 10": {
            1: string;
            2: string;
            3: string;
            4: string;
            5: string;
            6: string;
            7: string;
            8: string;
            9: string;
            10: string;
        };
    };
    export const AllColorPaletteArrays: {
        Redash: string[];
        Viridis: string[];
        "Tableau 10": string[];
        "D3 Category 10": string[];
    };
    export const ColorPaletteTypes: {
        Redash: string;
        Viridis: string;
        "Tableau 10": string;
        "D3 Category 10": string;
    };
}
declare module "visualizations/chart/plotly/utils" {
    export function cleanNumber(value: any): any;
    export function getSeriesAxis(series: any, options: any): "y2" | "y";
    export function normalizeValue(value: any, axisType: any, dateTimeFormat?: string): any;
}
declare module "visualizations/chart/plotly/preparePieData" {
    export function getPieDimensions(series: any): {
        rows: number;
        cellsInRow: number;
        cellWidth: number;
        cellHeight: number;
        xPadding: number;
        yPadding: number;
    };
    export default function preparePieData(seriesList: any, options: any): {
        visible: boolean;
        values: any[];
        labels: any[];
        type: string;
        hole: number;
        marker: {
            colors: any[];
        };
        hoverinfo: any;
        text: never[];
        textinfo: string;
        textposition: string;
        textfont: {
            color: (string | null | undefined)[];
        };
        name: any;
        direction: any;
        domain: {
            x: number[];
            y: number[];
        };
        sourceData: Map<any, any>;
        sort: any;
        color_scheme: any;
    }[];
}
declare module "lib/value-format" {
    export function createTextFormatter(highlightLinks: any): (value: any) => string | JSX.Element;
    export function createDateTimeFormatter(format: any): (value: any) => string | JSX.Element;
    export function createBooleanFormatter(values: any): (value: any) => any;
    export function createNumberFormatter(format: any, canReturnHTMLElement?: boolean): (value: any) => string | JSX.Element;
    export function formatSimpleTemplate(str: any, data: any): string;
}
declare module "visualizations/chart/plotly/prepareHeatmapData" {
    export default function prepareHeatmapData(seriesList: any, options: any): ({
        x: never[];
        y: never[];
        z: never[];
        type: string;
        name: string;
        colorscale: any;
    } | {
        x: never[];
        y: never[];
        mode: string;
        hoverinfo: string;
        showlegend: boolean;
        text: never[];
        textfont: {
            color: never[];
        };
    })[];
}
declare module "visualizations/chart/plotly/prepareDefaultData" {
    export default function prepareDefaultData(seriesList: any, options: any): any[];
}
declare module "visualizations/chart/plotly/updateData" {
    export default function updateData(seriesList: any, options: any): any;
}
declare module "visualizations/chart/plotly/prepareData" {
    export default function prepareData(seriesList: any, options: any): any;
}
declare module "visualizations/chart/plotly/prepareLayout" {
    export default function prepareLayout(element: any, options: any, data: any): any;
}
declare module "visualizations/chart/plotly/updateAxes" {
    export default function updateAxes(plotlyElement: any, seriesList: any, layout: any, options: any): {}[];
}
declare module "visualizations/chart/plotly/updateChartSize" {
    export default function updateChartSize(plotlyElement: any, layout: any, options: any): (Pick<any, "width" | "height" | "legend"> | (() => (Pick<any, "height"> | null)[] | undefined))[] | (Pick<any, "width" | "height"> | null)[] | undefined;
}
declare module "visualizations/chart/plotly/customChartUtils" {
    export function prepareCustomChartData(series: any): {
        x: any;
        ys: {};
    };
    export function createCustomChartRenderer(code: any, logErrorsToConsole?: boolean): (x: any, ys: any, element: any, Plotly: any) => void;
}
declare module "visualizations/chart/plotly/index" {
    import * as Plotly from "plotly.js";
    import "visualizations/chart/plotly/locales";
    import prepareData from "visualizations/chart/plotly/prepareData";
    import prepareLayout from "visualizations/chart/plotly/prepareLayout";
    import updateData from "visualizations/chart/plotly/updateData";
    import updateAxes from "visualizations/chart/plotly/updateAxes";
    import updateChartSize from "visualizations/chart/plotly/updateChartSize";
    import { prepareCustomChartData, createCustomChartRenderer } from "visualizations/chart/plotly/customChartUtils";
    export { Plotly, prepareData, prepareLayout, updateData, updateAxes, updateChartSize, prepareCustomChartData, createCustomChartRenderer, };
}
declare module "visualizations/chart/Renderer/initChart" {
    export default function initChart(container: any, options: any, data: any, additionalOptions: any, onError: any): {
        initialized: Promise<any>;
        setZoomEnabled: (...args: any[]) => any;
        destroy: (...args: any[]) => any;
    };
}
declare module "visualizations/chart/Renderer/PlotlyChart" {
    export interface PlotlyChartProps {
        data: {
            rows: any[];
            columns: any[];
        };
        options: object;
    }
    declare function PlotlyChart({ options, data }: PlotlyChartProps): JSX.Element;
    declare namespace PlotlyChart {
        var propTypes: {
            visualizationName: import("prop-types").Requireable<string>;
            data: import("prop-types").Validator<{
                columns: any[];
                rows: any[];
            }>;
            options: import("prop-types").Validator<object>;
            onOptionsChange: import("prop-types").Requireable<(...args: any[]) => any>;
        };
    }
    export default PlotlyChart;
}
declare module "visualizations/chart/Renderer/CustomPlotlyChart" {
    declare function CustomPlotlyChart({ options, data }: any): JSX.Element;
    declare namespace CustomPlotlyChart {
        var propTypes: {
            visualizationName: import("prop-types").Requireable<string>;
            data: import("prop-types").Validator<{
                columns: any[];
                rows: any[];
            }>;
            options: import("prop-types").Validator<object>;
            onOptionsChange: import("prop-types").Requireable<(...args: any[]) => any>;
        };
    }
    export default CustomPlotlyChart;
}
declare module "visualizations/chart/Renderer/index" {
    import "./renderer.less";
    declare function Renderer({ options, ...props }: any): JSX.Element;
    declare namespace Renderer {
        var propTypes: {
            visualizationName: import("prop-types").Requireable<string>;
            data: import("prop-types").Validator<{
                columns: any[];
                rows: any[];
            }>;
            options: import("prop-types").Validator<object>;
            onOptionsChange: import("prop-types").Requireable<(...args: any[]) => any>;
        };
    }
    export default Renderer;
}
declare module "visualizations/chart/Editor/ChartTypeSelect" {
    type OwnProps = {
        hiddenChartTypes?: any[];
    };
    type Props = OwnProps & typeof ChartTypeSelect.defaultProps;
    declare function ChartTypeSelect({ hiddenChartTypes, ...props }: Props): JSX.Element;
    declare namespace ChartTypeSelect {
        var defaultProps: {
            hiddenChartTypes: never[];
        };
    }
    export default ChartTypeSelect;
}
declare module "visualizations/chart/Editor/ColumnMappingSelect" {
    type OwnProps = {
        value?: string | string[];
        availableColumns?: string[];
        type?: any;
        onChange?: (...args: any[]) => any;
    };
    type Props = OwnProps & typeof ColumnMappingSelect.defaultProps;
    declare function ColumnMappingSelect({ value, availableColumns, type, onChange, areAxesSwapped }: Props): JSX.Element;
    declare namespace ColumnMappingSelect {
        var defaultProps: {
            value: null;
            availableColumns: never[];
            type: null;
            onChange: () => void;
        };
        var MappingTypes: {
            x: {
                label: string;
            };
            y: {
                label: string;
                multiple: boolean;
            };
            series: {
                label: string;
            };
            yError: {
                label: string;
            };
            size: {
                label: string;
            };
            zVal: {
                label: string;
            };
        };
    }
    export default ColumnMappingSelect;
}
declare module "visualizations/chart/Editor/GeneralSettings" {
    declare function GeneralSettings({ options, data, onOptionsChange }: any): JSX.Element;
    declare namespace GeneralSettings {
        var propTypes: {
            visualizationName: import("prop-types").Requireable<string>;
            data: import("prop-types").Validator<{
                columns: any[];
                rows: any[];
            }>;
            options: import("prop-types").Validator<object>;
            onOptionsChange: import("prop-types").Validator<(...args: any[]) => any>;
        };
    }
    export default GeneralSettings;
}
declare module "visualizations/chart/Editor/AxisSettings" {
    type OwnProps = {
        id: string;
        options: {
            type: string;
            title?: {
                text?: string;
            };
            rangeMin?: number;
            rangeMax?: number;
            tickFormat?: string;
        };
        features?: {
            autoDetectType?: boolean;
            range?: boolean;
        };
        onChange?: (...args: any[]) => any;
    };
    type Props = OwnProps & typeof AxisSettings.defaultProps;
    declare function AxisSettings({ id, options, features, onChange }: Props): JSX.Element;
    declare namespace AxisSettings {
        var defaultProps: {
            features: {};
            onChange: () => void;
        };
    }
    export default AxisSettings;
}
declare module "visualizations/chart/Editor/XAxisSettings" {
    declare function XAxisSettings({ options, onOptionsChange }: any): JSX.Element;
    declare namespace XAxisSettings {
        var propTypes: {
            visualizationName: import("prop-types").Requireable<string>;
            data: import("prop-types").Validator<{
                columns: any[];
                rows: any[];
            }>;
            options: import("prop-types").Validator<object>;
            onOptionsChange: import("prop-types").Validator<(...args: any[]) => any>;
        };
    }
    export default XAxisSettings;
}
declare module "visualizations/chart/Editor/YAxisSettings" {
    declare function YAxisSettings({ options, onOptionsChange }: any): JSX.Element;
    declare namespace YAxisSettings {
        var propTypes: {
            visualizationName: import("prop-types").Requireable<string>;
            data: import("prop-types").Validator<{
                columns: any[];
                rows: any[];
            }>;
            options: import("prop-types").Validator<object>;
            onOptionsChange: import("prop-types").Validator<(...args: any[]) => any>;
        };
    }
    export default YAxisSettings;
}
declare module "components/sortable/index" {
    import React from "react";
    import "./style.less";
    export const DragHandle: any;
    export const SortableContainerWrapper: any;
    export const SortableElement: any;
    type OwnProps = {
        disabled?: boolean;
        containerComponent?: React.ReactElement;
        containerProps?: any;
        children?: React.ReactNode;
    };
    type Props = OwnProps & typeof SortableContainer.defaultProps;
    export function SortableContainer({ disabled, containerComponent, containerProps, children, ...wrapperProps }: Props): JSX.Element;
    export namespace SortableContainer {
        var defaultProps: {
            disabled: boolean;
            containerComponent: string;
            containerProps: {};
            children: null;
        };
    }
}
declare module "visualizations/chart/Editor/SeriesSettings" {
    declare function SeriesSettings({ options, data, onOptionsChange }: any): JSX.Element;
    declare namespace SeriesSettings {
        var propTypes: {
            visualizationName: import("prop-types").Requireable<string>;
            data: import("prop-types").Validator<{
                columns: any[];
                rows: any[];
            }>;
            options: import("prop-types").Validator<object>;
            onOptionsChange: import("prop-types").Validator<(...args: any[]) => any>;
        };
    }
    export default SeriesSettings;
}
declare module "visualizations/chart/Editor/PieColorsSettings" {
    declare function PieColorsSettings({ options, data, onOptionsChange }: any): JSX.Element;
    declare namespace PieColorsSettings {
        var propTypes: {
            visualizationName: import("prop-types").Requireable<string>;
            data: import("prop-types").Validator<{
                columns: any[];
                rows: any[];
            }>;
            options: import("prop-types").Validator<object>;
            onOptionsChange: import("prop-types").Validator<(...args: any[]) => any>;
        };
    }
    export default PieColorsSettings;
}
declare module "visualizations/chart/Editor/HeatmapColorsSettings" {
    declare function HeatmapColorsSettings({ options, onOptionsChange }: any): JSX.Element;
    declare namespace HeatmapColorsSettings {
        var propTypes: {
            visualizationName: import("prop-types").Requireable<string>;
            data: import("prop-types").Validator<{
                columns: any[];
                rows: any[];
            }>;
            options: import("prop-types").Validator<object>;
            onOptionsChange: import("prop-types").Validator<(...args: any[]) => any>;
        };
    }
    export default HeatmapColorsSettings;
}
declare module "visualizations/chart/Editor/DefaultColorsSettings" {
    declare function DefaultColorsSettings({ options, data, onOptionsChange }: any): JSX.Element;
    declare namespace DefaultColorsSettings {
        var propTypes: {
            visualizationName: import("prop-types").Requireable<string>;
            data: import("prop-types").Validator<{
                columns: any[];
                rows: any[];
            }>;
            options: import("prop-types").Validator<object>;
            onOptionsChange: import("prop-types").Validator<(...args: any[]) => any>;
        };
    }
    export default DefaultColorsSettings;
}
declare module "visualizations/chart/Editor/ColorsSettings" {
    declare function ColorsSettings({ options, ...props }: any): JSX.Element;
    declare namespace ColorsSettings {
        var propTypes: {
            visualizationName: import("prop-types").Requireable<string>;
            data: import("prop-types").Validator<{
                columns: any[];
                rows: any[];
            }>;
            options: import("prop-types").Validator<object>;
            onOptionsChange: import("prop-types").Validator<(...args: any[]) => any>;
        };
    }
    export default ColorsSettings;
}
declare module "visualizations/chart/Editor/DataLabelsSettings" {
    declare function DataLabelsSettings({ options, onOptionsChange }: any): JSX.Element;
    declare namespace DataLabelsSettings {
        var propTypes: {
            visualizationName: import("prop-types").Requireable<string>;
            data: import("prop-types").Validator<{
                columns: any[];
                rows: any[];
            }>;
            options: import("prop-types").Validator<object>;
            onOptionsChange: import("prop-types").Validator<(...args: any[]) => any>;
        };
    }
    export default DataLabelsSettings;
}
declare module "visualizations/chart/Editor/CustomChartSettings" {
    declare function CustomChartSettings({ options, onOptionsChange }: any): JSX.Element;
    declare namespace CustomChartSettings {
        var propTypes: {
            visualizationName: import("prop-types").Requireable<string>;
            data: import("prop-types").Validator<{
                columns: any[];
                rows: any[];
            }>;
            options: import("prop-types").Validator<object>;
            onOptionsChange: import("prop-types").Validator<(...args: any[]) => any>;
        };
    }
    export default CustomChartSettings;
}
declare module "visualizations/chart/Editor/index" {
    import "./editor.less";
    const _default_2: (props: any) => JSX.Element;
    export default _default_2;
}
declare module "visualizations/chart/index" {
    import getOptions from "visualizations/chart/getOptions";
    import Renderer from "visualizations/chart/Renderer/index";
    const _default_3: {
        type: string;
        name: string;
        isDefault: boolean;
        getOptions: typeof getOptions;
        Renderer: typeof Renderer;
        Editor: (props: any) => JSX.Element;
        defaultColumns: number;
        defaultRows: number;
        minColumns: number;
        minRows: number;
    };
    export default _default_3;
}
declare module "visualizations/choropleth/ColorPalette" {
    const _default_4: {
        White: string;
        Black: string;
        "Light Gray": string;
    } & {
        "Indian Red": string;
        "Green 2": string;
        "Green 3": string;
        "Dark Turquoise": string;
        "Dark Violet": string;
        "Pink 2": string;
        Blue: string;
        Red: string;
        Green: string;
        Purple: string;
        Cyan: string;
        Orange: string;
        "Light Blue": string;
        Lilac: string;
        "Light Green": string;
        Brown: string;
        Black: string;
        Gray: string;
        Pink: string;
        "Dark Blue": string;
    };
    export default _default_4;
}
declare module "visualizations/choropleth/getOptions" {
    export default function getOptions(options: any): any;
}
declare module "lib/hooks/useMemoWithDeepCompare" {
    export default function useMemoWithDeepCompare(create: any, inputs: any): undefined;
}
declare module "lib/referenceCountingCache" {
    export default function createReferenceCountingCache({ cleanupDelay }?: {
        cleanupDelay?: number | undefined;
    }): {
        get: (key: any, getter: any) => any;
        release: (key: any) => void;
    };
}
declare module "visualizations/choropleth/hooks/useLoadGeoJson" {
    export default function useLoadGeoJson(mapType: any): (boolean | null)[];
}
declare module "services/sanitize" {
    import DOMPurify from "dompurify";
    export { DOMPurify };
    const _default_5: {
        (source: string | Node): string;
        (source: string | Node, config: DOMPurify.Config & {
            RETURN_TRUSTED_TYPE: true;
        }): TrustedHTML;
        (source: string | Node, config: DOMPurify.Config & {
            RETURN_DOM_FRAGMENT?: false;
            RETURN_DOM?: false;
        }): string;
        (source: string | Node, config: DOMPurify.Config & {
            RETURN_DOM_FRAGMENT: true;
        }): DocumentFragment;
        (source: string | Node, config: DOMPurify.Config & {
            RETURN_DOM: true;
        }): HTMLElement;
        (source: string | Node, config: DOMPurify.Config): string | HTMLElement | DocumentFragment;
    };
    export default _default_5;
}
declare module "visualizations/choropleth/Renderer/utils" {
    export function darkenColor(color: any): string;
    export function createNumberFormatter(format: any, placeholder: any): (value: any) => any;
    export function prepareData(data: any, keyColumn: any, valueColumn: any): {};
    export function prepareFeatureProperties(feature: any, valueFormatted: any, data: any, targetField: any): any;
    export function getValueForFeature(feature: any, data: any, targetField: any): any;
    export function getColorByValue(value: any, limits: any, colors: any, defaultColor: any): any;
    export function createScale(features: any, data: any, options: any): {
        limits: any[];
        colors: any[];
        legend: {
            color: any;
            limit: any;
        }[];
    };
}
declare module "visualizations/choropleth/Renderer/Legend" {
    type OwnProps = {
        items?: {
            color: string;
            text: string;
        }[];
        alignText?: "left" | "center" | "right";
    };
    type Props = OwnProps & typeof Legend.defaultProps;
    declare function Legend({ items, alignText }: Props): JSX.Element;
    declare namespace Legend {
        var defaultProps: {
            items: never[];
            alignText: string;
        };
    }
    export default Legend;
}
declare module "visualizations/choropleth/Renderer/initChoropleth" {
    import "leaflet/dist/leaflet.css";
    import "leaflet-fullscreen";
    import "leaflet-fullscreen/dist/leaflet.fullscreen.css";
    export default function initChoropleth(container: any, onBoundsChange: any): {
        updateLayers: (geoJson: any, data: any, options: any) => void;
        updateBounds: (bounds: any) => void;
        destroy(): void;
    };
}
declare module "visualizations/choropleth/Renderer/index" {
    import "./renderer.less";
    declare function Renderer({ data, options, onOptionsChange }: any): JSX.Element;
    declare namespace Renderer {
        var propTypes: {
            visualizationName: import("prop-types").Requireable<string>;
            data: import("prop-types").Validator<{
                columns: any[];
                rows: any[];
            }>;
            options: import("prop-types").Validator<object>;
            onOptionsChange: import("prop-types").Requireable<(...args: any[]) => any>;
        };
    }
    export default Renderer;
}
declare module "visualizations/choropleth/Editor/utils" {
    export function getGeoJsonFields(geoJson: any): never[];
    export function getGeoJsonBounds(geoJson: any): any[][] | null;
}
declare module "visualizations/choropleth/Editor/GeneralSettings" {
    declare function GeneralSettings({ options, data, onOptionsChange }: any): JSX.Element;
    declare namespace GeneralSettings {
        var propTypes: {
            visualizationName: import("prop-types").Requireable<string>;
            data: import("prop-types").Validator<{
                columns: any[];
                rows: any[];
            }>;
            options: import("prop-types").Validator<object>;
            onOptionsChange: import("prop-types").Validator<(...args: any[]) => any>;
        };
    }
    export default GeneralSettings;
}
declare module "visualizations/choropleth/Editor/ColorsSettings" {
    declare function ColorsSettings({ options, onOptionsChange }: any): JSX.Element;
    declare namespace ColorsSettings {
        var propTypes: {
            visualizationName: import("prop-types").Requireable<string>;
            data: import("prop-types").Validator<{
                columns: any[];
                rows: any[];
            }>;
            options: import("prop-types").Validator<object>;
            onOptionsChange: import("prop-types").Validator<(...args: any[]) => any>;
        };
    }
    export default ColorsSettings;
}
declare module "visualizations/choropleth/Editor/FormatSettings" {
    declare function GeneralSettings({ options, onOptionsChange }: any): JSX.Element;
    declare namespace GeneralSettings {
        var propTypes: {
            visualizationName: import("prop-types").Requireable<string>;
            data: import("prop-types").Validator<{
                columns: any[];
                rows: any[];
            }>;
            options: import("prop-types").Validator<object>;
            onOptionsChange: import("prop-types").Validator<(...args: any[]) => any>;
        };
    }
    export default GeneralSettings;
}
declare module "visualizations/choropleth/Editor/BoundsSettings" {
    declare function BoundsSettings({ options, onOptionsChange }: any): JSX.Element;
    declare namespace BoundsSettings {
        var propTypes: {
            visualizationName: import("prop-types").Requireable<string>;
            data: import("prop-types").Validator<{
                columns: any[];
                rows: any[];
            }>;
            options: import("prop-types").Validator<object>;
            onOptionsChange: import("prop-types").Validator<(...args: any[]) => any>;
        };
    }
    export default BoundsSettings;
}
declare module "visualizations/choropleth/Editor/index" {
    const _default_6: (props: any) => JSX.Element;
    export default _default_6;
}
declare module "visualizations/choropleth/index" {
    import getOptions from "visualizations/choropleth/getOptions";
    import Renderer from "visualizations/choropleth/Renderer/index";
    const _default_7: {
        type: string;
        name: string;
        getOptions: typeof getOptions;
        Renderer: typeof Renderer;
        Editor: (props: any) => JSX.Element;
        defaultColumns: number;
        defaultRows: number;
        minColumns: number;
    };
    export default _default_7;
}
declare module "visualizations/cohort/getOptions" {
    export default function getOptions(options: any): any;
}
declare module "visualizations/cohort/prepareData" {
    export default function prepareData(rawData: any, options: any): {
        data: never[];
        initialDate: null;
    } | {
        data: any;
        initialDate: Date;
    };
}
declare module "visualizations/cohort/Cornelius" {
    import "./cornelius.less";
    type OwnCorneliusProps = {
        data?: number[][];
        options?: {
            initialDate: any;
            timeInterval?: "daily" | "weekly" | "monthly" | "yearly";
            noValuePlaceholder?: string;
            rawNumberOnHover?: boolean;
            displayAbsoluteValues?: boolean;
            initialIntervalNumber?: number;
            maxColumns?: number;
            title?: string;
            timeColumnTitle?: string;
            peopleColumnTitle?: string;
            stageColumnTitle?: string;
            numberFormat?: string;
            percentFormat?: string;
            timeLabelFormat?: string;
            colors?: {
                min?: string;
                max?: string;
                steps?: number;
            };
        };
    };
    type CorneliusProps = OwnCorneliusProps & typeof Cornelius.defaultProps;
    declare function Cornelius({ data, options }: CorneliusProps): JSX.Element | null;
    declare namespace Cornelius {
        var defaultProps: {
            data: never[];
            options: {};
        };
    }
    export default Cornelius;
}
declare module "visualizations/cohort/Renderer" {
    import "./renderer.less";
    declare function Renderer({ data, options }: any): JSX.Element | null;
    declare namespace Renderer {
        var propTypes: {
            visualizationName: import("prop-types").Requireable<string>;
            data: import("prop-types").Validator<{
                columns: any[];
                rows: any[];
            }>;
            options: import("prop-types").Validator<object>;
            onOptionsChange: import("prop-types").Requireable<(...args: any[]) => any>;
        };
    }
    export default Renderer;
}
declare module "visualizations/cohort/Editor/ColumnsSettings" {
    declare function ColumnsSettings({ options, data, onOptionsChange }: any): JSX.Element;
    declare namespace ColumnsSettings {
        var propTypes: {
            visualizationName: import("prop-types").Requireable<string>;
            data: import("prop-types").Validator<{
                columns: any[];
                rows: any[];
            }>;
            options: import("prop-types").Validator<object>;
            onOptionsChange: import("prop-types").Validator<(...args: any[]) => any>;
        };
    }
    export default ColumnsSettings;
}
declare module "visualizations/cohort/Editor/OptionsSettings" {
    declare function OptionsSettings({ options, onOptionsChange }: any): JSX.Element;
    declare namespace OptionsSettings {
        var propTypes: {
            visualizationName: import("prop-types").Requireable<string>;
            data: import("prop-types").Validator<{
                columns: any[];
                rows: any[];
            }>;
            options: import("prop-types").Validator<object>;
            onOptionsChange: import("prop-types").Validator<(...args: any[]) => any>;
        };
    }
    export default OptionsSettings;
}
declare module "visualizations/cohort/Editor/ColorsSettings" {
    declare function ColorsSettings({ options, onOptionsChange }: any): JSX.Element;
    declare namespace ColorsSettings {
        var propTypes: {
            visualizationName: import("prop-types").Requireable<string>;
            data: import("prop-types").Validator<{
                columns: any[];
                rows: any[];
            }>;
            options: import("prop-types").Validator<object>;
            onOptionsChange: import("prop-types").Validator<(...args: any[]) => any>;
        };
    }
    export default ColorsSettings;
}
declare module "visualizations/cohort/Editor/AppearanceSettings" {
    declare function AppearanceSettings({ options, onOptionsChange }: any): JSX.Element;
    declare namespace AppearanceSettings {
        var propTypes: {
            visualizationName: import("prop-types").Requireable<string>;
            data: import("prop-types").Validator<{
                columns: any[];
                rows: any[];
            }>;
            options: import("prop-types").Validator<object>;
            onOptionsChange: import("prop-types").Validator<(...args: any[]) => any>;
        };
    }
    export default AppearanceSettings;
}
declare module "visualizations/cohort/Editor/index" {
    const _default_8: (props: any) => JSX.Element;
    export default _default_8;
}
declare module "visualizations/cohort/index" {
    import getOptions from "visualizations/cohort/getOptions";
    import Renderer from "visualizations/cohort/Renderer";
    const _default_9: {
        type: string;
        name: string;
        getOptions: typeof getOptions;
        Renderer: typeof Renderer;
        Editor: (props: any) => JSX.Element;
        autoHeight: boolean;
        defaultRows: number;
    };
    export default _default_9;
}
declare module "visualizations/counter/utils" {
    export function getCounterData(rows: any, options: any, visualizationName: any): {};
    export function isValueNumber(rows: any, options: any): boolean;
}
declare module "visualizations/counter/Renderer" {
    import "./render.less";
    declare function Renderer({ data, options, visualizationName }: any): JSX.Element;
    declare namespace Renderer {
        var propTypes: {
            visualizationName: import("prop-types").Requireable<string>;
            data: import("prop-types").Validator<{
                columns: any[];
                rows: any[];
            }>;
            options: import("prop-types").Validator<object>;
            onOptionsChange: import("prop-types").Requireable<(...args: any[]) => any>;
        };
    }
    export default Renderer;
}
declare module "visualizations/counter/Editor/GeneralSettings" {
    declare function GeneralSettings({ options, data, visualizationName, onOptionsChange }: any): JSX.Element;
    declare namespace GeneralSettings {
        var propTypes: {
            visualizationName: import("prop-types").Requireable<string>;
            data: import("prop-types").Validator<{
                columns: any[];
                rows: any[];
            }>;
            options: import("prop-types").Validator<object>;
            onOptionsChange: import("prop-types").Validator<(...args: any[]) => any>;
        };
    }
    export default GeneralSettings;
}
declare module "visualizations/counter/Editor/FormatSettings" {
    declare function FormatSettings({ options, data, onOptionsChange }: any): JSX.Element;
    declare namespace FormatSettings {
        var propTypes: {
            visualizationName: import("prop-types").Requireable<string>;
            data: import("prop-types").Validator<{
                columns: any[];
                rows: any[];
            }>;
            options: import("prop-types").Validator<object>;
            onOptionsChange: import("prop-types").Validator<(...args: any[]) => any>;
        };
    }
    export default FormatSettings;
}
declare module "visualizations/counter/Editor/index" {
    const _default_10: (props: any) => JSX.Element;
    export default _default_10;
}
declare module "visualizations/counter/index" {
    import Renderer from "visualizations/counter/Renderer";
    const _default_11: {
        type: string;
        name: string;
        getOptions: (options: any) => any;
        Renderer: typeof Renderer;
        Editor: (props: any) => JSX.Element;
        defaultColumns: number;
        defaultRows: number;
    };
    export default _default_11;
}
declare module "visualizations/details/DetailsRenderer" {
    import "./details.less";
    declare function DetailsRenderer({ data }: any): JSX.Element | null;
    declare namespace DetailsRenderer {
        var propTypes: {
            visualizationName: import("prop-types").Requireable<string>;
            data: import("prop-types").Validator<{
                columns: any[];
                rows: any[];
            }>;
            options: import("prop-types").Validator<object>;
            onOptionsChange: import("prop-types").Requireable<(...args: any[]) => any>;
        };
    }
    export default DetailsRenderer;
}
declare module "visualizations/details/index" {
    import DetailsRenderer from "visualizations/details/DetailsRenderer";
    const _default_12: {
        type: string;
        name: string;
        getOptions: (options: any) => any;
        Renderer: typeof DetailsRenderer;
        defaultColumns: number;
        defaultRows: number;
    };
    export default _default_12;
}
declare module "visualizations/funnel/getOptions" {
    export default function getOptions(options: any, { columns }: any): any;
}
declare module "visualizations/funnel/Renderer/prepareData" {
    export default function prepareData(rows: any, options: any): {
        step: string;
        value: number;
    }[];
}
declare module "visualizations/funnel/Renderer/FunnelBar" {
    import React from "react";
    import "./funnel-bar.less";
    type OwnProps = {
        color?: string;
        value?: number;
        align?: "left" | "center" | "right";
        className?: string;
        children?: React.ReactNode;
    };
    type Props = OwnProps & typeof FunnelBar.defaultProps;
    declare function FunnelBar({ color, value, align, className, children }: Props): JSX.Element;
    declare namespace FunnelBar {
        var defaultProps: {
            color: string;
            value: number;
            align: string;
            className: null;
            children: null;
        };
    }
    export default FunnelBar;
}
declare module "visualizations/funnel/Renderer/index" {
    import "./index.less";
    declare function Renderer({ data, options }: any): JSX.Element | null;
    declare namespace Renderer {
        var propTypes: {
            visualizationName: import("prop-types").Requireable<string>;
            data: import("prop-types").Validator<{
                columns: any[];
                rows: any[];
            }>;
            options: import("prop-types").Validator<object>;
            onOptionsChange: import("prop-types").Requireable<(...args: any[]) => any>;
        };
    }
    export default Renderer;
}
declare module "visualizations/funnel/Editor/GeneralSettings" {
    declare function GeneralSettings({ options, data, onOptionsChange }: any): JSX.Element;
    declare namespace GeneralSettings {
        var propTypes: {
            visualizationName: import("prop-types").Requireable<string>;
            data: import("prop-types").Validator<{
                columns: any[];
                rows: any[];
            }>;
            options: import("prop-types").Validator<object>;
            onOptionsChange: import("prop-types").Validator<(...args: any[]) => any>;
        };
    }
    export default GeneralSettings;
}
declare module "visualizations/funnel/Editor/AppearanceSettings" {
    declare function AppearanceSettings({ options, onOptionsChange }: any): JSX.Element;
    declare namespace AppearanceSettings {
        var propTypes: {
            visualizationName: import("prop-types").Requireable<string>;
            data: import("prop-types").Validator<{
                columns: any[];
                rows: any[];
            }>;
            options: import("prop-types").Validator<object>;
            onOptionsChange: import("prop-types").Validator<(...args: any[]) => any>;
        };
    }
    export default AppearanceSettings;
}
declare module "visualizations/funnel/Editor/index" {
    const _default_13: (props: any) => JSX.Element;
    export default _default_13;
}
declare module "visualizations/funnel/index" {
    import getOptions from "visualizations/funnel/getOptions";
    import Renderer from "visualizations/funnel/Renderer/index";
    const _default_14: {
        type: string;
        name: string;
        getOptions: typeof getOptions;
        Renderer: typeof Renderer;
        Editor: (props: any) => JSX.Element;
        defaultRows: number;
    };
    export default _default_14;
}
declare module "visualizations/map/getOptions" {
    export type LeafletBaseIconType = "marker" | "rectangle" | "circle" | "rectangle-dot" | "circle-dot" | "doughnut";
    export interface MapOptionsType {
        latColName: string;
        lonColName: string;
        classify: any;
        groups: Record<string, any>;
        mapTileUrl: string;
        clusterMarkers: boolean;
        customizeMarkers: boolean;
        iconShape: LeafletBaseIconType;
        iconFont: LeafletBaseIconType;
        foregroundColor: string;
        backgroundColor: string;
        borderColor: string;
        bounds: any;
        tooltip: {
            enabled: boolean;
            template: string;
        };
        popup: {
            enabled: boolean;
            template: string;
        };
    }
    export default function getOptions(options: MapOptionsType): MapOptionsType;
}
declare module "visualizations/map/prepareData" {
    export default function prepareData(data: any, options: any): any[];
}
declare module "visualizations/map/initMap" {
    import "leaflet.markercluster";
    import "leaflet/dist/leaflet.css";
    import "leaflet.markercluster/dist/MarkerCluster.css";
    import "leaflet.markercluster/dist/MarkerCluster.Default.css";
    import "beautifymarker";
    import "beautifymarker/leaflet-beautify-marker-icon.css";
    import "leaflet-fullscreen";
    import "leaflet-fullscreen/dist/leaflet.fullscreen.css";
    export default function initMap(container: any): {
        onBoundsChange: () => void;
        updateLayers: (groups: any, options: any) => void;
        updateBounds: (bounds: any) => void;
        destroy(): void;
    };
}
declare module "visualizations/map/Renderer" {
    declare function Renderer({ data, options, onOptionsChange }: any): JSX.Element;
    declare namespace Renderer {
        var propTypes: {
            visualizationName: import("prop-types").Requireable<string>;
            data: import("prop-types").Validator<{
                columns: any[];
                rows: any[];
            }>;
            options: import("prop-types").Validator<object>;
            onOptionsChange: import("prop-types").Requireable<(...args: any[]) => any>;
        };
    }
    export default Renderer;
}
declare module "visualizations/map/Editor/GeneralSettings" {
    declare function GeneralSettings({ options, data, onOptionsChange }: any): JSX.Element;
    declare namespace GeneralSettings {
        var propTypes: {
            visualizationName: import("prop-types").Requireable<string>;
            data: import("prop-types").Validator<{
                columns: any[];
                rows: any[];
            }>;
            options: import("prop-types").Validator<object>;
            onOptionsChange: import("prop-types").Validator<(...args: any[]) => any>;
        };
    }
    export default GeneralSettings;
}
declare module "visualizations/map/Editor/GroupsSettings" {
    declare function GroupsSettings({ options, data, onOptionsChange }: any): JSX.Element;
    declare namespace GroupsSettings {
        var propTypes: {
            visualizationName: import("prop-types").Requireable<string>;
            data: import("prop-types").Validator<{
                columns: any[];
                rows: any[];
            }>;
            options: import("prop-types").Validator<object>;
            onOptionsChange: import("prop-types").Validator<(...args: any[]) => any>;
        };
    }
    export default GroupsSettings;
}
declare module "visualizations/map/Editor/FormatSettings" {
    declare function FormatSettings({ options, onOptionsChange }: any): JSX.Element;
    declare namespace FormatSettings {
        var propTypes: {
            visualizationName: import("prop-types").Requireable<string>;
            data: import("prop-types").Validator<{
                columns: any[];
                rows: any[];
            }>;
            options: import("prop-types").Validator<object>;
            onOptionsChange: import("prop-types").Validator<(...args: any[]) => any>;
        };
    }
    export default FormatSettings;
}
declare module "visualizations/map/Editor/StyleSettings" {
    declare function StyleSettings({ options, onOptionsChange }: any): JSX.Element;
    declare namespace StyleSettings {
        var propTypes: {
            visualizationName: import("prop-types").Requireable<string>;
            data: import("prop-types").Validator<{
                columns: any[];
                rows: any[];
            }>;
            options: import("prop-types").Validator<object>;
            onOptionsChange: import("prop-types").Validator<(...args: any[]) => any>;
        };
    }
    export default StyleSettings;
}
declare module "visualizations/map/Editor/index" {
    const _default_15: (props: any) => JSX.Element;
    export default _default_15;
}
declare module "visualizations/map/index" {
    import getOptions from "visualizations/map/getOptions";
    import Renderer from "visualizations/map/Renderer";
    const _default_16: {
        type: string;
        name: string;
        getOptions: typeof getOptions;
        Renderer: typeof Renderer;
        Editor: (props: any) => JSX.Element;
        defaultColumns: number;
        defaultRows: number;
        minColumns: number;
    };
    export default _default_16;
}
declare module "lib/utils" {
    export function formatColumnValue(value: any, columnType?: null): any;
}
declare module "visualizations/pivot/Renderer" {
    import "react-pivottable/pivottable.css";
    import "./renderer.less";
    declare function Renderer({ data, options, onOptionsChange }: any): JSX.Element;
    declare namespace Renderer {
        var propTypes: {
            visualizationName: import("prop-types").Requireable<string>;
            data: import("prop-types").Validator<{
                columns: any[];
                rows: any[];
            }>;
            options: import("prop-types").Validator<object>;
            onOptionsChange: import("prop-types").Requireable<(...args: any[]) => any>;
        };
        var defaultProps: {
            onOptionsChange: () => void;
        };
    }
    export default Renderer;
}
declare module "visualizations/pivot/Editor" {
    declare function Editor({ options, onOptionsChange }: any): JSX.Element;
    declare namespace Editor {
        var propTypes: {
            visualizationName: import("prop-types").Requireable<string>;
            data: import("prop-types").Validator<{
                columns: any[];
                rows: any[];
            }>;
            options: import("prop-types").Validator<object>;
            onOptionsChange: import("prop-types").Validator<(...args: any[]) => any>;
        };
    }
    export default Editor;
}
declare module "visualizations/pivot/index" {
    import Renderer from "visualizations/pivot/Renderer";
    import Editor from "visualizations/pivot/Editor";
    const _default_17: {
        type: string;
        name: string;
        getOptions: (options: any) => any;
        Renderer: typeof Renderer;
        Editor: typeof Editor;
        defaultRows: number;
        defaultColumns: number;
        minColumns: number;
    };
    export default _default_17;
}
declare module "visualizations/sankey/d3sankey" {
    export interface LinkType {
        id: number;
        name: string;
        color: string;
        x: number;
        y: number;
        dx: number;
        dy: number;
        source: SourceTargetType;
        target: SourceTargetType;
    }
    export type SourceTargetType = {
        sourceLinks: Array<LinkType>;
        targetLinks: Array<LinkType>;
    };
    export type NodeType = LinkType & SourceTargetType;
    export interface D3SankeyType {
        nodeWidth: (...args: any[]) => any;
        nodeHeight: (...args: any[]) => any;
        nodePadding: (...args: any[]) => any;
        nodes: (...args: any[]) => any[];
        link: (...args: any[]) => any;
        links: (...args: any[]) => any[];
        size: (...args: any[]) => any;
        layout: (...args: any[]) => any;
        relayout: (...args: any[]) => any;
    }
    export type DType = {
        sy: number;
        ty: number;
        value: number;
        source: LinkType;
        target: LinkType;
    } & LinkType;
    function Sankey(): D3SankeyType;
    export default Sankey;
}
declare module "visualizations/sankey/initSankey" {
    import { SankeyDataType } from "visualizations/sankey/index";
    export type ExtendedSankeyDataType = Partial<SankeyDataType> & {
        nodes: any[];
        links: any[];
    };
    export default function initSankey(data: ExtendedSankeyDataType): (element: HTMLDivElement) => void;
}
declare module "visualizations/sankey/Renderer" {
    import { SankeyDataType } from "visualizations/sankey/index";
    import "./renderer.less";
    declare function Renderer({ data }: {
        data: SankeyDataType;
    }): JSX.Element;
    declare namespace Renderer {
        var propTypes: {
            visualizationName: import("prop-types").Requireable<string>;
            data: import("prop-types").Validator<{
                columns: any[];
                rows: any[];
            }>;
            options: import("prop-types").Validator<object>;
            onOptionsChange: import("prop-types").Requireable<(...args: any[]) => any>;
        };
    }
    export default Renderer;
}
declare module "visualizations/sankey/Editor" {
    export default function Editor(): JSX.Element;
}
declare module "visualizations/sankey/index" {
    import Renderer from "visualizations/sankey/Renderer";
    import Editor from "visualizations/sankey/Editor";
    export interface SankeyDataType {
        columns: {
            name: string;
            friendly_name: string;
            type: "integer";
        }[];
        rows: {
            value: number;
            [name: string]: number | string | null;
        }[];
    }
    const _default_18: {
        type: string;
        name: string;
        getOptions: (options: {}) => {};
        Renderer: typeof Renderer;
        Editor: typeof Editor;
        defaultRows: number;
    };
    export default _default_18;
}
declare module "visualizations/sunburst/initSunburst" {
    export default function initSunburst(data: any): (element: any) => void;
}
declare module "visualizations/sunburst/Renderer" {
    import "./renderer.less";
    declare function Renderer({ data }: any): JSX.Element;
    declare namespace Renderer {
        var propTypes: {
            visualizationName: import("prop-types").Requireable<string>;
            data: import("prop-types").Validator<{
                columns: any[];
                rows: any[];
            }>;
            options: import("prop-types").Validator<object>;
            onOptionsChange: import("prop-types").Requireable<(...args: any[]) => any>;
        };
    }
    export default Renderer;
}
declare module "visualizations/sunburst/Editor" {
    export default function Editor(): JSX.Element;
}
declare module "visualizations/sunburst/index" {
    import Renderer from "visualizations/sunburst/Renderer";
    import Editor from "visualizations/sunburst/Editor";
    const _default_19: {
        type: string;
        name: string;
        getOptions: (options: any) => any;
        Renderer: typeof Renderer;
        Editor: typeof Editor;
        defaultRows: number;
    };
    export default _default_19;
}
declare module "visualizations/table/getOptions" {
    export default function getOptions(options: any, { columns }: any): any;
}
declare module "components/HtmlContent" {
    import React from "react";
    const HtmlContent: React.NamedExoticComponent<object>;
    export default HtmlContent;
}
declare module "visualizations/table/columns/text" {
    type Props = {
        column: {
            name: string;
            allowHTML?: boolean;
            highlightLinks?: boolean;
        };
        onChange: (...args: any[]) => any;
    };
    declare function initTextColumn(column: any): {
        ({ row }: any): string | JSX.Element;
        prepareData: (row: any) => {
            text: string | JSX.Element;
        };
    };
    declare namespace initTextColumn {
        var friendlyName: string;
        var Editor: ({ column, onChange }: Props) => JSX.Element;
    }
    export default initTextColumn;
}
declare module "visualizations/table/columns/number" {
    type Props = {
        column: {
            name: string;
            numberFormat?: string;
        };
        onChange: (...args: any[]) => any;
    };
    declare function initNumberColumn(column: any): {
        ({ row }: any): string | JSX.Element;
        prepareData: (row: any) => {
            text: string | JSX.Element;
        };
    };
    declare namespace initNumberColumn {
        var friendlyName: string;
        var Editor: ({ column, onChange }: Props) => JSX.Element;
    }
    export default initNumberColumn;
}
declare module "visualizations/table/columns/datetime" {
    type Props = {
        column: {
            name: string;
            dateTimeFormat?: string;
        };
        onChange: (...args: any[]) => any;
    };
    declare function initDateTimeColumn(column: any): {
        ({ row }: any): string | JSX.Element;
        prepareData: (row: any) => {
            text: string | JSX.Element;
        };
    };
    declare namespace initDateTimeColumn {
        var friendlyName: string;
        var Editor: ({ column, onChange }: Props) => JSX.Element;
    }
    export default initDateTimeColumn;
}
declare module "visualizations/table/columns/boolean" {
    type Props = {
        column: {
            name: string;
            booleanValues?: string[];
        };
        onChange: (...args: any[]) => any;
    };
    declare function initBooleanColumn(column: any): {
        ({ row }: any): any;
        prepareData: (row: any) => {
            text: any;
        };
    };
    declare namespace initBooleanColumn {
        var friendlyName: string;
        var Editor: ({ column, onChange }: Props) => JSX.Element;
    }
    export default initBooleanColumn;
}
declare module "visualizations/table/columns/link" {
    type Props = {
        column: {
            name: string;
            linkUrlTemplate?: string;
            linkTextTemplate?: string;
            linkTitleTemplate?: string;
            linkOpenInNewTab?: boolean;
        };
        onChange: (...args: any[]) => any;
    };
    declare function initLinkColumn(column: any): {
        ({ row }: any): JSX.Element;
        prepareData: (row: any) => {};
    };
    declare namespace initLinkColumn {
        var friendlyName: string;
        var Editor: ({ column, onChange }: Props) => JSX.Element;
    }
    export default initLinkColumn;
}
declare module "visualizations/table/columns/image" {
    type Props = {
        column: {
            name: string;
            imageUrlTemplate?: string;
            imageWidth?: string;
            imageHeight?: string;
            imageTitleTemplate?: string;
        };
        onChange: (...args: any[]) => any;
    };
    declare function initImageColumn(column: any): {
        ({ row }: any): JSX.Element;
        prepareData: (row: any) => {};
    };
    declare namespace initImageColumn {
        var friendlyName: string;
        var Editor: ({ column, onChange }: Props) => JSX.Element;
    }
    export default initImageColumn;
}
declare module "components/json-view-interactive/JsonViewInteractive" {
    import "./json-view-interactive.less";
    type OwnJsonViewInteractiveProps = {
        value?: any;
    };
    type JsonViewInteractiveProps = OwnJsonViewInteractiveProps & typeof JsonViewInteractive.defaultProps;
    declare function JsonViewInteractive({ value }: JsonViewInteractiveProps): JSX.Element;
    declare namespace JsonViewInteractive {
        var defaultProps: {
            value: undefined;
        };
    }
    export default JsonViewInteractive;
}
declare module "visualizations/table/columns/json" {
    declare function initJsonColumn(column: any): {
        ({ row }: any): JSX.Element;
        prepareData: (row: any) => {
            text: string;
            value: any;
        } | {
            text: any;
            value: undefined;
        };
    };
    declare namespace initJsonColumn {
        var friendlyName: string;
    }
    export default initJsonColumn;
}
declare module "visualizations/table/columns/index" {
    import initTextColumn from "visualizations/table/columns/text";
    import initNumberColumn from "visualizations/table/columns/number";
    import initDateTimeColumn from "visualizations/table/columns/datetime";
    import initBooleanColumn from "visualizations/table/columns/boolean";
    import initLinkColumn from "visualizations/table/columns/link";
    import initImageColumn from "visualizations/table/columns/image";
    import initJsonColumn from "visualizations/table/columns/json";
    const _default_20: {
        string: typeof initTextColumn;
        number: typeof initNumberColumn;
        datetime: typeof initDateTimeColumn;
        boolean: typeof initBooleanColumn;
        link: typeof initLinkColumn;
        image: typeof initImageColumn;
        json: typeof initJsonColumn;
    };
    export default _default_20;
}
declare module "visualizations/table/utils" {
    export function prepareColumns(columns: any, searchInput: any, orderBy: any, onOrderByChange: any): {
        key: any;
        dataIndex: string;
        align: any;
        sorter: {
            multiple: number;
        };
        sortOrder: any;
        title: JSX.Element;
        onHeaderCell: () => {
            className: any;
            onClick: (event: any) => any;
        };
    }[];
    export function initRows(rows: any): {
        key: string;
        record: any;
    }[];
    export function filterRows(rows: any, searchTerm: any, searchColumns: any): any;
    export function sortRows(rows: any, orderBy: any): any;
}
declare module "visualizations/table/Renderer" {
    import "./renderer.less";
    declare function Renderer({ options, data }: any): JSX.Element | null;
    declare namespace Renderer {
        var propTypes: {
            visualizationName: import("prop-types").Requireable<string>;
            data: import("prop-types").Validator<{
                columns: any[];
                rows: any[];
            }>;
            options: import("prop-types").Validator<object>;
            onOptionsChange: import("prop-types").Requireable<(...args: any[]) => any>;
        };
    }
    export default Renderer;
}
declare module "visualizations/table/Editor/ColumnEditor" {
    type OwnProps = {
        column: {
            name: string;
            title?: string;
            visible?: boolean;
            alignContent?: "left" | "center" | "right";
            displayAs?: any;
        };
        onChange?: (...args: any[]) => any;
    };
    type Props = OwnProps & typeof ColumnEditor.defaultProps;
    declare function ColumnEditor({ column, onChange }: Props): JSX.Element;
    declare namespace ColumnEditor {
        var defaultProps: {
            onChange: () => void;
        };
    }
    export default ColumnEditor;
}
declare module "visualizations/table/Editor/ColumnsSettings" {
    declare function ColumnsSettings({ options, onOptionsChange }: any): JSX.Element;
    declare namespace ColumnsSettings {
        var propTypes: {
            visualizationName: import("prop-types").Requireable<string>;
            data: import("prop-types").Validator<{
                columns: any[];
                rows: any[];
            }>;
            options: import("prop-types").Validator<object>;
            onOptionsChange: import("prop-types").Validator<(...args: any[]) => any>;
        };
    }
    export default ColumnsSettings;
}
declare module "visualizations/table/Editor/GridSettings" {
    declare function GridSettings({ options, onOptionsChange }: any): JSX.Element;
    declare namespace GridSettings {
        var propTypes: {
            visualizationName: import("prop-types").Requireable<string>;
            data: import("prop-types").Validator<{
                columns: any[];
                rows: any[];
            }>;
            options: import("prop-types").Validator<object>;
            onOptionsChange: import("prop-types").Validator<(...args: any[]) => any>;
        };
    }
    export default GridSettings;
}
declare module "visualizations/table/Editor/index" {
    import "./editor.less";
    const _default_21: (props: any) => JSX.Element;
    export default _default_21;
}
declare module "visualizations/table/index" {
    import getOptions from "visualizations/table/getOptions";
    import Renderer from "visualizations/table/Renderer";
    const _default_22: {
        type: string;
        name: string;
        getOptions: typeof getOptions;
        Renderer: typeof Renderer;
        Editor: (props: any) => JSX.Element;
        autoHeight: boolean;
        defaultRows: number;
        defaultColumns: number;
        minColumns: number;
    };
    export default _default_22;
}
declare module "visualizations/word-cloud/Renderer" {
    import "./renderer.less";
    declare function Renderer({ data, options }: any): JSX.Element;
    declare namespace Renderer {
        var propTypes: {
            visualizationName: import("prop-types").Requireable<string>;
            data: import("prop-types").Validator<{
                columns: any[];
                rows: any[];
            }>;
            options: import("prop-types").Validator<object>;
            onOptionsChange: import("prop-types").Requireable<(...args: any[]) => any>;
        };
    }
    export default Renderer;
}
declare module "visualizations/word-cloud/Editor" {
    declare function Editor({ options, data, onOptionsChange }: any): JSX.Element;
    declare namespace Editor {
        var propTypes: {
            visualizationName: import("prop-types").Requireable<string>;
            data: import("prop-types").Validator<{
                columns: any[];
                rows: any[];
            }>;
            options: import("prop-types").Validator<object>;
            onOptionsChange: import("prop-types").Validator<(...args: any[]) => any>;
        };
    }
    export default Editor;
}
declare module "visualizations/word-cloud/index" {
    import Renderer from "visualizations/word-cloud/Renderer";
    import Editor from "visualizations/word-cloud/Editor";
    const _default_23: {
        type: string;
        name: string;
        getOptions: (options: any) => any;
        Renderer: typeof Renderer;
        Editor: typeof Editor;
        defaultRows: number;
    };
    export default _default_23;
}
declare module "visualizations/registeredVisualizations" {
    const registeredVisualizations: {};
    export default registeredVisualizations;
    export function getDefaultVisualization(): undefined;
    export function newVisualization(type?: null, options?: {}): {
        type: any;
        name: any;
        description: string;
        options: {};
    };
}
declare module "visualizations/Renderer" {
    import React from "react";
    import { RendererPropTypes } from "visualizations/prop-types";
    type Props = {
        type: string;
        addonBefore?: React.ReactNode;
        addonAfter?: React.ReactNode;
    } & typeof RendererPropTypes;
    export default function Renderer({ type, data, options: optionsProp, visualizationName, addonBefore, addonAfter, ...otherProps }: Props): JSX.Element;
}
declare module "visualizations/Editor" {
    import { EditorPropTypes } from "visualizations/prop-types";
    type Props = {
        type: string;
    } & typeof EditorPropTypes;
    export default function Editor({ type, options: optionsProp, data, ...otherProps }: Props): JSX.Element;
}
declare module "visualizations/index" {
    import Renderer from "visualizations/Renderer";
    import Editor from "visualizations/Editor";
    export { Renderer, Editor };
}
declare module "index" {
    export * from "visualizations/index";
    export * from "visualizations/visualizationsSettings";
    export { VisualizationType } from "visualizations/prop-types";
    export { default as registeredVisualizations, getDefaultVisualization, newVisualization, } from "visualizations/registeredVisualizations";
}
declare module "visualizations/chart/getChartData.test" { }
declare module "visualizations/chart/Editor/ColorsSettings.test" { }
declare module "visualizations/chart/Editor/DataLabelsSettings.test" { }
declare module "visualizations/chart/Editor/GeneralSettings.test" { }
declare module "visualizations/chart/Editor/SeriesSettings.test" { }
declare module "visualizations/chart/Editor/XAxisSettings.test" { }
declare module "visualizations/chart/Editor/YAxisSettings.test" { }
declare module "visualizations/chart/Editor/index.test" { }
declare module "visualizations/chart/plotly/prepareData.test" { }
declare module "visualizations/chart/plotly/prepareLayout.test" { }
declare const each: any, map: any, filter: any;
declare const d3: any;
declare const albersUSA: any;
declare const mercator: any;
declare const geojson: any;
declare function convertPoint(coord: any): any;
declare function convertLineString(points: any): any;
declare function convertPolygon(polygon: any): any;
declare function convertMultiPolygon(multiPolygon: any): any;
declare module "visualizations/counter/utils.test" { }
declare module "visualizations/table/Editor/ColumnsSettings.test" { }
declare module "visualizations/table/Editor/GridSettings.test" { }
declare module "visualizations/table/columns/boolean.test" { }
declare module "visualizations/table/columns/datetime.test" { }
declare module "visualizations/table/columns/image.test" { }
declare module "visualizations/table/columns/link.test" { }
declare module "visualizations/table/columns/number.test" { }
declare module "visualizations/table/columns/text.test" { }
