import React from "react";
import Typography from "material-ui/Typography";

import NavLink from "../NavLink/NavLink";

const appLogo = props => (
  <NavLink to="/">
    <Typography variant="title" color="inherit">
      Jitter
    </Typography>
  </NavLink>
);

export default appLogo;
