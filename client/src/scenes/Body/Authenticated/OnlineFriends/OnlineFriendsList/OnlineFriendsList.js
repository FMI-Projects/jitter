import React from "react";
import PropTypes from "prop-types";
import Paper from "material-ui/Paper";
import { withStyles } from "material-ui/styles";
import { Typography, Icon } from "material-ui";

import ToJs from "hoc/ToJs/ToJs";
import styles from "./OnlineFriendsList.styles";
import OnlineFriend from "./OnlineFriend/OnlineFriend";

const onlineFriendsList = props => (
  <Paper className={props.classes.paper}>
    <Typography className={props.classes.label} variant="body2">
      <Icon className={props.classes.icon}>group</Icon>
      <div className={props.classes.online}>Online Friends</div>
    </Typography>
    <hr />
    {props.friends.map(f => <OnlineFriend key={f} id={f} />)}
  </Paper>
);

onlineFriendsList.propTypes = {
  classes: PropTypes.object.isRequired,
  friends: PropTypes.array.isRequired
};
export default withStyles(styles)(ToJs(onlineFriendsList));
