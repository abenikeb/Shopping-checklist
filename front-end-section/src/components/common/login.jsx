import React, { Component } from "react";
import joi from "joi-browser";
import Input from "./input";
import Select from "./select";
class Login extends Component {
  state = {
    data: {},
    errors: {},
  };
  validate = () => {
    const { error } = joi.validate(this.state.data, this.schema, {
      abortEarly: false,
    });

    if (!error) return;
    const errors = {};
    for (let item of error.details)
      if ((errors[item.path[0]] = item.message)) return errors;
  };
  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = joi.validate(obj, schema);
    if (!error) return null;
    else return error.details[0].message;
  };
  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };
  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };
  renderButton(label) {
    return (
      // <button disabled={this.validate()} className="btn btn-primary">
      //   {label}
      // </button>
      <button className="btn btn-primary">{label}</button>
    );
  }
  renderInput(name, label) {
    const { data, errors, type = "text" } = this.state;
    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        onChange={this.handleChange}
        label={label}
        errors={errors[name]}
      />
    );
  }
  renderSelect(name, label, options) {
    const { data, errors, type = "text" } = this.state;
    return (
      <Select
        type={type}
        name={name}
        value={data[name]}
        onChange={this.handleChange}
        options={options}
        label={label}
        errors={errors[name]}
      />
    );
  }

  renderChecked(name, label) {
    const { data, errors } = this.state;
    return (
      <div>
        <label htmlFor={name}>{label}</label>
        <br />
        <input
          type="checkbox"
          id="bought"
          name={name}
          value={data[name]}
          label={label}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default Login;
