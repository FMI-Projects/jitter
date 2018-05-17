import React, { Component } from "react";
import PropTypes from "prop-types";
import { reduxForm } from "redux-form";

import * as actions from "store/actions";
import PostFormContent from "./PostFormContent/PostFormContent";

class PostForm extends Component {
  static propTypes = {
    submitSucceeded: PropTypes.bool.isRequired,
    onSubmitted: PropTypes.func,
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    error: PropTypes.string
  };

  componentDidUpdate() {
    if (this.props.submitSucceeded && this.props.onSubmitted) {
      this.props.onSubmitted();
    }
  }

  render() {
    const { handleSubmit, submitting, error } = this.props;
    const submit = handleSubmit(actions.postCreate);

    return (
      <PostFormContent
        onSubmit={submit}
        submitting={submitting}
        error={error}
      />
    );
  }
}

export default reduxForm({ form: "post" })(PostForm);
