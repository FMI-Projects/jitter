import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Button } from "material-ui";
import { withStyles } from "material-ui/styles";

import styles from "../ProfileActions.styles";

const requestPendingActions = props => {
  return (
    <Fragment>
      <div className={props.classes.actions}>
        <Button variant="raised" color="primary">
          ACCEPT FRIEND REQUEST
        </Button>
      </div>
      <div className={props.classes.actions}>
        <Button variant="raised" color="primary">
          DECLINE FRIEND REQUEST
        </Button>
      </div>
    </Fragment>
  );
};

requestPendingActions.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(requestPendingActions);
