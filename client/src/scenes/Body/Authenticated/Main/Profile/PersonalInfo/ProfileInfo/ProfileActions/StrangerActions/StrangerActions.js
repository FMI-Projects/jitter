import React from "react";
import PropTypes from "prop-types";
import { Button } from "material-ui";
import { withStyles } from "material-ui/styles";

import styles from "../ProfileActions.styles";

const strangerActions = props => {
  return (
    <div className={props.classes.actions}>
      <Button onClick={props.addFriend} variant="raised" color="primary">
        ADD FRIEND
      </Button>
    </div>
  );
};

strangerActions.propTypes = {
  classes: PropTypes.object.isRequired,
  addFriend: PropTypes.func.isRequired
};

export default withStyles(styles)(strangerActions);
