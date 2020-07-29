import React, { Component } from "react";
import { Context } from "../context/Context";
import Pagination from "../shared/Pagination";
import { paginate } from "../shared/paginate";
import { Link } from "react-router-dom";
import moment from "moment";

class CompletedNotes extends Component {
  static contextType = Context;
  state = {
    pageSize: 3,
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

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  renderCompletedNotes = (notes) => {
    const { pageSize, currentPage } = this.state;
    const notesList = paginate(notes, currentPage, pageSize);

    return notesList
      .filter((n) => n.completed === true)
      .map((note, index) => {
        return (
          <div
            key={index}
            className="card border-secondary"
            style={{ backgroundColor: "silver" }}
          >
            <div className="card-header" id="note_title">
              {note.title}
            </div>
            <p className="card-text ml-2 mt-2" id="note_body">
              {note.body}
            </p>
            <img src={note.picture} alt="" id="note_image" />
            <div className="note_card">
              <p className="card-text">
                <small className="text-muted">
                  Updated {moment(note.updated_at).startOf("minute").fromNow()}
                </small>
              </p>
              <div className="note_buttons">
                <img
                  src={require("../assets/back.png")}
                  width="25"
                  height="25"
                  alt="icon"
                  id="back_icon"
                  onClick={this.props.history.goBack}
                />

                <Link
                  to={{
                    pathname: `/notes/${note.id}`,
                    state: note,
                  }}
                >
                  <img
                    src={require("../assets/view.png")}
                    width="25"
                    height="25"
                    alt="icon"
                    id="view_note_icon"
                  />
                </Link>

                <img
                  src={require("../assets/delete.png")}
                  width="30"
                  height="30"
                  alt="icon"
                  id="delete_icon"
                  onClick={() =>
                    window.confirm("Are you sure?")
                      ? this.deleteNote(note.id)
                      : this.props.history.goBack
                  }
                />
              </div>
            </div>
          </div>
        );
      });
  };

  render() {
    const { notes } = this.context;
    const { pageSize, currentPage } = this.state;
    const completedNotes = notes.filter((n) => n.completed === true);

    return (
      <React.Fragment>
        <div className="notes_container">
          <h3 className="mt-5 mb-5">Completed Notes </h3>
          {this.renderCompletedNotes(completedNotes)}
          <img
            src={require("../assets/back.png")}
            width="55"
            height="55"
            alt="icon"
            id="back_icon"
            onClick={this.props.history.goBack}
          />
        </div>

        <Pagination
          itemsCount={completedNotes.length}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        />
      </React.Fragment>
    );
  }
}

export default CompletedNotes;
