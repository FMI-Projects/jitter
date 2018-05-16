import React, {Component, Fragment} from "react";
import PropTypes from "prop-types";
import {reduxForm} from "redux-form";

import * as actions from "../../../store/actions";
import PostFormDialog from "./PostFormDialog/PostFormDialog";

class CreatePost extends Component {
  render() {
    const {handleSubmit, error, submitting} = this.props;
    const submit = handleSubmit(actions.postCreate);

    return (
      <Fragment>
        <PostFormDialog
          submit={submit}
          error={error}
          submitting={submitting}
        />
      </Fragment>
    );
  }
}

CreatePost.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.string,
  submitting: PropTypes.bool.isRequired
};

export default reduxForm({form: "createPost"})(CreatePost);
