import React from "react";
import PropTypes from "prop-types";
import { Paper, Avatar, Icon, Typography } from "material-ui";
import { withStyles } from "material-ui/styles";

import * as formatDate from "utilities/formatters/formatDate";
import defaultProfilePicture from "assets/images/defaultUser.png";
import styles from "./ProfileInfo.styles";
import ProfileActions from "./ProfileActions/ProfileActions";

const profileInfo = props => (
  <Paper className={props.classes.paper}>
    <Avatar
      className={props.classes.avatar}
      src={
        props.profilePictureUrl
          ? props.profilePictureUrl
          : defaultProfilePicture
      }
    />
    <div>
      <Typography className={props.classes.content}>
        <Icon className={props.classes.icon}>person</Icon>
        <span>
          {props.firstName} {props.lastName}
        </span>
      </Typography>
      <Typography className={props.classes.content}>
        <Icon className={props.classes.icon}>cake</Icon>
        <span>
          {props.birthday ? formatDate.getUtcDate(props.birthday) : "N/A"}
        </span>
      </Typography>
      <Typography className={props.classes.content}>
        <Icon className={props.classes.icon}>wc</Icon>
        <span>{props.gender ? props.gender : "N/A"}</span>
      </Typography>
      <Typography className={props.classes.content}>
        <Icon className={props.classes.icon}>border_color</Icon>
        <span>{props.bio ? props.bio : "N/A"}</span>
      </Typography>
    </div>
    {props.profileId === props.currentUserId ? (
      <ProfileActions className={props.classes.actions} />
    ) : (
      <ProfileActions className={props.classes.actions} />
    )}
  </Paper>
);

profileInfo.propTypes = {
  classes: PropTypes.object.isRequired,
  profilePictureUrl: PropTypes.string,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  gender: PropTypes.string,
  birthday: PropTypes.string,
  bio: PropTypes.string,
  profileId: PropTypes.string,
  currentUserId: PropTypes.string.isRequired
};

export default withStyles(styles)(profileInfo);
