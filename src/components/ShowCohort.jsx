import React, { Component } from "react";
import { Context } from "../context/Context";
import { Link } from "react-router-dom";

class ShowCohort extends Component {
  static contextType = Context;
  state = { students: [] };

  getStudents = async (id) => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/cohorts/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const data = await response.json();
    this.setState({ students: data.users });
  };

  renderStudents = () => {
    if (!this.state.students.length) {
      return <p>This cohort has no students</p>;
    }
    return this.state.students.map((student, index) => {
      return (
        <div key={index}>
          <p>
            {student.email} ({student.username || "no username"})  
          </p>
        </div>
      );
    });
  };
  async componentDidMount() {
    const { id } = this.props.location.state;
    this.getStudents(id);
  }

  render() {
    return <React.Fragment>{this.renderStudents()}</React.Fragment>;
  }
}

export default ShowCohort;
