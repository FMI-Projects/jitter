import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles } from "material-ui/styles";

import styles from "./ProfileSearchList.styles";
import ProfileSearchItem from "./ProfileSearchItem";

const ProfileSearchList = props => (
  <ul className={props.classes.widget}>
    {props.profilesList.size === 0 && props.loaded ? (
      <li className={props.classes.message}>No profiles found...</li>
    ) : (
      props.profilesList.map(p => (
        <li
          key={p}
          onClick={() => props.onItemClick(p)}
          className={props.classes.menuItem}
        >
          <ProfileSearchItem profileId={p} />
        </li>
      ))
    )}
  </ul>
);

ProfileSearchList.propTypes = {
  classes: PropTypes.object.isRequired,
  profilesList: PropTypes.object.isRequired,
  onItemClick: PropTypes.func.isRequired,
  loaded: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  return {
    profilesList: state.getIn(["search", "profilesList"]),
    loaded: state.getIn(["search", "loaded"])
  };
};

export default connect(mapStateToProps)(withStyles(styles)(ProfileSearchList));
