import React, {Component} from "react";
import PropTypes from "prop-types";
// import styles from "./Posts.css";

import {connect} from "react-redux";
import * as actions from "../../store/actions";

class Posts extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    posts: PropTypes.arrayOf(PropTypes.object),
    userPostsGet: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.userPostsGet();
  }

  render() {
    const {posts} = this.props;
    return (
      <div>
        <ul>
          {posts.map(post => {
            return (
              <div key={post._id}>
                <li>
                  <h3>{post.title}</h3>
                </li>
              </div>
            );
          })}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    posts: state.posts.posts
  };
};

const mapDispatchToProps = dispatch => {
  return {
    userPostsGet: () => dispatch(actions.userPostsGet())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
