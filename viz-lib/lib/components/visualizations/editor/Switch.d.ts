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
