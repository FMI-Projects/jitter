import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Field } from "redux-form";
import { withStyles } from "material-ui/styles";
import Button from "material-ui/Button";
import { TextField } from "redux-form-material-ui";

import Spinner from "../../../../../../components/UI/Spinner/Spinner";
import BaseForm from "../../../../../../components/UI/Forms/BaseForm/BaseForm";
import {
  required,
  email,
  passwordsMustMatch,
  emailMinLength,
  passwordMinLength,
  emailMaxLength,
  passwordMaxLength,
  firstNameMaxLength,
  lastNameMaxLength
} from "../../../../../../utilities/validation";
import styles from "../../../../../../components/UI/Forms/BaseForm/BaseForm.styles";

const registerForm = props => {
  let spinner = null;
  if (props.submitting) {
    spinner = <Spinner />;
  }

  let errorMessage;
  if (props.error) {
    errorMessage = <div className={props.classes.error}>{props.error}</div>;
  }

  return (
    <Fragment>
      {spinner}
      <BaseForm
        style={{ display: props.submitting ? "none" : "block" }}
        title="Register"
      >
        <form className={props.classes.form} onSubmit={props.onSubmit}>
          {errorMessage}
          <div>
            <div>
              <Field
                className={props.classes.textField}
                name="email"
                component={TextField}
                type="email"
                label="Email"
                validate={[required, email, emailMinLength, emailMaxLength]}
                autoFocus={true}
              />
            </div>
          </div>
          <div>
            <div>
              <Field
                className={props.classes.textField}
                name="firstName"
                component={TextField}
                type="text"
                label="First Name"
                validate={[required, firstNameMaxLength]}
              />
            </div>
          </div>
          <div>
            <div>
              <Field
                className={props.classes.textField}
                name="lastName"
                component={TextField}
                type="text"
                label="Last Name"
                validate={[required, lastNameMaxLength]}
              />
            </div>
          </div>
          <div>
            <div>
              <Field
                className={props.classes.textField}
                name="password"
                component={TextField}
                type="password"
                label="Password"
                validate={[required, passwordMinLength, passwordMaxLength]}
              />
            </div>
          </div>
          <div>
            <div>
              <Field
                className={props.classes.textField}
                name="confirmPassword"
                component={TextField}
                type="password"
                label="Confirm Password"
                validate={[passwordsMustMatch, required]}
              />
            </div>
          </div>
          <Button
            className={props.classes.button}
            variant="raised"
            color="primary"
            type="submit"
          >
            SIGN UP
          </Button>
        </form>
      </BaseForm>
    </Fragment>
  );
};

registerForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  error: PropTypes.string,
  classes: PropTypes.object.isRequired,
  submitting: PropTypes.bool.isRequired
};

export default withStyles(styles)(registerForm);
