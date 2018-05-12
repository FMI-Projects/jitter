import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Grid from "material-ui/Grid";
import { withStyles } from "material-ui/styles";

import Toolbar from "../../components/Toolbar/Toolbar";
import ProfileModal from "../../containers/Main/ProfileModal/ProfileModal";
import OnlineFriends from "../../containers/Main/OnlineFriends/OnlineFriends";
import styles from "./Layout.styles";

class Layout extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    firstLogIn: PropTypes.bool.isRequired,
    classes: PropTypes.object.isRequired
  };

  render() {
    let profileModal = null;

    if (this.props.isAuthenticated && this.props.firstLogIn) {
      profileModal = <ProfileModal />;
    }

    let body = this.props.children;
    if (this.props.isAuthenticated) {
      body = (
        <Grid container>
          <Grid item sm={10}>
            {this.props.children}
          </Grid>
          <Grid item sm={2}>
            <OnlineFriends />
          </Grid>
        </Grid>
      );
    }

    return (
      <Fragment>
        <Toolbar />
        <main className={this.props.classes.main}>{body}</main>
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

export default withStyles(styles)(connect(mapStateToProps)(Layout));
