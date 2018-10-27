import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";

import styles from "../ProfileActions.styles";

const requestDeclinedActions = props => {
  return (
    <div className={props.classes.actions}>
      This user has declined your friend request.
    </div>
  );
};

requestDeclinedActions.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(requestDeclinedActions);
