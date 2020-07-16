import React from "react";
import { Link } from "react-router-dom";

class Notes extends React.Component {
  state = { notes: [] };

  getNotes = async () => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/notes`);
    const data = await response.json();
    this.setState({ notes: data });
  };

  deleteNote = async (id) => {
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/notes/${id}`, {
      method: "DELETE",
    });
    this.getNotes();
  };

  renderNotes = () => {
    return this.state.notes.map((note, index) => {
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

  componentDidMount() {
    this.getNotes();
  }

  render() {
    return this.renderNotes();
  }
}

export default Notes;
