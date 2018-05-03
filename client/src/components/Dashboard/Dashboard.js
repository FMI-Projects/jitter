import React from "react";
import PropTypes from "prop-types";

import {withStyles} from "material-ui/styles";

import Paper from "material-ui/Paper";
import Typography from "material-ui/Typography";

import styles from "./Dashboard.styles";

const dashboard = ({classes}) => {
  return (
    <div>
      <Paper elevation={4} className={classes.paper}>
        <Typography variant="headline" component="h3">
          Error 404!
        </Typography>
        <Typography variant="headline" component="h3">
          Website under construction!
        </Typography>
      </Paper>
    </div>
  );
};

dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(dashboard);
