import React from "react";
import PropTypes from "prop-types";
import { Button } from "material-ui";
import { withStyles } from "material-ui/styles";

import styles from "./ProfileActions.styles";

const StrangerActions = props => {
  return (
    <div className={props.classes.actions}>
      <Button onClick={props.addFriend} variant="raised" color="primary">
        ADD FRIEND
      </Button>
    </div>
  );
};

StrangerActions.propTypes = {
  classes: PropTypes.object.isRequired,
  addFriend: PropTypes.func.isRequired
};

export default withStyles(styles)(StrangerActions);
