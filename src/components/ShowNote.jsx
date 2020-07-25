import React, { Component } from "react";
import { Context } from "../context/Context";
import { Link } from "react-router-dom";
import moment from "moment";

class ShowNote extends Component {
  static contextType = Context;

  renderCategories = (categories) => {
    return categories.map((c, index) => {
      return <div key={index}>{c.name}</div>;
    });
  };

  renderPic = (note) => {
    return <img src={note.picture} alt="pic" />;
  };

  render() {
    const { id } = this.props.location.state;
    const note = this.context.notes.find((n) => n.id === id);
    const { categories } = note;
    if (!categories) {
      return null;
    }

    return (
      <React.Fragment>
        <div className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">Title </h5>
            <p>{note.title}</p>
            <h5 className="card-title">Image </h5>
            <div>{this.renderPic(note)}</div>
            <h5 className="card-title">Description</h5>
            <p>{note.body}</p>
            <h5 className="card-title">Categories: </h5>
            {this.renderCategories(categories)}

            <p className="card-text">
              <small className="text-muted">
                Created {moment(note.created_at).startOf("minute").fromNow()}
              </small>
            </p>
          </div>

          <Link
            to={{
              pathname: `/notes/${note.id}/edit`,
              state: note,
            }}
          >
            <button type="button" className="btn btn-info m-2">
              Edit
            </button>
          </Link>
        </div>
      </React.Fragment>
    );
  }
}

export default ShowNote;
