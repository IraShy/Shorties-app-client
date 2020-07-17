import React from "react";

class SignUp extends React.Component {
  state = { email: "", password: "", username: "" };

  onInputChange = (event) => {
    const key = event.target.id;
    this.setState({
      [key]: event.target.value,
    });
  };

  onFormSubmit = async (event) => {
    event.preventDefault();
    const { email, password, username } = this.state;
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/sign-up`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: { email, password, username }}),
      });
      if (response.status >= 400) {
        throw new Error("incorrect credentials");
      } else {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ auth: { email, password, username }}),
        })
        const { jwt } = await response.json()
        localStorage.setItem("token", jwt);
        this.props.history.push("/");
      }
    } catch (err) {
      console.error(err.message)
    }
  };

  render() {
    const { email, password, username } = this.state;
    return (
      <div className="container">
        <h1>Sign Up</h1>
        <form onSubmit={this.onFormSubmit}>
          <label htmlFor="username">Username</label>
          <input
            type="username"
            name="username"
            id="username"
            value={username}
            onChange={this.onInputChange}
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={this.onInputChange}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={this.onInputChange}
          />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default SignUp;