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
