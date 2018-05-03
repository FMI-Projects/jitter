import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";

import styles from "./Navigation.styles";
import NavigationItems from "./NavigationItems/NavigationItems";

const navigation = props => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="title" color="inherit" className={classes.flex}>
            Jitter
          </Typography>
          <NavigationItems />
        </Toolbar>
      </AppBar>
    </div>
  );
};

navigation.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(navigation);
