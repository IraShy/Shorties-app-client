import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Context } from "../context/Context";

class ProtectedRoute extends React.Component {
  static contextType = Context;
  state = {
    auth: false,
    loading: true,
  };

  async componentDidMount() {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/status`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status >= 400) {
        throw new Error("not authorized");
      } else {
        const { jwt } = await response.json();
        const response_user = await fetch(`${process.env.REACT_APP_BACKEND_URL}/status/user`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const { user } = await response_user.json()
        
        localStorage.setItem("token", jwt);
        this.context.dispatchUser("current user", { user });
          
        this.setState({
          auth: true,
          loading: false,
        });
      }
    } catch (err) {
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    const { loading, auth } = this.state;
    if (!loading && !auth) {
      return <Redirect to="/login" />;
    } else {
      return (
        !loading && (
          <Route
            exact={this.props.exact}
            path={this.props.path}
            component={this.props.component}
          />
        )
      );
    }
  }
}

export default ProtectedRoute;
