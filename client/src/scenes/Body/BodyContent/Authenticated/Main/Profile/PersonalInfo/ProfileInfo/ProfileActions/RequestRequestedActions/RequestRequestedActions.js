import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Button } from "material-ui";
import { withStyles } from "material-ui/styles";

import styles from "../ProfileActions.styles";

const requestRequestedActions = props => {
  return (
    <Fragment>
      <div className={props.classes.actions}>
        <Button variant="raised" color="primary">
          CANCEL FRIEND REQUEST
        </Button>
      </div>
    </Fragment>
  );
};

requestRequestedActions.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(requestRequestedActions);
