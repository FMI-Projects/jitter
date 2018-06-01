import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import * as actions from "store/actions";

import CommentsList from "./CommentsList/CommentsList";
import Spinner from "../../../UI/Spinner/Spinner";

class Comments extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    postId: PropTypes.string,
    comments: PropTypes.array,
    postCommentsGet: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    currentUserId: PropTypes.string.isRequired
  };

  componentDidMount() {
    this.props.postCommentsGet(this.props.postId);
  }

  render() {
    const { comments, loading, currentUserId } = this.props;
    let commentsList = <Spinner size={50} />;

    if (loading === false) {
      commentsList = (
        <CommentsList
          postId={this.props.postId}
          comments={comments}
          currentUserId={currentUserId}
        />
      );
    }

    return <div>{commentsList}</div>;
  }
}

const mapStateToProps = (state, ownProps) => {
  const post = state.posts.posts.find(p => p._id === ownProps.postId);

  return {
    comments: post.comments,
    loading: post.loading,
    currentUserId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    postCommentsGet: postId => dispatch(actions.postCommentsGet(postId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
