import React from "react";
import PropTypes from "prop-types";
import {reduxForm} from "redux-form";

import * as actions from "../../../store/actions";
import PostFormDialog from "./PostFormDialog/PostFormDialog";

const createPost = props => {
  const {handleSubmit, error, submitting, submitSucceeded, reset} = props;
  const submit = handleSubmit(actions.postCreate);

  return (
    <PostFormDialog
      submit={submit}
      error={error}
      submitting={submitting}
      submitted={submitSucceeded}
      reset={reset}
    />
  );
};

createPost.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.string,
  submitting: PropTypes.bool.isRequired,
  submitSucceeded: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired
};

export default reduxForm({
  form: "createPost"
})(createPost);
