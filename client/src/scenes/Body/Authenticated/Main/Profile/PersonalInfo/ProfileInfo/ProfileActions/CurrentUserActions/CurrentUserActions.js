import React from "react";
import PropTypes from "prop-types";
import { Button } from "material-ui";
import { withStyles } from "material-ui/styles";

import styles from "../ProfileActions.styles";

const currentUserActions = props => {
  return (
    <div className={props.classes.actions}>
      <Button variant="raised" color="primary">
        EDIT PROFILE
      </Button>
    </div>
  );
};

currentUserActions.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(currentUserActions);
