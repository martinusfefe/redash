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
