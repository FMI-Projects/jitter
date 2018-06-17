import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Spinner from "components/UI/Spinner/Spinner.js";

import LikesContent from "./LikesContent/LikesContent";

import * as actions from "store/actions";

class PostLikes extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    postId: PropTypes.string.isRequired,
    likePost: PropTypes.func.isRequired,
    getPostLikes: PropTypes.func.isRequired,
    deletePostLike: PropTypes.func.isRequired,
    likes: PropTypes.array,
    loading: PropTypes.bool,
    currentUserId: PropTypes.string,
    likeId: PropTypes.string,
    likesCount: PropTypes.number,
    dislikesCount: PropTypes.number,
    userReaction: PropTypes.string
  };

  componentDidMount() {
    this.props.getPostLikes(this.props.postId);
  }

  handleLikeClick = reaction => {
    if (!this.props.userReaction) {
      this.props.likePost(this.props.postId, reaction);
    } else {
      this.props.deletePostLike(this.props.postId);
    }
  };

  render() {
    const { loading } = this.props;
    let likesCount = <Spinner size={10} />;
    let dislikesCount = <Spinner size={10} />;

    const likeColor =
      this.props.userReaction === "Like" ? "primary" : "disabled";
    const dislikeColor =
      this.props.userReaction === "Dislike" ? "primary" : "disabled";

    if (loading === false) {
      likesCount = this.props.likesCount;
      dislikesCount = this.props.dislikesCount;
    }

    return (
      <LikesContent
        handleLikeClick={this.handleLikeClick}
        likeColor={likeColor}
        dislikeColor={dislikeColor}
        likesCount={likesCount}
        dislikesCount={dislikesCount}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const post = state.getIn(["posts", "posts", "byId", ownProps.postId]);

  return {
    loading: post.get("likesLoading"),
    likesLoaded: post.get("likesLoaded"),
    likesCount: post.getIn(["reactionsCount", "Like"]) || 0,
    dislikesCount: post.getIn(["reactionsCount", "Dislike"]) || 0,
    userReaction: post.get("userReaction")
  };
};

const mapDispatchToProps = dispatch => {
  return {
    likePost: (postId, reaction) =>
      dispatch(actions.postsLike(postId, reaction)),
    getPostLikes: postId => dispatch(actions.postsLikesGet(postId)),
    deletePostLike: postId => dispatch(actions.postsLikeDelete(postId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostLikes);
