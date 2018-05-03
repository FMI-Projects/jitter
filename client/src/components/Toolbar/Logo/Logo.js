import React from "react";
import Typography from "material-ui/Typography";

import NavLink from "../../UI/NavLink/NavLink";

const logo = props => (
  <NavLink to="/">
    <Typography variant="title" color="inherit">
      Jitter
    </Typography>
  </NavLink>
);

export default logo;
