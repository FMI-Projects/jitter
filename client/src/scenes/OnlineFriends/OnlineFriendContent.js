import React from "react";
import PropTypes from "prop-types";
import Avatar from "material-ui/Avatar";
import { withStyles } from "material-ui/styles";
import { Link } from "react-router-dom";

import defaultUserImage from "assets/images/defaultUser.png";

import styles from "./OnlineFriendContent.styles";

const OnlineFriendContent = props => (
  <Link className={props.classes.friend} to={`/profile/${props._id}`}>
    <Avatar
      src={props.profilePictureUrl ? props.profilePictureUrl : defaultUserImage}
    />
    <span className={props.classes.name}>
      {props.firstName} {props.lastName}
    </span>
  </Link>
);

OnlineFriendContent.propTypes = {
  _id: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  profilePictureUrl: PropTypes.string
};

export default withStyles(styles)(OnlineFriendContent);
