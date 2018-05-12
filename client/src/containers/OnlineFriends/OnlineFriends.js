import React, { Component } from "react";
import PropTypes from "prop-types";
import Paper from "material-ui/Paper";
import { withStyles } from "material-ui/styles";
import { Typography } from "material-ui";

import styles from "./OnlineFriends.styles";
import OnlineFriend from "../../components/OnlineFriends/OnlineFriend";

class OnlineFriends extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  };

  render() {
    const testOnlineFriends = [
      {
        firstName: "Test",
        lastName: "LastName"
      },
      {
        firstName: "Test2",
        lastName: "LastName2"
      }
    ];

    return (
      <Paper className={this.props.classes.paper}>
        <Typography className={this.props.classes.label} variant="body2">
          <i className={["material-icons", this.props.classes.icon].join(" ")}>
            group
          </i>
          <div className={this.props.classes.online}>Online Friends</div>
        </Typography>
        <hr />
        {testOnlineFriends.map(t => <OnlineFriend key={t.firstName} />)}
      </Paper>
    );
  }
}

export default withStyles(styles)(OnlineFriends);
