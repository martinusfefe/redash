import { EditorPropTypes } from "../visualizations/prop-types";
type Props = {
    type: string;
} & typeof EditorPropTypes;
export default function Editor({ type, options: optionsProp, data, ...otherProps }: Props): JSX.Element;
export {};
