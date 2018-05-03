import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";

import styles from "./Navigation.styles";
import NavigationItems from "./NavigationItems/NavigationItems";
import AppLogo from "./AppLogo/AppLogo";

const navigation = props => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <div className={classes.logo}>
            <AppLogo />
          </div>
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
