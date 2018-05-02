import React, { Component } from "react";
import { connect } from "react-redux";
import RegisterForm from "../../components/Register/RegisterForm";

class Register extends Component {
  handleRegister(values) {
    console.log(values);
  }

  render() {
    return <RegisterForm onSubmit={this.handleRegister} />;
  }
}

export default connect()(Register);
