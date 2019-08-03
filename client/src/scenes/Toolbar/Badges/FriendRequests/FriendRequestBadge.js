import React from "react";
import PropTypes from "prop-types";
import Badge from "material-ui/Badge";
import { Icon } from "material-ui";
import { withStyles } from "material-ui/styles";
import Tooltip from "material-ui/Tooltip";

import styles from "./FriendRequestBadge.styles";

const FriendRequestBadge = props => {
  return (
    <Tooltip title="Friend requests">
      <div onClick={props.onClick} className={props.classes.friendRequestBadge}>
        <Badge badgeContent={props.unseenFriendshipsCount} color="secondary">
          <Icon>group</Icon>
        </Badge>
      </div>
    </Tooltip>
  );
};

FriendRequestBadge.propTypes = {
  onClick: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  unseenFriendshipsCount: PropTypes.number.isRequired
};

export default withStyles(styles)(FriendRequestBadge);
