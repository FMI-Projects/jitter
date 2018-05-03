import React from "react";
import PropTypes from "prop-types";
import {Field, reduxForm} from "redux-form";
import {withStyles} from "material-ui/styles";

import styles from "../Form/styles";

import {required, email} from "../../utilities/validation";

import Button from "material-ui/Button";
import Paper from "material-ui/Paper";
import Card, {CardHeader} from "material-ui/Card";
import {Grid} from "material-ui";

import {TextField} from "redux-form-material-ui";

import BaseForm from "../Form/BaseForm";

const loginForm = props => {
  let errorMessage;

  if (props.errorMessage) {
    errorMessage = <div className="info-red">{props.errorMessage}</div>;
  }

  return (
    <BaseForm title="Login">
      {errorMessage}
      <form className={props.classes.form} onSubmit={props.handleSubmit}>
        <div>
          <Field
            className={props.classes.textField}
            name="email"
            component={TextField}
            label="Email"
            validate={[required, email]}
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
          type="submit">
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
};

export default withStyles(styles)(reduxForm({form: "login"})(loginForm));
