import React, {Component} from "react";
import PropTypes from "prop-types";

import {connect} from "react-redux";
import * as actions from "../../../../store/actions";

import CommentsList from "./CommentsList/CommentsList";
import Spinner from "../../../UI/Spinner/Spinner";

class Comments extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    postId: PropTypes.string,
    comments: PropTypes.object,
    postCommentsGet: PropTypes.func.isRequired,
    loading: PropTypes.bool
  };

  componentDidMount() {
    this.props.postCommentsGet(this.props.postId);
  }

  render() {
    const {comments, loading, postId} = this.props;
    let commentsList = <Spinner />;

    if (loading === false) {
      const currentComments = comments[`${postId}`]
        ? comments[`${postId}`]
        : [];
      commentsList = <CommentsList comments={currentComments.comments} />;
    }

    return <div>{commentsList}</div>;
  }
}

const mapStateToProps = (state, ownProps) => {
  const isLoading = state.posts.comments[ownProps.postId];
  let loading;
  if (isLoading) {
    loading = isLoading.loading;
  }
  return {
    comments: state.posts.comments,
    loading: loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    postCommentsGet: postId => dispatch(actions.postCommentsGet(postId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
