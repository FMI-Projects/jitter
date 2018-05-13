import React, {Component} from "react";
import PropTypes from "prop-types";

import {connect} from "react-redux";
import * as actions from "../../../../store/actions";

import CommentsList from "./CommentsList/CommentsList";

class Comments extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    postId: PropTypes.string,
    comments: PropTypes.object,
    postCommentsGet: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.postCommentsGet(this.props.postId);
  }

  render() {
    const {comments, postId} = this.props;
    const commentsList = comments[`${postId}`] ? comments[`${postId}`] : [];
    return (
      <div>
        <CommentsList comments={commentsList} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    comments: state.posts.comments
  };
};

const mapDispatchToProps = dispatch => {
  return {
    postCommentsGet: postId => dispatch(actions.postCommentsGet(postId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
