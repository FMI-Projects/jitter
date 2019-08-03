import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import * as actions from "store/actions";

import Grid from "material-ui/Grid";

import NewsFeed from "./NewsFeed";
import Spinner from "components/UI/Spinner/Spinner";

class Home extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    newsFeedGet: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.newsFeedGet();
  }

  render() {
    let home = <Spinner />;

    if (this.props.loading === false) {
      home = (
        <Grid container>
          <Grid item sm={3} />
          <Grid item sm={9}>
            <NewsFeed />
          </Grid>
        </Grid>
      );
    }

    return home;
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
