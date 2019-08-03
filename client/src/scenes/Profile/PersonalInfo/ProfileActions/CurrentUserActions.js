import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";

import styles from "./ProfileActions.styles";

const CurrentUserActions = props => {
  return <div className={props.classes.actions} />;
};

CurrentUserActions.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CurrentUserActions);
