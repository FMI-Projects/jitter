import React, {Component} from "react";
import PropTypes from "prop-types";

import {connect} from "react-redux";
import * as actions from "../../../../store/actions";

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
        {commentsList.map(comment => {
          return (
            <div key={comment._id}>
              <h6>
                {comment.author.firstName} {comment.author.lastName}
              </h6>
              <h6>{comment.content}</h6>
            </div>
          );
        })}
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
