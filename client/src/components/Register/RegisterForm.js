import React, {Fragment} from "react";
import PropTypes from "prop-types";
import {Field, reduxForm} from "redux-form";

import ValidatedField from "../Form/ValidatedField";
import {required, email, passwordsMustMatch} from "../../utilities/validation";

import styles from "./styles";

import {withStyles} from "material-ui/styles";
import Button from "material-ui/Button";
import Paper from "material-ui/Paper";
import Card, {CardHeader} from "material-ui/Card";
import {Grid} from "material-ui";

import {TextField} from "redux-form-material-ui";

const registerForm = props => {
  let errorMessage;

  if (props.errorMessage) {
    errorMessage = <div className="info-red">{props.errorMessage}</div>;
  }

  return (
    <div className={props.classes.base}>
      <Grid container>
        <Card className={props.classes.card}>
          <CardHeader
            classes={{title: props.classes.cardTitle}}
            title="Register"
          />
        </Card>
      </Grid>
      <Paper className={props.classes.headline}>
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
      </Paper>
    </div>
  );
};

registerForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(reduxForm({form: "register"})(registerForm));
