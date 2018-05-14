import React, {Fragment} from "react";
import PropTypes from "prop-types";
import {Field} from "redux-form";
import {withStyles} from "material-ui/styles";
import Button from "material-ui/Button";
import {TextField} from "redux-form-material-ui";

import {required, postTitleMinLength} from "../../../utilities/validation";
import Spinner from "../../../components/UI/Spinner/Spinner";

import BaseForm from "../../UI/Forms/BaseForm/BaseForm";
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
      <BaseForm
        style={{display: props.submitting ? "none" : "block"}}
        title="Post">
        <form className={props.classes.form} onSubmit={props.onSubmit}>
          {errorMessage}
          <div>
            <Field
              className={props.classes.textField}
              name="title"
              component={TextField}
              label="title"
              validate={[required, postTitleMinLength]}
            />
          </div>
          <div>
            <Field
              className={props.classes.textField}
              name="content"
              component={TextField}
              margin="dense"
              label="content"
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
      </BaseForm>
    </Fragment>
  );
};

postForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  error: PropTypes.string,
  classes: PropTypes.object.isRequired,
  submitting: PropTypes.bool.isRequired
};

export default withStyles(styles)(postForm);
