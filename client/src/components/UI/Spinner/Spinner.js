import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "material-ui/styles";
import {CircularProgress} from "material-ui/Progress";

import styles from "./Spinner.styles";

const spinner = props => {
  const {classes, size} = props;

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

spinner.defaultProps = {
  size: 100
};

spinner.propTypes = {
  classes: PropTypes.object.isRequired,
  size: PropTypes.number
};

export default withStyles(styles)(spinner);
