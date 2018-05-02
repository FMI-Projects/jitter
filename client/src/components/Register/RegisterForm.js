import React from "react";
import PropTypes from "prop-types";
import {Field, reduxForm} from "redux-form";

import ValidatedField from "../Form/ValidatedField";
import {required, email, passwordsMustMatch} from "../../utilities/validation";

const registerForm = props => (
  <form onSubmit={props.handleSubmit}>
    <div>
      <div>
        <Field
          name="email"
          component={ValidatedField}
          type="email"
          label="Email"
          validate={[required, email]}
        />
      </div>
    </div>
    <div>
      <div>
        <Field
          name="password"
          component={ValidatedField}
          type="password"
          label="Password"
          validate={[required]}
        />
      </div>
    </div>
    <div>
      <div>
        <Field
          name="confirmPassword"
          component={ValidatedField}
          type="password"
          label="Confirm Password"
          validate={[passwordsMustMatch]}
        />
      </div>
    </div>
    <div>
      <button type="submit">Register</button>
    </div>
  </form>
);

registerForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({form: "register"})(registerForm);
