import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Context } from "../context/Context";
import Pagination from "../shared/Pagination";
import { paginate } from "../shared/paginate";

class ShowCategory extends Component {
  static contextType = Context;

  state = {
    pageSize: 2,
    currentPage: 1,
    notes: []
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
    const UncompletedNotes = notes.filter((n) => n.completed === false)
   
    const { pageSize, currentPage } = this.state;
    const notesList = paginate(UncompletedNotes, currentPage, pageSize);
    return notesList
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

  render() {
    const {id} = this.props.location.state;
    const category = this.context.categories.find(category => category.id === id)
    
    console.log(this.state);
    
    const { notes, search } = this.context;
    // const { search } = this.context;
    // console.log(this.context) // -> this user's notes in the context
    // console.log(this.context.notes) // -> -> this user's notes
    const categoryNotes = notes.filter((note) => {return note.categories.filter((cat) => {return cat.name === category})});

    // console.log(category); // -> correct
    console.log(categoryNotes);//-> this user's all notes
    // console.log(notes)

    const { pageSize, currentPage } = this.state;
    const uncompletedNotes = notes.filter((n) => n.completed === false)
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
          <h1>{category.name}</h1>
          {this.renderNotes(filteredNotes)}
          <Pagination
            itemsCount={uncompletedNotes.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />

           {/* <div className="completed-section">
            <h3>Completed Notes => </h3>
            {this.renderCompletedNotes(filteredNotes)}
          </div> */}

        </React.Fragment>
      );
    } else {
      return null;
    }
  }
}

export default ShowCategory;
