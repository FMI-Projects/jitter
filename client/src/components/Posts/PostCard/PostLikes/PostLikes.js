import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import IconButton from "material-ui/IconButton";
import Typography from "material-ui/Typography";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";

import * as formatLikes from "utilities/formatters/formatLikes";

import Spinner from "components/UI/Spinner/Spinner.js";

import * as actions from "store/actions";

class PostLikes extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    postId: PropTypes.string.isRequired,
    likePost: PropTypes.func.isRequired,
    getPostLikes: PropTypes.func.isRequired,
    likes: PropTypes.array,
    loading: PropTypes.bool,
    currentUserId: PropTypes.string.isRequired,
    likeId: PropTypes.string
  };

  componentDidMount() {
    this.props.getPostLikes(this.props.postId);
  }

  handleLikeClick = () => {
    this.props.likePost(this.props.postId, "Like");
  };

  render() {
    const { likes, loading } = this.props;
    let likesCount = <Spinner size={10} />;

    if (loading === false) {
      const text = formatLikes.getLikesTest(likes.length);
      likesCount = (
        <Typography variant="body2" gutterBottom>
          {`${likes.length} ${text}`} this
        </Typography>
      );
    }

    return (
      <div>
        {likesCount}
        <IconButton onClick={this.handleLikeClick} aria-label="Like">
          <ThumbUpIcon />
        </IconButton>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const post = state.posts.posts.find(p => p._id === ownProps.postId);
  let likeId;
  if (post.likes) {
    const like = post.likes.find(
      l => l.post === ownProps.postId && l.author._id === ownProps.currentUserId
    );
    if (like) {
      likeId = like._id;
    }
  }

  return {
    likes: post.likes,
    loading: post.likesLoading,
    likeId: likeId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    likePost: (postId, reaction) =>
      dispatch(actions.postsLike(postId, reaction)),
    getPostLikes: postId => dispatch(actions.postsLikesGet(postId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostLikes);