import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import * as actions from "store/actions";

import CommentsList from "components/Comments/CommentsList/CommentsList";
import CommentForm from "components/Comments/CommentForm/CommentForm";
import Spinner from "components/UI/Spinner/Spinner";

class Comments extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    postId: PropTypes.string,
    comments: PropTypes.object,
    postsCommentsGet: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    commentsLoaded: PropTypes.bool
  };

  componentDidMount() {
    if (!this.props.commentsLoaded) {
      this.props.postsCommentsGet(this.props.postId);
    }
  }

  render() {
    const { loading, postId } = this.props;
    let commentsList = <Spinner size={50} />;

    if (loading === false) {
      commentsList = (
        <Fragment>
          <CommentsList postId={postId} />
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
  const post = state.getIn(["posts", "posts", "byId", ownProps.postId]);

  return {
    loading: post.get("commentsLoading"),
    commentsLoaded: post.get("commentsLoaded")
  };
};

const mapDispatchToProps = dispatch => {
  return {
    postsCommentsGet: postId => dispatch(actions.postsCommentsGet(postId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
