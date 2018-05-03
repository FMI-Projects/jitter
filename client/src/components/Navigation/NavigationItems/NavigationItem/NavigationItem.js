import React from "react";
import PropTypes from "prop-types";
import Button from "material-ui/Button";
import { Link } from "react-router-dom";
import { withStyles } from "material-ui/styles";

import styles from "./NavigationItem.styles";

const navigationItem = props => (
  <Link
    className={props.classes.navLink}
    exact
    to={props.link}
  >
    <Button color="inherit">{props.children}</Button>
  </Link>
);

navigationItem.propTypes = {
  link: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(navigationItem);
