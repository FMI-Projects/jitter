import React, {Component} from "react";
import PropTypes from "prop-types";
import {Field, reduxForm} from "redux-form";
import {withStyles} from "material-ui/styles";

import styles from "./styles";

import {required, email} from "../../utilities/validation";

import Button from "material-ui/Button";
import Paper from "material-ui/Paper";
import Card, {CardHeader} from "material-ui/Card";
import {Grid} from "material-ui";

import {TextField} from "redux-form-material-ui";

class LoginForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    errorMessage: PropTypes.string,
    classes: PropTypes.object.isRequired,
  };

  render() {
    let errorMessage;

    if (this.props.errorMessage) {
      errorMessage = <div className="info-red">{this.props.errorMessage}</div>;
    }

    const {classes} = this.props;

    return (
      <div className={classes.base}>
        <Grid container>
          <Card className={classes.card}>
            <CardHeader classes={{title: classes.cardTitle}} title="Sign in" />
          </Card>
        </Grid>
        <Paper className={classes.headline}>
          {errorMessage}
          <form className={classes.form} onSubmit={this.props.handleSubmit}>
            <div>
              <Field
                className={classes.textField}
                name="email"
                component={TextField}
                label="Email"
                validate={[required, email]}
                autoFocus={true}
              />
            </div>
            <div>
              <Field
                className={classes.textField}
                name="password"
                component={TextField}
                margin="dense"
                label="Password"
                type="password"
                validate={[required]}
              />
            </div>
            <Button
              className={classes.button}
              variant="raised"
              color="primary"
              type="submit">
              Sign in
            </Button>
          </form>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(reduxForm({form: "login"})(LoginForm));
