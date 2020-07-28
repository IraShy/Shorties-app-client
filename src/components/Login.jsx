import React, { Component } from "react";
import { Context } from "../context/Context";
import Input from "../shared/Input";

class Login extends Component {
  static contextType = Context;
  state = { email: "", password: "", errMessage: "" };

  onInputChange = (event) => {
    const key = event.target.id;
    this.setState({
      [key]: event.target.value,
    });
  };

  onFormSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    const body = {
      auth: { email, password },
    };
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
      if (response.status >= 400) {
        throw new Error("Incorrect credentials");
      } else {
        const { jwt } = await response.json();
        localStorage.setItem("token", jwt);
        this.props.history.push("/notes");
      }
    } catch (err) {
      console.log(err);
      this.setState({
        errMessage: err.message,
      });
    }
  };

  render() {
    const { email, password, errMessage } = this.state;
    return (
      <div className="container">
        <h1 className="ml-4 mt-5">Login</h1>
        {errMessage && (
          <span style={{ color: "red" }} data-testid="login-error">
            {errMessage}
          </span>
        )}
        <form onSubmit={this.onFormSubmit} id="login-form">
          <Input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={this.onInputChange}
            data-testid="email"
          />
          <Input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={this.onInputChange}
            data-testid="password"
          />
          {/* <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={this.onInputChange}
            data-testid="email"
          /> */}
          {/* <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={this.onInputChange}
            data-testid="password"
          /> */}
          <div className="form-group col-md-6" id="login_button">
          <input className="btn btn-info" type="submit" value="Submit" data-testid="login-submit" /></div>
        </form>
      </div>
    );
  }
}

export default Login;
