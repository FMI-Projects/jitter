import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Field, reduxForm } from "redux-form";
import { withStyles } from "material-ui/styles";
import Button from "material-ui/Button";
import { TextField } from "redux-form-material-ui";

import BaseForm from "../../components/UI/Forms/BaseForm/BaseForm";
import styles from "../../components/UI/Forms/BaseForm/BaseForm.styles";
import { required, email } from "../../utilities/validation";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actions from "../../store/actions";

const loginForm = props => {
  let spinner = null;
  if (props.submitting) {
    spinner = <Spinner />;
  }

  let errorMessage;
  if (props.error) {
    errorMessage = <div className={props.classes.error}>{props.error}</div>;
  }

  const { handleSubmit } = props;
  const submit = handleSubmit(actions.login);

  return (
    <Fragment>
      {spinner}
      <BaseForm
        style={{ display: props.submitting ? "none" : "block" }}
        title="Login"
      >
        <form className={props.classes.form} onSubmit={submit}>
          {errorMessage}
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
            type="submit"
          >
            Sign in
          </Button>
        </form>
      </BaseForm>
    </Fragment>
  );
};

loginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.string,
  classes: PropTypes.object.isRequired,
  submitting: PropTypes.bool.isRequired
};

export default withStyles(styles)(reduxForm({ form: "login" })(loginForm));
