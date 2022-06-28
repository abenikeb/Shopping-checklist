import React, { Component } from 'react'
import joi from 'joi-browser'
import Login from './common/login'
import authService, { login } from './../services/authService'
import { Redirect } from 'react-router-dom'

class LoginForm extends Login {
  state = {
    data: { username: '', password: '' },
    errors: {},
  }
  schema = {
    username: joi.string().required(),
    password: joi.string().required(),
  }

  doSubmit = async () => {
    try {
      const { username, password } = this.state.data
      await login(username, password)

      const { state } = this.props.location
      window.location = state ? state.from.pathname : '/'
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors }
        errors.username = ex.response.data
        this.setState({ errors })
      }
    }
  }

  render() {
    if (authService.getUserData()) return <Redirect to="/" />
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('username', 'Username')}
          {this.renderInput('password', 'Password', 'password')}
          {this.renderButton('Login')}
        </form>
      </div>
    )
  }
}

export default LoginForm
