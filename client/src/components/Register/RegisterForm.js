import React from "react";
import PropTypes from "prop-types";
import {Field, reduxForm} from "redux-form";

import {required, email, passwordsMustMatch} from "../../utilities/validation";

import styles from "../Form/styles";

import {withStyles} from "material-ui/styles";
import Button from "material-ui/Button";

import {TextField} from "redux-form-material-ui";

import BaseForm from "../Form/BaseForm";

const registerForm = props => {
  let errorMessage;

  if (props.errorMessage) {
    errorMessage = <div className="info-red">{props.errorMessage}</div>;
  }

  return (
    <BaseForm title="Register">
      {errorMessage}
      <form className={props.classes.form} onSubmit={props.handleSubmit}>
        <div>
          <div>
            <Field
              className={props.classes.textField}
              name="email"
              component={TextField}
              type="email"
              label="Email"
              validate={[required, email]}
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
              validate={[required]}
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
              validate={[passwordsMustMatch]}
            />
          </div>
        </div>
        <Button
          className={props.classes.button}
          variant="raised"
          color="primary"
          type="submit">
          Register
        </Button>
      </form>
    </BaseForm>
  );
};

registerForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(reduxForm({form: "register"})(registerForm));
