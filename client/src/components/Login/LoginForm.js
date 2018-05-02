import React, {Component} from "react";
import PropTypes from "prop-types";
import {Field, reduxForm} from "redux-form";

import ValidatedField from "../Form/ValidatedField";
import {required, email} from "../../utilities/validation";

import {TextField} from "redux-form-material-ui";

class LoginForm extends Component {
  render() {
    let errorMessage;

    if (this.props.errorMessage) {
      errorMessage = <div className="info-red">{this.props.errorMessage}</div>;
    }

    return (
      <div style={{textAlign: "center"}}>
        <h2>Sign in</h2>
        {errorMessage}
        <form onSubmit={this.props.handleSubmit}>
          <div>
            <Field
              name="email"
              component={TextField}
              label="Email"
              validate={[required, email]}
              autoFocus={true}
            />
          </div>
          <div>
            <Field
              name="password"
              component={TextField}
              label="Password"
              type="password"
              validate={[required]}
            />
          </div>
          <button type="submit">Sign in</button>
        </form>
      </div>
    );
  }
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
};

export default reduxForm({form: "login"})(LoginForm);
