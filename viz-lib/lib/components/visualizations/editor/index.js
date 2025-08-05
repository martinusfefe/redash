import AntSelect from "antd/lib/select";
import AntInput from "antd/lib/input";
import AntInputNumber from "antd/lib/input-number";
import Checkbox from "antd/lib/checkbox";
import RedashColorPicker from "../../ColorPicker";
import RedashTextAlignmentSelect from "../../TextAlignmentSelect";
import withControlLabel, { ControlLabel } from "./withControlLabel";
import createTabbedEditor from "./createTabbedEditor";
import Section from "./Section";
import Switch from "./Switch";
import TextArea from "./TextArea";
import ContextHelp from "./ContextHelp";
export { Section, ControlLabel, Checkbox, Switch, TextArea, ContextHelp, withControlLabel, createTabbedEditor };
export var Select = withControlLabel(AntSelect);
export var Input = withControlLabel(AntInput);
export var InputNumber = withControlLabel(AntInputNumber);
export var ColorPicker = withControlLabel(RedashColorPicker);
export var TextAlignmentSelect = withControlLabel(RedashTextAlignmentSelect);
//# sourceMappingURL=index.js.map