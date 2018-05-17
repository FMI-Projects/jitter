import React, {Component} from "react";
import PropTypes from "prop-types";
import {reduxForm} from "redux-form";
import {connect} from "react-redux";

import * as actions from "store/actions";
import PostFormContent from "./PostFormContent/PostFormContent";

class PostForm extends Component {
  static propTypes = {
    submitSucceeded: PropTypes.bool.isRequired,
    onSubmitted: PropTypes.func,
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    error: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
    imageUrl: PropTypes.string,
    formTitle: PropTypes.string.isRequired,
    initialize: PropTypes.func.isRequired
  };

  componentDidUpdate() {
    if (this.props.submitSucceeded && this.props.onSubmitted) {
      this.props.onSubmitted();
    }
  }

  render() {
    const {
      title,
      content,
      formTitle,
      handleSubmit,
      submitting,
      error
    } = this.props;
    const submit = handleSubmit(actions.postCreate);

    return (
      <PostFormContent
        formTitle={formTitle}
        onSubmit={submit}
        submitting={submitting}
        error={error}
      />
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    initialValues: {
      title: ownProps.title,
      content: ownProps.content
    }
  };
}

export default connect(mapStateToProps)(reduxForm({form: "post"})(PostForm));
