import React from "react";
import PropTypes from "prop-types";
import Avatar from "material-ui/Avatar";
import { withStyles } from "material-ui/styles";
import defaultUserImage from "assets/images/defaultUser.png";

import styles from "./OnlineFriendContent.styles";

const onlineFriend = props => (
  <div className={props.classes.friend}>
    <Avatar
      src={props.profilePictureUrl ? props.profilePictureUrl : defaultUserImage}
    />
    <span className={props.classes.name}>
      {props.firstName} {props.lastName}
    </span>
  </div>
);

onlineFriend.propTypes = {
  classes: PropTypes.object.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  profilePictureUrl: PropTypes.string
};

export default withStyles(styles)(onlineFriend);
