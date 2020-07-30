import React, { Component } from "react";
import Recaptcha from "../shared/ReCaptcha";
import Input from "../shared/Input";

class SignUp extends Component {
  state = { email: "", password: "", username: "", recaptchaToken: null };

  onRecaptchaVerify = (recaptchaToken) => this.setState({ recaptchaToken });

  onInputChange = (event) => {
    const key = event.target.id;
    this.setState({
      [key]: event.target.value,
    });
  };

  onFormSubmit = async (event) => {
    event.preventDefault();
    const { email, password, username, recaptchaToken } = this.state;
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/sign-up`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: {
              email,
              password,
              username,
              recaptcha_token: recaptchaToken,
            },
          }),
        }
      );
      if (response.status >= 400) {
        throw new Error("incorrect credentials");
      } else {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ auth: { email, password, username } }),
          }
        );
        const { jwt } = await response.json();
        localStorage.setItem("token", jwt);
        this.props.history.push("/notes");
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  render() {
    const { email, password, username } = this.state;
    return (
      <div className="signup_container">
        <form onSubmit={this.onFormSubmit} id="signup-form">
          <h1 className="ml-1 mt-5 mb-3">Sign Up</h1>
          <Input
            label="username"
            type="username"
            name="username"
            id="username"
            value={username}
            onChange={this.onInputChange}
            data-testid="username"
          />
          <Input
            label="email"
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={this.onInputChange}
            data-testid="email"
          />
          <Input
            label="password"
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={this.onInputChange}
            data-testid="password"
          />

          <div className="form-group" id="signup_buttons">
            <Recaptcha onRecaptchaVerify={this.onRecaptchaVerify} />
            <input
              className=" btn btn-info mt-3"
              type="submit"
              value="Submit"
              data-testid="signup-submit"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default SignUp;
