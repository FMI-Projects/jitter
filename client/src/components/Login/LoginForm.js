import React from "react";
import PropTypes from "prop-types";
import { Field, reduxForm } from "redux-form";
import { withStyles } from "material-ui/styles";

import Button from "material-ui/Button";
import { TextField } from "redux-form-material-ui";

import BaseForm from "../UI/Forms/BaseForm/BaseForm";
import styles from "../UI/Forms/BaseForm/BaseForm.styles";
import { required, email, emailMinLength } from "../../utilities/validation";
import Spinner from "../../components/UI/Spinner/Spinner";

const loginForm = props => {
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
    <BaseForm title="Login">
      <form className={props.classes.form} onSubmit={props.handleSubmit}>
        {errorMessage}
        <div>
          <Field
            className={props.classes.textField}
            name="email"
            component={TextField}
            label="Email"
            validate={[required, email, emailMinLength]}
            autoFocus={true}
          />
        </div>
        <div>
          <Field
            className={props.classes.textField}
            name="password"
            component={TextField}
            margin="dense"
            label="Password"
            type="password"
            validate={[required]}
          />
        </div>
        <Button
          className={props.classes.button}
          variant="raised"
          color="primary"
          type="submit"
        >
          Sign in
        </Button>
      </form>
    </BaseForm>
  );
};

loginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  classes: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

export default withStyles(styles)(reduxForm({ form: "login" })(loginForm));
