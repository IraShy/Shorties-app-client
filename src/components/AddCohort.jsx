import React, { Component } from "react";
import { Context } from "../context/Context";
import { Multiselect } from 'multiselect-react-dropdown';

class AddCohort extends Component {
  static contextType = Context;

  state = { cohort: {}, options: [], errMessage: "" };

  onInputChange = (event) => {
    this.setState({
      cohort: {
        [event.target.id]: event.target.value,
      },
    });
  };

  onUsersChange = (newValue, actionMeta) => {
    if (newValue) {
      this.setState({ users: newValue.map((i) => i.label) });
    } else if (actionMeta.action === "remove-value") {
      const removedValue = actionMeta.removedValue.label;
      this.setState({
        users: this.state.users.filter(
          (user) => user !== removedValue
        ),
      });
    }
  };

  onFormSubmit = async (event) => {
    event.preventDefault();
    const { cohort } = this.state;
    // const { users } = this.context;
    // const userEmails = users.map((user) => user.email)

    const body = { cohort };
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/cohorts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(body),
        }
      );
      if (response.status > 400) {
        throw new Error(
          "Incorrect credentials. The cohort name must be unique"
        );
      } else {
        const newCohort = await response.json();
        this.context.dispatchUser("addCohort", newCohort.cohort);
        this.props.history.push("/cohorts");
      }
    } catch (err) {
      this.setState({
        errMessage: err.message,
      });
    }
  };

  render() {
    const { errMessage } = this.state;
    const { users } = this.context;
    const userEmails = users.map((user) => user.email)
    return (
      <div className="container">
        <h1>Add a cohort</h1>
        {errMessage && <span style={{ color: "red" }}>{errMessage}</span>}
        <form onSubmit={this.onFormSubmit}>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="name">Cohort name</label>
              <input
                type="text"
                name="name"
                id="name"
                onChange={this.onInputChange}
                className="form-control"
              />
            </div>

            <div className="form-group col-md-6">
              <label htmlFor="users">Select users</label>
              <MultiSelect
                onSelect={this.onSelect}
                options={userEmails}
                displayValue="name"
              />
            </div>

            <div className="form-group col-md-6">
              <button type="submit" className="btn btn-primary mt-3 ml-1">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default AddCohort;
