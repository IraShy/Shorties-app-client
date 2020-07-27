import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Context } from "../context/Context";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import Button from "react-bootstrap/Button";
import "../stylesheets/Cohorts.scss";

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
          <Card style={{ width: "18rem" }}>
            <Card.Header>
              <h2>{cohort.name}</h2>
            </Card.Header>
            <Card.Body>
              <Card.Title>Teacher: {this.findTeacher(cohort)}</Card.Title>
              <Card.Text></Card.Text>
              <div className="button-block">
                <Link
                  to={{
                    pathname: `/cohorts/${cohort.id}`,
                    state: cohort,
                  }}
                >
                  <button className="viewbutton">View cohort</button>
                </Link>

                {/* <Link to={`/cohorts/${cohort.id}/edit`}>
            <button>Edit</button>
          </Link> */}
                <Button
                  variant="outline-info"
                  className="delete"
                  onClick={() =>
                    window.confirm("Are you sure?")
                      ? this.deleteCohort(cohort.id)
                      : this.props.history.goBack
                  }
                >
                  Delete cohort
                </Button>
              </div>
              {/* <hr /> */}
            </Card.Body>
          </Card>
        </div>
      );
    });
  };

  renderCreateCohortButton = () => {
    const { cohorts, currentUser, users } = this.context;

    const user = users.find((i) => i.email === currentUser.user);

    if (cohorts.filter((i) => i.user_id === user.id).length !== 0) {
      return (
        <div className="button-block">
          <Link to={"/cohorts/create"}>
            <button className="create">+</button>
          </Link>
        </div>
      );
    }
  };

  render() {
    const { cohorts } = this.context;

    return (
      <React.Fragment>
        {this.renderCreateCohortButton()}
        <div className="container">
          <CardGroup>{this.renderCohorts(cohorts)}</CardGroup>
        </div>
      </React.Fragment>
    );
  }
}

export default Cohorts;
