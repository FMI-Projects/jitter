import React from "react";
import PropTypes from "prop-types";
import Avatar from "material-ui/Avatar";
import { withStyles } from "material-ui/styles";

import styles from "./OnlineFriend.styles";

const onlineFriend = props => (
  <div className={props.classes.friend}>
    <Avatar component="span">MB</Avatar>
    <span className={props.classes.name}> FirstName LastName</span>
  </div>
);

onlineFriend.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(onlineFriend);
