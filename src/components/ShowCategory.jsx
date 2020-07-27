import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Context } from "../context/Context";
import Pagination from "../shared/Pagination";
import { paginate } from "../shared/paginate";
import "../stylesheets/ShowCategory.scss";

class ShowCategory extends Component {
  static contextType = Context;

  state = {
    pageSize: 4,
    currentPage: 1,
    notes: [],
  };

  getNotes = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/categories/${this.props.location.state.id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const { notes } = await response.json();
    this.setState({ notes: notes });
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
          <h3>{note.title}</h3>
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

  async componentDidMount() {
    const categoryId = this.props.location.state.id;
    this.getNotes(categoryId);
  }

  render() {
    const { id } = this.props.location.state;
    const category = this.context.categories.find(
      (category) => category.id === id
    );
    const notes = this.state.notes;
    const { search } = this.context;
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
          <h1 className="title">{category.name}</h1>
          <div className="button-block">
            <button className="backbutton" onClick={this.props.history.goBack}>
              Back
            </button>
          </div>
          <hr />
          {this.renderNotes(filteredNotes)}
          <Pagination
            itemsCount={uncompletedNotes.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </React.Fragment>
      );
    } else {
      return null;
    }
  }
}

export default ShowCategory;
