import React from "react";
import PropTypes from "prop-types";
import {reduxForm} from "redux-form";

import * as actions from "../../../store/actions";
import PostFormDialog from "./PostFormDialog/PostFormDialog";

const createPost = props => {
  const {handleSubmit, error, submitting} = props;
  const submit = handleSubmit(actions.postCreate);

  return (
    <PostFormDialog submit={submit} error={error} submitting={submitting} />
  );
};

createPost.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.string,
  submitting: PropTypes.bool.isRequired
};

export default reduxForm({form: "createPost"})(createPost);
