import React, { Component } from "react";
import { Context } from "../context/Context";
// import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";

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
    this.setState({ cohort: data, students: data.users, show: true });
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
          <td>
            <button
              onClick={() =>
                window.confirm("Are you sure?")
                  ? this.deleteStudent(student.id)
                  : this.props.history.goBack
              }
            >
              Delete
            </button>
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
    const cohort = this.state.cohort;
    if (this.state.show) {
      return !this.state.students.length ? (
        <React.Fragment>
          <h3>{cohort.name}</h3>
          <h5>Teacher: {this.findTeacher(cohort)}</h5>
          <h5>Students:</h5>
          <p>This cohort has no students</p>
          <button
            onClick={() =>
              window.confirm("Are you sure?")
                ? this.deleteCohort(cohort.id)
                : this.props.history.goBack
            }
          >
            Delete cohort
          </button>
          <button onClick={this.props.history.goBack}>Back</button>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <h3>{cohort.name}</h3>
          <h5>Teacher: {this.findTeacher(cohort)}</h5>
          <h5>Students:</h5>
          <Table hover bordered>
            <thead variant="light">
              <tr>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>{this.renderStudents()}</tbody>
          </Table>
          <button
            onClick={() =>
              window.confirm("Are you sure?")
                ? this.deleteCohort(cohort.id)
                : this.props.history.goBack
            }
          >
            Delete cohort
          </button>
          <button onClick={this.props.history.goBack}>Back</button>
        </React.Fragment>
      );
    } else {
      return null;
    }
  }
}

export default ShowCohort;
