import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";

import styles from "./Toolbar.styles";
import NavigationItems from "./NavigationItems/NavigationItems";
import Logo from "./Logo/Logo";

const toolbar = props => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <div className={classes.logo}>
            <Logo />
          </div>
          <NavigationItems />
        </Toolbar>
      </AppBar>
    </div>
  );
};

toolbar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(toolbar);
