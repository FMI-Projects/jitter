import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";

import Avatar from "material-ui/Avatar";
import defaultUserImage from "assets/images/defaultUser.png";
import ToJs from "hoc/ToJs/ToJs";
import styles from "./ProfileSearchItemContent.styles";

const profileSearchItemContent = props => (
  <div className={props.classes.profile}>
    <Avatar
      src={
        props.profile.profilePictureUrl
          ? props.profile.profilePictureUrl
          : defaultUserImage
      }
    />
    <span className={props.classes.name}>
      {props.profile.firstName} {props.profile.lastName}
    </span>
  </div>
);

profileSearchItemContent.propTypes = {
  classes: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

export default withStyles(styles)(ToJs(profileSearchItemContent));
