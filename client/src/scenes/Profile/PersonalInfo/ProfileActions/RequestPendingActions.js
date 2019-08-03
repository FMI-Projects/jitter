import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Button } from "material-ui";
import { withStyles } from "material-ui/styles";

import styles from "./ProfileActions.styles";

const RequestPendingActions = props => {
  return (
    <Fragment>
      <div className={props.classes.actions}>
        <Button onClick={props.acceptFriend} variant="raised" color="primary">
          ACCEPT FRIEND REQUEST
        </Button>
      </div>
      <div className={props.classes.actions}>
        <Button onClick={props.declineFriend} variant="raised" color="primary">
          DECLINE FRIEND REQUEST
        </Button>
      </div>
    </Fragment>
  );
};

RequestPendingActions.propTypes = {
  classes: PropTypes.object.isRequired,
  acceptFriend: PropTypes.func.isRequired,
  declineFriend: PropTypes.func.isRequired
};

export default withStyles(styles)(RequestPendingActions);
