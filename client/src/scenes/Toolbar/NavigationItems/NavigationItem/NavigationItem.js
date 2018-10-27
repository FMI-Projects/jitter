import React from "react";
import PropTypes from "prop-types";
import Button from "material-ui/Button";

import NavLink from "../../NavLink/NavLink";

const navigationItem = props => (
  <NavLink to={props.link}>
    <Button color="inherit">{props.children}</Button>
  </NavLink>
);

navigationItem.propTypes = {
  link: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default navigationItem;
