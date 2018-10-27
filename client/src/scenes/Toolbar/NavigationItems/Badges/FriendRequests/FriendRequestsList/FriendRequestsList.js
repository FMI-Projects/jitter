import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Menu, { MenuItem } from "material-ui/Menu";
import Avatar from "material-ui/Avatar";
import Button from "material-ui/Button";
import { withStyles } from "material-ui/styles";
import defaultUserImage from "assets/images/defaultUser.png";
import { Link } from "react-router-dom";

import ToJs from "hoc/ToJs/ToJs";
import styles from "./FriendRequestsList.styles";

const friendRequestsList = props => {
  let friendRequests = null;

  if (props.friendRequests.length > 0) {
    friendRequests = props.friendRequests.map(friend => (
      <Fragment key={friend._id}>
        <div className={props.classes.friendRequest}>
          <Avatar
            src={
              friend.profilePictureUrl
                ? friend.profilePictureUrl
                : defaultUserImage
            }
          />
          <Link className={props.classes.profileLink} to={`/profile/${friend._id}`}>
            <div className={props.classes.friendNames}>
              {friend.firstName} {friend.lastName}
            </div>
          </Link>
        </div>
        <div className={props.classes.friendRequestAction}>
          <Button color="primary" onClick={() => props.onAccept(friend._id)}>
            ACCEPT
          </Button>
          <Button color="secondary" onClick={() => props.onDecline(friend._id)}>
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

export default withStyles(styles)(ToJs(friendRequestsList));
