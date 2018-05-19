import React, { Component } from "react";
import PropTypes from "prop-types";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";

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
    postId: PropTypes.string.isRequired,
    submitSucceeded: PropTypes.bool.isRequired,
    reset: PropTypes.func.isRequired
  };

  componentDidUpdate() {
    if (this.props.submitSucceeded) {
      this.props.reset();
    }
  }

  render() {
    // TODO add extra logic here for comment editing
    const { formName, handleSubmit, submitting, error } = this.props;
    const submit = handleSubmit(actions.postCommentCreate);

    return (
      <CommentFormContent
        formName={formName}
        onSubmit={submit}
        submitting={submitting}
        error={error}
      />
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    form: ownProps.formName,
    initialValues: {
      postId: ownProps.postId,
      content: ownProps.content
    }
  };
}

export default connect(mapStateToProps)(reduxForm({})(CommentForm));
