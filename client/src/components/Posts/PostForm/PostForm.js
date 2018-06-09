import React, { Component } from "react";
import PropTypes from "prop-types";
import { reduxForm } from "redux-form/immutable";
import { connect } from "react-redux";
import { Map } from "immutable";

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
    formName: PropTypes.string
  };

  componentDidUpdate() {
    if (this.props.submitSucceeded && this.props.onSubmitted) {
      this.props.onSubmitted();
    }
  }

  render() {
    const {
      formName,
      formTitle,
      handleSubmit,
      submitting,
      error,
      imageUrl
    } = this.props;
    let submit;
    if (formName === "createPost") {
      submit = handleSubmit(actions.postCreate);
    } else if (formName === "updatePost") {
      submit = handleSubmit(actions.postUpdate);
    }

    return (
      <PostFormContent
        formTitle={formTitle}
        onSubmit={submit}
        imageUrl={imageUrl}
        submitting={submitting}
        error={error}
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
      title: ownProps.title,
      content: ownProps.content,
      imageUrl: ownProps.imageUrl,
      author
    }
  };
}

export default connect(mapStateToProps)(reduxForm({})(PostForm));
