import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";

import Toolbar from "../../components/Toolbar/Toolbar";

class Layout extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  render() {
    return (
      <Fragment>
        <Toolbar />
        <main>{this.props.children}</main>
      </Fragment>
    );
  }
}

export default Layout;
