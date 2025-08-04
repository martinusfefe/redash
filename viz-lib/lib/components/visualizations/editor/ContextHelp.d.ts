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
