import React, { Component } from "react";
import { Context } from "../context/Context";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import "../stylesheets/ShowCohort.scss";

class ShowCohort extends Component {
  static contextType = Context;
  state = { students: [], show: false };

  getStudents = async (cohortId) => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/cohorts/${cohortId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const data = await response.json();
    this.setState({ cohort: data, students: data.users, show: true});
    
  };

  deleteStudent = async (user_id) => {
    await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/cohorts/${this.state.cohort.id}/users/${user_id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    this.setState(() => {
      const students = this.state.students.filter((student) => {
        return user_id !== student.id;
      });
      return {
        students: students,
      };
    });
  };

  renderStudents = () => {
    return this.state.students.map((student, index) => {
      return (
        <tr key={index}>
          <td>{student.username || "no username"}</td>
          <td>{student.email}</td>
          <td className="delcell">
            <Button
              variant="outline-info"
              className="delete btn-table"
              onClick={() =>
                window.confirm("Are you sure?")
                  ? this.deleteStudent(student.id)
                  : this.props.history.goBack
              }
            >
              Delete
            </Button>
          </td>
        </tr>
      );
    });
  };

  deleteCohort = async (id) => {
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/cohorts/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    this.context.dispatchUser("deleteCohort", id);
    this.props.history.push("/cohorts");
  };

  findTeacher = (cohort) => {
    return this.context.users.find((user) => user.id === cohort.user_id)
      .username;
  };

  async componentDidMount() {
    const cohortId = this.props.location.state.id;
    this.getStudents(cohortId);
  }

  render() {
    console.log(this.context)
    const cohort = this.state.cohort;
    if (this.state.show) {
      return !this.state.students.length ? (
        <React.Fragment>
          <h1 className="title">{cohort.name}</h1>
          <h5>Teacher: {this.findTeacher(cohort)}</h5>
          <h5>Students:</h5>
          <p>This cohort has no students</p>
          <div className="button-block">
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
            <button className="backbutton" onClick={this.props.history.goBack}>
              Back
            </button>
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <h1 className="title">{cohort.name}</h1>
          <div className="container">
            <hr />
            <h5 className="teacher">Teacher: {this.findTeacher(cohort)}</h5>
            <hr />
          </div>
          <h5>Students:</h5>
          <div className="container">
            <Table bordered>
              <thead variant="light">
                <tr>
                  <th scope="col">Username</th>
                  <th scope="col">Email</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>{this.renderStudents()}</tbody>
            </Table>
          </div>
          <div className="button-block">
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
            <button className="backbutton" onClick={this.props.history.goBack}>
              Back
            </button>
          </div>
        </React.Fragment>
      );
    } else {
      return null;
    }
  }
}

export default ShowCohort;
