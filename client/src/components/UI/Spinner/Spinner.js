import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import { CircularProgress } from "material-ui/Progress";

import styles from "./Spinner.styles";

const spinner = props => {
  const { classes } = props;

  return (
    <div className={classes.container}>
      <CircularProgress
        className={classes.progress}
        variant="indeterminate"
        size={100}
      />
    </div>
  );
};

spinner.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(spinner);
