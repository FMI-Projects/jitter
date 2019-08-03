import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import { CircularProgress } from "material-ui/Progress";

import styles from "./Spinner.styles";

const Spinner = props => {
  const { classes, size } = props;

  return (
    <div className={classes.container}>
      <CircularProgress
        className={classes.progress}
        variant="indeterminate"
        size={size}
      />
    </div>
  );
};

Spinner.defaultProps = {
  size: 100
};

Spinner.propTypes = {
  classes: PropTypes.object.isRequired,
  size: PropTypes.number
};

export default withStyles(styles)(Spinner);
