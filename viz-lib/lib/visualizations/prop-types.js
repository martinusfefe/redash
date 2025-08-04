import PropTypes from "prop-types";
var VisualizationOptions = PropTypes.object;
// eslint-disable-line react/forbid-prop-types

var Data = PropTypes.shape({
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  rows: PropTypes.arrayOf(PropTypes.object).isRequired
});
// @ts-expect-error ts-migrate(2322) FIXME: Type 'Requireable<InferProps<{ id: Requireable<num... Remove this comment to see the full error message
var VisualizationType = PropTypes.shape({
  id: PropTypes.number,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  options: VisualizationOptions.isRequired
});
export { VisualizationType };

// For each visualization's renderer
export var RendererPropTypes = {
  visualizationName: PropTypes.string,
  data: Data.isRequired,
  options: VisualizationOptions.isRequired,
  onOptionsChange: PropTypes.func // (newOptions) => void
};

// For each visualization's editor
export var EditorPropTypes = {
  visualizationName: PropTypes.string,
  data: Data.isRequired,
  options: VisualizationOptions.isRequired,
  onOptionsChange: PropTypes.func.isRequired // (newOptions) => void
};
//# sourceMappingURL=prop-types.js.map