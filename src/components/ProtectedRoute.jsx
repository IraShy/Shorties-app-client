import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { Context } from "../context/Context";

class ProtectedRoute extends Component {
  static contextType = Context;
  state = {
    auth: false,
    loading: true,
  };

  getNotes = async () => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/notes`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const { notes } = await response.json();

    this.context.dispatchUser("populateNotes", { notes });
  };

  getCategories = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/categories`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const categories = await response.json();
    this.context.dispatchUser("populateCategories", { categories });
  };

  getUsers = async () => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const { users } = await response.json();

    this.context.dispatchUser("populateUsers", { users });
  };

  getCohorts = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/cohorts`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const { cohorts } = await response.json();

    this.context.dispatchUser("populateCohorts", { cohorts });
  };

  async componentDidMount() {
    try {
      await Promise.all(
        this.getNotes(),
        this.getCategories(),
        this.getUsers(),
        this.getCohorts()
      );

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

        const response_user = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/status/user`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const { user } = await response_user.json();

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
