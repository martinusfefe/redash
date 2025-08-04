import React from "react";
export declare const ErrorBoundaryContext: React.Context<{
    handleError: (error: any) => void;
    reset: () => void;
}>;
type OwnErrorMessageProps = {
    children?: React.ReactNode;
};
type ErrorMessageProps = OwnErrorMessageProps & typeof ErrorMessage.defaultProps;
export declare function ErrorMessage({ children }: ErrorMessageProps): JSX.Element;
export declare namespace ErrorMessage {
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
export {};
