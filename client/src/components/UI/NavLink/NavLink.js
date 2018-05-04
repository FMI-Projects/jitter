import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import { Link } from "react-router-dom";

import styles from "./NavLink.styles";

const navLink = props => (
  <Link className={props.classes.appLink} to={props.to}>
    {props.children}
  </Link>
);

navLink.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(navLink);
