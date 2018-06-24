import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import * as actions from "store/actions";

class Home extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    newsFeedGet: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.newsFeedGet();
  }

  render() {
    return <h1>Empty home :(</h1>;
  }
}

const mapStateToProps = state => {
  return {
    loading: state.getIn(["posts", "loading"])
  };
};

const mapDispatchToProps = dispatch => {
  return {
    newsFeedGet: () => dispatch(actions.newsFeedGet())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
