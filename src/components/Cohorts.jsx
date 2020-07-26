import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Context } from "../context/Context";

class Cohorts extends Component {
  static contextType = Context;

  deleteCohort = async (id) => {
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/cohorts/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    this.context.dispatchUser("deleteCohort", id);
  };

  findTeacher = (cohort) => {
    return this.context.users.find((user) => user.id === cohort.user_id)
      .username;
  };

  renderCohorts = (cohorts) => {
    return cohorts.map((cohort, index) => {
      return (
        <div key={index}>
          <h3>{cohort.name}</h3>
          <h5>Teacher: {this.findTeacher(cohort)}</h5>
          <Link
            to={{
              pathname: `/cohorts/${cohort.id}`,
              state: cohort,
            }}
          >
            <button>View cohort</button>
          </Link>

          {/* <Link to={`/cohorts/${cohort.id}/edit`}>
            <button>Edit</button>
          </Link> */}
          <button
            onClick={() =>
              window.confirm("Are you sure?")
                ? this.deleteCohort(cohort.id)
                : this.props.history.goBack
            }
          >
            Delete
          </button>
          <hr />
        </div>
      );
    });
  };

  render() {
    const { cohorts } = this.context;
    return <React.Fragment>
      <Link to={"/cohorts/create"}>
            <button>Create a new cohort</button>
          </Link>
      {this.renderCohorts(cohorts)}
      </React.Fragment>;
  }
}

export default Cohorts;
