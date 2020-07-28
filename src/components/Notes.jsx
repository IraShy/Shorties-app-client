import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Context } from "../context/Context";
import Pagination from "../shared/Pagination";
import { paginate } from "../shared/paginate";
import moment from "moment";


class Notes extends Component {
  static contextType = Context;

  state = {
    pageSize: 2,
    currentPage: 1,
  };

  deleteNote = async (id) => {
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/notes/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    this.context.dispatchUser("delete", id);
  };

  renderNotes = (notes) => {
    const UncompletedNotes = notes.filter((n) => n.completed === false);

    const { pageSize, currentPage } = this.state;
    const notesList = paginate(UncompletedNotes, currentPage, pageSize);
    return notesList.map((note, index) => {
      return (
        <div key={index}>
          <h1>{note.title}</h1>
          <p>{note.body}</p>
          <img src={note.picture} alt="" />
           <p className="card-text">
              <small className="text-muted">
                Updated {moment(note.updated_at).startOf("minute").fromNow()}
              </small>
            </p>
          <Link
            to={{
              pathname: `/notes/${note.id}`,
              state: note,
            }}
          >
            <button>View note</button>
          </Link>
          {this.renderShareButton(note)}
          <button onClick={() => this.deleteNote(note.id)}>Delete</button>

          <hr />
        </div>
      );
    });
  };

  renderCompletedNotes = (notes) => {
    return notes
      .filter((n) => n.completed === true)
      .map((note, index) => {
        return (
          <div key={index}>
            <h1>{note.title}</h1>
            <p>{note.body}</p>
            <img src={note.picture} alt="" />
            <Link
              to={{
                pathname: `/notes/${note.id}`,
                state: note,
              }}
            >
              <button>View note</button>
            </Link>

            <button onClick={() => this.deleteNote(note.id)}>Delete</button>

            <hr />
          </div>
        );
      });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  getCohortStudents = async () => {
    const { currentUser, users } = this.context;
    let user = users.find((i) => i.email === currentUser.user);
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/cohorts/${user.id}/cohorts_students`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const { all_students } = await response.json();

    this.context.dispatchUser("populateCohortStudents", all_students);
  };

  handleShare = async (note) => {
    const id = note.id;
    const { cohortStudents } = this.context;
    let student_ids = cohortStudents.map((i) => i.id);
    console.log(student_ids);
    const body = {
      note_id: id,
      student_ids: student_ids,
    };

    
    await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/notes/shared_note`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
                  'Content-Type': 'application/json'

        },
        body: JSON.stringify(body),
      }
    );
  };

  renderShareButton = (note) => {
    const { cohortStudents } = this.context;
    if (cohortStudents) {
      return (
        <button
          onClick={() => {
            this.handleShare(note);
          }}
        >
          Share
        </button>
      );
    }
  };

  async componentDidMount() {
    await this.getCohortStudents();
  }

  render() {
    const { notes, search } = this.context;
    const { pageSize, currentPage } = this.state;
    const uncompletedNotes = notes.filter((n) => n.completed === false);
    if (notes) {
      let filteredNotes = [
        ...new Set(
          notes
            .filter((note) => {
              return note.title.indexOf(search) !== -1;
            })
            .concat(
              notes.filter((note) => {
                return note.body.indexOf(search) !== -1;
              })
            )
        ),
      ];

      return (
        <React.Fragment>
          {this.renderNotes(filteredNotes)}
          
          <Pagination
            itemsCount={uncompletedNotes.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />

          {/* <button onClick={this.renderCompletedNotes(filteredNotes)}>Completed Notes</button> */}

          <div className="completed-section">
            <h3>Completed Notes => </h3>
            {this.renderCompletedNotes(filteredNotes)}
          </div>
          
         
        </React.Fragment>
      );
    } else {
      return null;
    }
  }
}

export default Notes;
