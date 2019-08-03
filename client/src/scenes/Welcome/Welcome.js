import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "material-ui/styles";

import Paper from "material-ui/Paper";
import Typography from "material-ui/Typography";

import styles from "./Welcome.styles";

const Welcome = ({ classes }) => {
  return (
    <div>
      <Paper elevation={4} className={classes.paper}>
        <Typography variant="headline" component="h3">
          Welcome to Jitter!
        </Typography>
      </Paper>
    </div>
  );
};

Welcome.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Welcome);
