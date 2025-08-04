import { maxBy } from "lodash";
import chroma from "chroma-js";
export default function chooseTextColorForBackground(backgroundColor) {
  var textColors = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ["#ffffff", "#333333"];
  try {
    backgroundColor = chroma(backgroundColor);
    return maxBy(textColors, color => chroma.contrast(backgroundColor, color));
  } catch (e) {
    return null;
  }
}
//# sourceMappingURL=chooseTextColorForBackground.js.map