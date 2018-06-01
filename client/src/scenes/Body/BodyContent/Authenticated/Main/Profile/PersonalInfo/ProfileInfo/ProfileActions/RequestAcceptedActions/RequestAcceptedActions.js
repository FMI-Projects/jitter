import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Button } from "material-ui";
import { withStyles } from "material-ui/styles";

import styles from "../ProfileActions.styles";

const requestAcceptedActions = props => {
  return (
    <Fragment>
      <div className={props.classes.actions}>
        <Button variant="raised" color="primary">
          MESSAGE
        </Button>
      </div>
      <div className={props.classes.actions}>
        <Button onClick={props.removeFriend} variant="raised" color="primary">
          REMOVE FRIEND
        </Button>
      </div>
    </Fragment>
  );
};

requestAcceptedActions.propTypes = {
  classes: PropTypes.object.isRequired,
  removeFriend: PropTypes.func.isRequired
};

export default withStyles(styles)(requestAcceptedActions);
