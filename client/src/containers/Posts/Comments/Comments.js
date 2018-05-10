import React, {Component} from "react";
import PropTypes from "prop-types";

import {connect} from "react-redux";
import * as actions from "../../../store/actions";

class Comments extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    postId: PropTypes.string,
    comments: PropTypes.array,
    postCommentsGet: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.postCommentsGet(this.props.postId);
  }

  render() {
    const {comments} = this.props;
    return (
      <div>
        {comments.map(comment => {
          return (
            <div key={comment._id}>
              {/*<p>
                {comments.author.firstName} {comments.author.lastName}
              </p>*/}
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
