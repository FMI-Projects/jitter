import React from "react";
import Typography from "material-ui/Typography";

import NavLink from "../NavLink/NavLink";

const logo = props => (
    <Typography variant="title" color="inherit">
      <NavLink to="/">
      Jitter
      </NavLink>
    </Typography>
);

export default logo;
