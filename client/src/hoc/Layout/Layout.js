import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Toolbar from "../../components/Toolbar/Toolbar";
import ProfileModal from "../../containers/Main/ProfileModal/ProfileModal";

class Layout extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    firstLogIn: PropTypes.bool.isRequired
  };

  render() {
    let profileModal = null;

    if (this.props.isAuthenticated && this.props.firstLogIn) {
      profileModal = <ProfileModal />;
    }

    return (
      <Fragment>
        <Toolbar />
        <main>{this.props.children}</main>
        {profileModal}
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.authenticated,
    firstLogIn: state.auth.firstLogin
  };
};

export default connect(mapStateToProps)(Layout);
