import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Grid from "material-ui/Grid";
import { withStyles } from "material-ui/styles";

import ProfileModal from "scenes/ProfileModal/ProfileModal";
import OnlineFriends from "scenes/OnlineFriends/OnlineFriends";
import styles from "./BodyContent.styles";

const BodyContent = props => {
  let body = props.children;

  if (props.isAuthenticated) {
    let profileModal = null;

    if (props.firstLogin) {
      profileModal = <ProfileModal />;
    }

    body = (
      <Fragment>
        <Grid container>
          <Grid item sm={10}>
            {props.children}
          </Grid>
          <Grid item sm={2}>
            <OnlineFriends />
          </Grid>
        </Grid>
        {profileModal}
      </Fragment>
    );
  }

  return <main className={props.classes.main}>{body}</main>;
};

BodyContent.propTypes = {
  children: PropTypes.element.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  firstLogin: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BodyContent);
