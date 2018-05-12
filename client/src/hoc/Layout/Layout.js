import React, { Fragment } from "react";
import PropTypes from "prop-types";

import Body from "../../containers/Body/Body";
import Toolbar from "../../components/Toolbar/Toolbar";

const layout = props => (
  <Fragment>
    <Toolbar />
    <Body>{props.children}</Body>
  </Fragment>
);

layout.propTypes = {
  children: PropTypes.element.isRequired
};

export default layout;
