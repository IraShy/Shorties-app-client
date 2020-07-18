import React, { Component } from "react";
import { Context } from "../context/Context";
// import CreateCategory from "./CreateCategory";

class AddNote extends Component {
  static contextType = Context;

  state = {
    note: {},
    category: {}
  }

  onInputChange = (entity, event) => {
    this.setState({
      [entity]: {...this.state[entity], [event.target.id]: event.target.value },
    });
    console.log(entity, event.target.id, event.target.value)
  };

  onFormSubmit = async (event) => {
    event.preventDefault();
    const { note } = this.state;
    const { category } = this.state;

    console.log({note, category, state:this.state})

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

    const category_json = await category_response.json();
    note.category_id = category_json.id

    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ note }),
    });

    // console.log(category_response);

    const newNote = await response.json();
    this.context.dispatchUser("add", newNote);
    this.props.history.push("/notes");
  };

  render() {
    return (
      <div className="container">
        <h1>Add a new Note</h1>
        <form onSubmit={this.onFormSubmit}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            onChange={(e) => this.onInputChange("note", e)}
          />
          <label htmlFor="title">category</label>
          <input
            type="text"
            name="category"
            id="name"
            onChange={(e) => this.onInputChange("category", e)}
          />

          <label htmlFor="description">Body</label>
          <textarea
            name="body"
            id="body"
            onChange={(e) => this.onInputChange("note", e)}
          ></textarea>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default AddNote;
