import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Context } from "../context/Context";

class Notes extends Component {
  static contextType = Context;

  deleteNote = async (id) => {
    this.context.dispatch("delete", id);
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/notes/${id}`, {
      method: "DELETE",
    });
  };

  renderNotes = (notes) => {
    return notes.map((note, index) => {
      return (
        <div key={index}>
          <h1>{note.title}</h1>
          <p>{note.body}</p>
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

  render() {
    const { notes } = this.context;
    console.log(notes)
    return <React.Fragment>
      {this.renderNotes(notes)}</React.Fragment>;
  }
}

export default Notes;
