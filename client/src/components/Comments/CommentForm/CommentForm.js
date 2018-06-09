import React, { Component } from "react";
import PropTypes from "prop-types";
import { reduxForm } from "redux-form/immutable";
import { connect } from "react-redux";
import { Map } from "immutable";

import * as actions from "store/actions";
import CommentFormContent from "./CommentFormContent/CommentFormContent";

class CommentForm extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    formName: PropTypes.string.isRequired,
    error: PropTypes.string,
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    postId: PropTypes.string,
    submitSucceeded: PropTypes.bool.isRequired,
    reset: PropTypes.func.isRequired,
    onSubmitted: PropTypes.func,
    annotation: PropTypes.string
  };

  componentDidUpdate() {
    if (this.props.submitSucceeded) {
      this.props.reset();
      if (this.props.onSubmitted) {
        this.props.onSubmitted();
      }
    }
  }

  render() {
    const {
      formName,
      handleSubmit,
      submitting,
      error,
      annotation
    } = this.props;
    let submit;
    if (formName.startsWith("createComment")) {
      submit = handleSubmit(actions.postCommentCreate);
    } else if (formName.startsWith("editComment")) {
      submit = handleSubmit(actions.commentUpdate);
    }

    return (
      <CommentFormContent
        formName={formName}
        onSubmit={submit}
        submitting={submitting}
        error={error}
        annotation={annotation}
      />
    );
  }
}

function mapStateToProps(state, ownProps) {
  const author = new Map({
    _id: state.getIn(["auth", "userId"]),
    firstName: state.getIn(["userProfile", "firstName"]),
    lastName: state.getIn(["userProfile", "lastName"]),
    profilePictureUrl: state.getIn(["userProfile", "profilePictureUrl"])
  });

  return {
    form: ownProps.formName,
    initialValues: {
      _id: ownProps._id,
      postId: ownProps.postId,
      content: ownProps.content,
      author
    }
  };
}

export default connect(mapStateToProps)(reduxForm({})(CommentForm));
