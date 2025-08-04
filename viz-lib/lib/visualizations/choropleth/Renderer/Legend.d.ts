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
