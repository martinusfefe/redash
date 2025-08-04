import React from "react";
import "./Section.less";
type OwnSectionTitleProps = {
    className?: string;
    children?: React.ReactNode;
};
type SectionTitleProps = OwnSectionTitleProps & typeof SectionTitle.defaultProps;
declare function SectionTitle({ className, children, ...props }: SectionTitleProps): JSX.Element | null;
declare namespace SectionTitle {
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
