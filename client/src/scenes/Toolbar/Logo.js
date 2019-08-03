import React from "react";
import Typography from "material-ui/Typography";

import NavLink from "./NavLink";

const Logo = props => (
  <Typography variant="title" color="inherit">
    <NavLink to="/">Jitter</NavLink>
  </Typography>
);

export default Logo;
