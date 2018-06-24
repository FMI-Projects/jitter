import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import OnClickOutside from "react-onclickoutside";

import * as actions from "store/actions";
import styles from "./ProfileSearch.styles";
import ProfileSearchList from "./ProfileSearchList/ProfileSearchList";

class ProfileSearch extends Component {
  static propTypes = {
    searchClear: PropTypes.func.isRequired,
    searchGet: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
  };

  state = {
    searchText: "",
    isListVisible: false
  };

  handleTextChange = e => {
    const searchText = e.target.value;

    if (searchText.length === 0) {
      this.props.searchClear();
    } else {
      this.props.searchGet(searchText);
    }

    this.setState({ searchText });
  };

  displayList = () => {
    this.setState({ isListVisible: true });
  };

  handleClickOutside = () => {
    this.setState({ isListVisible: false });
  };

  onProfileClick = p => {
    this.props.history.push(`/profile/${p}`);
    this.setState({ isListVisible: false, searchText: "" });
  };

  render() {
    return (
      <div className={this.props.classes.search}>
        <input
          type="text"
          autoComplete="off"
          id="search"
          placeholder="Search..."
          className={this.props.classes.searchInput}
          value={this.state.searchText}
          onChange={this.handleTextChange}
          onFocus={this.displayList}
        />
        {this.state.isListVisible && this.state.searchText.length > 0 ? (
          <ProfileSearchList onItemClick={this.onProfileClick} />
        ) : null}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    searchGet: searchQuery => dispatch(actions.searchGet(searchQuery)),
    searchClear: () => dispatch(actions.searchClear())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(withRouter(withStyles(styles)(OnClickOutside(ProfileSearch))));
