import React from "react";
import Typography from "material-ui/Typography";

import NavLink from "../NavigationItems/NavigationItem/NavLink/NavLink";

const logo = props => (
    <Typography variant="title" color="inherit">
      <NavLink to="/">
      Jitter
      </NavLink>
    </Typography>
);

export default logo;
