import React from "react";
import PropTypes from "prop-types";
import {reduxForm} from "redux-form";

import * as actions from "../../../../store/actions";
import PostForm from "../PostForm";

const createPost = props => {
  const {handleSubmit} = props;
  const submit = handleSubmit(actions.postCreate);

  return (
    <PostForm
      onSubmit={submit}
      error={props.error}
      submitting={props.submitting}
    />
  );
};

createPost.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.string,
  submitting: PropTypes.bool.isRequired
};

export default reduxForm({form: "createPost"})(createPost);
