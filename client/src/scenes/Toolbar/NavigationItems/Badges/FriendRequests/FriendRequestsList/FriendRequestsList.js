import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Menu, { MenuItem } from "material-ui/Menu";
import Avatar from "material-ui/Avatar";
import Button from "material-ui/Button";
import { withStyles } from "material-ui/styles";
import defaultUserImage from "assets/images/defaultUser.png";

import styles from "./FriendRequestsList.styles";

const friendRequestsList = props => {
  let friendRequests = null;

  if (props.friendRequests.length > 0) {
    friendRequests = props.friendRequests.map(request => (
      <Fragment key={request.with._id}>
        <div className={props.classes.friendRequest}>
          <Avatar
            src={
              request.with.profilePictureUrl
                ? request.with.profilePictureUrl
                : defaultUserImage
            }
          />
          <div className={props.classes.friendNames}>
            {request.with.firstName} {request.with.lastName}
          </div>
        </div>
        <div className={props.classes.friendRequestAction}>
          <Button
            color="primary"
            onClick={() => props.onAccept(request.with._id)}
          >
            ACCEPT
          </Button>
          <Button
            color="secondary"
            onClick={() => props.onDecline(request.with._id)}
          >
            DECLINE
          </Button>
        </div>
      </Fragment>
    ));
  } else {
    friendRequests = (
      <MenuItem onClick={props.onClose}>No pending friend requests...</MenuItem>
    );
  }

  return (
    <Menu
      id="friends-list"
      anchorEl={props.anchorElement}
      open={Boolean(props.anchorElement)}
      onClose={props.onClose}
      PaperProps={{
        style: {
          maxHeight: 500,
          width: 350
        }
      }}
    >
      {friendRequests}
    </Menu>
  );
};

friendRequestsList.propTypes = {
  anchorElement: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  friendRequests: PropTypes.array.isRequired,
  classes: PropTypes.object,
  onAccept: PropTypes.func.isRequired,
  onDecline: PropTypes.func.isRequired
};

export default withStyles(styles)(friendRequestsList);
