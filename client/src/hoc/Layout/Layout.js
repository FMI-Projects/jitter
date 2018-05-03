import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";

import Navigation from "../../components/Navigation/Navigation";

class Layout extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  render() {
    return (
      <Fragment>
        <Navigation />
        <main>{this.props.children}</main>
      </Fragment>
    );
  }
}

export default Layout;
