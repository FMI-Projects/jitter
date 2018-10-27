import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import LikesContent from "./LikesContent/LikesContent";

import * as actions from "store/actions";

class PostLikes extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    postId: PropTypes.string.isRequired,
    likePost: PropTypes.func.isRequired,
    deletePostLike: PropTypes.func.isRequired,
    likes: PropTypes.array,
    loading: PropTypes.bool,
    currentUserId: PropTypes.string,
    likeId: PropTypes.string,
    likesCount: PropTypes.number,
    dislikesCount: PropTypes.number,
    userReaction: PropTypes.string
  };

  handleLikeClick = reaction => {
    if (this.props.userReaction === reaction) {
      this.props.deletePostLike(this.props.postId);
    } else {
      this.props.likePost(this.props.postId, reaction);
    }
  };

  render() {
    return (
      <LikesContent
        handleLikeClick={this.handleLikeClick}
        likesCount={this.props.likesCount}
        dislikesCount={this.props.dislikesCount}
        userReaction={this.props.userReaction}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const post = state.getIn(["posts", "posts", "byId", ownProps.postId]);

  return {
    likesCount: post.getIn(["reactionsCount", "Like"]),
    dislikesCount: post.getIn(["reactionsCount", "Dislike"]),
    userReaction: post.get("userReaction")
  };
};

const mapDispatchToProps = dispatch => {
  return {
    likePost: (postId, reaction) =>
      dispatch(actions.postsLike(postId, reaction)),
    deletePostLike: postId => dispatch(actions.postsLikeDelete(postId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostLikes);
