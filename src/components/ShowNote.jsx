import React, { Component } from "react";
import { Context } from "../context/Context";
import { Link } from "react-router-dom";
import moment from "moment";

class ShowNote extends Component {
  static contextType = Context;

  renderCategories = (categories) => {
    return categories.map((c, index) => {
      return (
        <span key={index} id="show_note_categories">
          {c.name}
        </span>
      );
    });
  };

  renderPic = (note) => {
    return <img src={note.picture} alt="" />;
  };

  render() {
    const { id } = this.props.location.state;
    const note = this.context.notes.find((n) => n.id === id);
    const { categories } = note;
    if (!categories) {
      return null;
    }

    return (
      <div className="shownote_container">
        <div className="card ">
          <div className="card-body">
            <h5 className="card-text">
              <span>Title: </span> {note.title}{" "}
            </h5>
            <h5 className="card-text">
              <span>Description: </span>
              {note.body}
            </h5>
            <h5 className="card-text">
              <span>Categories: </span>
              {this.renderCategories(categories)}
            </h5>
          </div>
          <img src={note.picture} className="card-img-top" alt="" />
          <p className="card-text">
            <small className="text-muted">
              Updated {moment(note.updated_at).startOf("minute").fromNow()}
              <small className="text-muted"></small>
              Created {moment(note.created_at).startOf("minute").fromNow()}
            </small>
          </p>
          <div className="shownote_buttons">
            <button
              className="btn btn-outline-secondary ml-2"
              onClick={this.props.history.goBack}
              id="back_button"
            >
              {"<<"}
            </button>
            <Link
              to={{
                pathname: `/notes/${note.id}/edit`,
                state: note,
              }}
            >
              <button type="button" className="btn btn-warning">
                Edit
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default ShowNote;
