import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Field } from "redux-form";
import { withStyles } from "material-ui/styles";
import Button from "material-ui/Button";
import Grid from "material-ui/Grid";
import Card, { CardHeader } from "material-ui/Card";
import { TextField } from "redux-form-material-ui";

import {
  required,
  postTitleMinLength,
  postContentMaxLength
} from "utilities/validation";
import Spinner from "../../../UI/Spinner/Spinner";
import FileInput from "../../../UI/Fields/ImagePreview/ImagePreview";
import { validImageType, validImageSize } from "utilities/validation";
import styles from "./PostFormContent.styles";

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
      <div style={{ display: props.submitting ? "none" : "block" }}>
        <Grid container>
          <Card className={props.classes.card}>
            <CardHeader
              classes={{ title: props.classes.cardTitle }}
              title={props.formTitle}
            />
          </Card>
        </Grid>
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
              defaultValue={props.content}
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
              id="imageFile"
              name="imageFile"
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
            type="submit"
          >
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
  formTitle: PropTypes.string.isRequired,
  title: PropTypes.string,
  content: PropTypes.string
};

export default withStyles(styles)(postForm);
