import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";

class Register extends Component {
  handleRegister(e) {}

  render() {
    return (
      <form onSubmit={this.handleRegister}>
        <h1>WORKS</h1>
      </form>
    );
  }
}

export default reduxForm({ form: "register" })(Register);
