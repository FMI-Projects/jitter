import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Field } from "redux-form/immutable";
import { withStyles } from "material-ui/styles";
import Button from "material-ui/Button";
import { TextField } from "redux-form-material-ui";

import { required, commentContentMaxLength } from "utilities/validation";
import Spinner from "components/UI/Spinner/Spinner";
import styles from "./CommentFormContent.styles";

const CommentFormContent = props => {
  let spinner = null;

  if (props.submitting) {
    spinner = <Spinner size={20} />;
  }

  let errorMessage;
  if (props.error) {
    errorMessage = <div className={props.classes.error}>{props.error}</div>;
  }

  return (
    <Fragment>
      {spinner}
      <div style={{ display: props.submitting ? "none" : "block" }}>
        <form className={props.classes.form} onSubmit={props.onSubmit}>
          {errorMessage}
          <div>
            <Field
              className={props.classes.textField}
              name="content"
              defaultValue={props.content}
              component={TextField}
              validate={[required, commentContentMaxLength]}
              margin="dense"
              label={props.annotation}
            />
          </div>
          <Button
            className={props.classes.button}
            variant="raised"
            color="primary"
            type="submit"
          >
            Submit
          </Button>
        </form>
      </div>
    </Fragment>
  );
};

CommentFormContent.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  error: PropTypes.string,
  classes: PropTypes.object.isRequired,
  submitting: PropTypes.bool.isRequired,
  content: PropTypes.string,
  annotation: PropTypes.string
};

export default withStyles(styles)(CommentFormContent);
