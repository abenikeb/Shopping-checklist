import React, { Component } from "react";
import joi from "joi-browser";
import Login from "./common/login";
import * as userService from "../services/userService";
import auth from "../services/authService";

class Register extends Login {
  state = {
    data: { username: "", password: "", name: "" },
    errors: {},
  };
  schema = {
    username: joi
      .string()
      .required()
      .label("Username")
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }),
    password: joi.string().required().min(5).label("Password"),
    name: joi.string().min(3).max(30).required(),
  };

  doSubmit = async () => {
    try {
      const response = await userService.register(this.state.data); // get from server
      auth.loginWithJwt(response.headers["x-auth-token"]);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div>
        <h1>Login</h1>

        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default Register;
