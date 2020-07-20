import React, { Component } from "react";
import { Context } from "../context/Context";

class AddNote extends Component {
  static contextType = Context;

  state = {
    note: {},
    category: {},
  };

  onInputChange = (entity, event) => {
    this.setState({
      [entity]: {
        ...this.state[entity],
        [event.target.id]: event.target.value,
      },
    });
    console.log(entity, event.target.id, event.target.value);
  };

  onFormSubmit = async (event) => {
    event.preventDefault();
    const { note } = this.state;
    const { category } = this.state;

    console.log({ note, category, state: this.state });

    const category_response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/categories`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ category }),
      }
    );

    // use dropdown to show existed category and also have the ability to create a new category, the category default option will be other  (if not category is selected)

    const category_json = await category_response.json();
    note.category_id = category_json.id;

    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ note }),
    });

   

    const newNote = await response.json();
    this.context.dispatchUser("add", newNote);
    this.props.history.push("/notes");
  };

  render() {
    return (
      <div className="container">
        <h1>Add a new Note</h1>
        <form onSubmit={this.onFormSubmit}>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                name="title"
                id="title"
                onChange={(e) => this.onInputChange("note", e)}
                className="form-control"
              />
            </div>

            <div className="form-group col-md-6">
              <label htmlFor="title">category</label>
              <input
                type="text"
                name="category"
                id="name"
                onChange={(e) => this.onInputChange("category", e)}
                className="form-control"
              />
            </div>

            <div className="form-group col-md-6">
              <label htmlFor="description">Body</label>
              <textarea
                name="body"
                id="body"
                onChange={(e) => this.onInputChange("note", e)}
                className="form-control"
              ></textarea>
              <button
                type="submit"
                className="btn btn-primary mt-3 ml-1"
              >Submit</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default AddNote;
