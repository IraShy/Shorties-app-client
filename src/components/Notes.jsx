import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Context } from "../context/Context";

class Notes extends Component {
  static contextType = Context;

  getNotes = async () => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/notes`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const notes = await response.json();

    this.context.dispatchUser("populate", { notes });
  };

  deleteNote = async (id) => {
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/notes/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    this.context.dispatchUser("delete", id);
    this.getNotes();
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
    const { notes, search } = this.context;
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
    return <React.Fragment>{this.renderNotes(filteredNotes)}</React.Fragment>;
  }
}

export default Notes;
