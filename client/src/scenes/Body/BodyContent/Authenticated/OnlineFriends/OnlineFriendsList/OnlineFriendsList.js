import React from "react";
import PropTypes from "prop-types";
import Paper from "material-ui/Paper";
import { withStyles } from "material-ui/styles";
import { Typography } from "material-ui";

import styles from "./OnlineFriendsList.styles";
import OnlineFriend from "./OnlineFriend/OnlineFriend";

const onlineFriendsList = props => (
  <Paper className={props.classes.paper}>
    <Typography className={props.classes.label} variant="body2">
      <i className={["material-icons", props.classes.icon].join(" ")}>
        group
      </i>
      <div className={props.classes.online}>Online Friends</div>
    </Typography>
    <hr />
    {props.friends.map(t => <OnlineFriend key={t.firstName} />)}
  </Paper>
);

onlineFriendsList.propTypes = {
  classes: PropTypes.object.isRequired,
  friends: PropTypes.array.isRequired
};
export default withStyles(styles)(onlineFriendsList);
