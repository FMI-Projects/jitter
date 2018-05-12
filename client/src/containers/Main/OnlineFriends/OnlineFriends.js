import React, { Component } from "react";
import PropTypes from "prop-types";
import Paper from "material-ui/Paper";
import { withStyles } from "material-ui/styles";

import styles from "./OnlineFriends.styles";
import { Typography } from "material-ui";

class OnlineFriends extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  };

  render() {
    return (
      <Paper className={this.props.classes.paper}>
        <Typography variant="body2">
          <i className={["material-icons", this.props.classes.icon].join(" ")}>
            group
          </i>
          <div className={this.props.classes.online}>Online Friends</div>
        </Typography>
        <hr />
      </Paper>
    );
  }
}

export default withStyles(styles)(OnlineFriends);
