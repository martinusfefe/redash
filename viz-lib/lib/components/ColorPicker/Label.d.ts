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
