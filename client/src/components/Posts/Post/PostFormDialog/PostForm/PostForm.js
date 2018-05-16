import React, {Fragment} from "react";
import PropTypes from "prop-types";
import {Field} from "redux-form";
import {withStyles} from "material-ui/styles";
import Button from "material-ui/Button";
import {TextField} from "redux-form-material-ui";

import {
  required,
  postTitleMinLength,
  postContentMaxLength
} from "../../../../../utilities/validation";

import Spinner from "../../../../../components/UI/Spinner/Spinner";
import FileInput from "../../../../../components/UI/Fields/ImagePreview/ImagePreview";
import {
  validImageType,
  validImageSize
} from "../../../../../utilities/validation";

import styles from "./PostForm.styles";

const postForm = props => {
  let spinner = null;

  if (props.submitting) {
    spinner = <Spinner size={50} />;
  }

  let errorMessage;
  if (props.error) {
    errorMessage = <div className={props.classes.error}>{props.error}</div>;
  }

  return (
    <Fragment>
      {spinner}
      <div style={{display: props.submitting ? "none" : "block"}}>
        <form className={props.classes.form} onSubmit={props.onSubmit}>
          {errorMessage}
          <div>
            <Field
              className={props.classes.textField}
              name="title"
              component={TextField}
              label="Title"
              validate={[required, postTitleMinLength]}
            />
          </div>
          <div>
            <Field
              className={props.classes.textField}
              name="content"
              component={TextField}
              validate={[postContentMaxLength]}
              margin="dense"
              label="What's jittering?"
              multiline
              rows={4}
            />
          </div>
          <div className={props.classes.imageField}>
            <Field
              id="imageUrl"
              name="imageUrl"
              defaultPicture=""
              height="200px"
              width="200px"
              component={FileInput}
              validate={[validImageSize, validImageType]}
              label="Add image"
            />
          </div>
          <Button
            className={props.classes.button}
            variant="raised"
            color="primary"
            type="submit">
            Post
          </Button>
        </form>
      </div>
    </Fragment>
  );
};

postForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  error: PropTypes.string,
  classes: PropTypes.object.isRequired,
  submitting: PropTypes.bool.isRequired,
  submitted: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired
};

export default withStyles(styles)(postForm);
