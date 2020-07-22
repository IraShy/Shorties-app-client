import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Context } from "../context/Context";

class Notes extends Component {
  static contextType = Context;

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
    return notes.map((note, index) => {
      return (
        <div key={index}>
          <h1>{note.title}</h1>
          <p>{note.body}</p>
          <img src={note.picture} alt=""/>
          <Link
            to={{
              pathname: `/notes/${note.id}`,
              state: note
            }}
          >
          {console.log(note)}
            <button>View note</button>
          </Link>
          
         
        
          <button onClick={() => this.deleteNote(note.id)}>Delete</button>

          <hr />
        </div>
      );
    });
  };


 

   render() {
    if (this.context.notes)
      {
        const notes = this.context.notes;
      const search = this.context.search;
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
      return <React.Fragment>{this.renderNotes(filteredNotes)}</React.Fragment>
      } else {
        return null;
      }

  }
}

export default Notes;
