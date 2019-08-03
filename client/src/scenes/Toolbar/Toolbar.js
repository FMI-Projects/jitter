import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import AppBar from "material-ui/AppBar";
import MaterialToolbar from "material-ui/Toolbar";

import styles from "./Toolbar.styles";
import NavigationItems from "./NavigationItems";
import Logo from "./Logo";
import ToolbarItems from "./ToolbarItems";

const Toolbar = props => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <MaterialToolbar>
          <Logo />
          <div className={classes.toolbarItems}>
            <ToolbarItems />
          </div>
          <NavigationItems />
        </MaterialToolbar>
      </AppBar>
    </div>
  );
};

Toolbar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Toolbar);
