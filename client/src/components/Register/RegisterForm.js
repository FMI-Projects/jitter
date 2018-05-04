import React from "react";
import PropTypes from "prop-types";
import { Field, reduxForm } from "redux-form";
import { withStyles } from "material-ui/styles";

import Button from "material-ui/Button";
import { TextField } from "redux-form-material-ui";

import Spinner from "../../components/UI/Spinner/Spinner";
import BaseForm from "../UI/Forms/BaseForm/BaseForm";
import {
  required,
  email,
  passwordsMustMatch,
  emailMinLength,
  passwordMinLength
} from "../../utilities/validation";
import styles from "../UI/Forms/BaseForm/BaseForm.styles";

const registerForm = props => {
  if (props.loading) {
    return <Spinner />;
  }

  let errorMessage;
  if (props.errorMessage) {
    errorMessage = (
      <div className={props.classes.error}>{props.errorMessage}</div>
    );
  }

  return (
    <BaseForm title="Register">
      <form className={props.classes.form} onSubmit={props.handleSubmit}>
        {errorMessage}
        <div>
          <div>
            <Field
              className={props.classes.textField}
              name="email"
              component={TextField}
              type="email"
              label="Email"
              validate={[required, email, emailMinLength]}
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
              validate={[required]}
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
              validate={[required]}
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
              validate={[required, passwordMinLength]}
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
  );
};

registerForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  classes: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

export default withStyles(styles)(
  reduxForm({ form: "register" })(registerForm)
);
