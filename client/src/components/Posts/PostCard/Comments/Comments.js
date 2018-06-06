import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import * as actions from "store/actions";

import CommentsList from "../../../Comments/CommentsList/CommentsList";
import CommentForm from "../../../Comments/CommentForm/CommentForm";
import Spinner from "../../../UI/Spinner/Spinner";

class Comments extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    postId: PropTypes.string,
    comments: PropTypes.array,
    postsCommentsGet: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    currentUserId: PropTypes.string.isRequired
  };

  componentDidMount() {
    this.props.postsCommentsGet(this.props.postId);
  }

  render() {
    const { comments, loading, currentUserId, postId } = this.props;
    let commentsList = <Spinner size={50} />;

    if (loading === false) {
      commentsList = (
        <Fragment>
          <CommentsList
            postId={postId}
            comments={comments}
            currentUserId={currentUserId}
          />
          <CommentForm
            postId={postId}
            formName={`createComment-${postId}`}
            annotation="Write a comment"
          />
        </Fragment>
      );
    }

    return <div>{commentsList}</div>;
  }
}

const mapStateToProps = (state, ownProps) => {
  const post = state.posts.posts.find(p => p._id === ownProps.postId);

  return {
    comments: post.comments,
    loading: post.commentsLoading,
    currentUserId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    postsCommentsGet: postId => dispatch(actions.postsCommentsGet(postId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comments);
