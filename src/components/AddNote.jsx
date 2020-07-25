import React from "react";
import { Context } from "../context/Context";
import Joi from "joi-browser";
import Validation from "../shared/Validation";

class AddNote extends Validation {
  static contextType = Context;

  state = {
    note: { title: "", body: "" },
    categories: [],
    errors: {},
  };

  schema = Joi.object({
    title: Joi.string().min(2).required().label("Title"),
    body: Joi.string().min(2).required().label("Description"),
    categories: Joi.array().min(1).required().label("Category"),
    picture: Joi.any(),
  });

  onFormSubmit = async (event) => {
    event.preventDefault();
    const { note } = this.state;
    const { categories } = this.state;
    const category_response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/categories`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ categories }),
      }
    );

    const category_json = await category_response.json();

    // stringify to send "[]" to backend
    note.category_ids = JSON.stringify(category_json.map((c) => c.id));

    const data = new FormData();
    for (let key in note) {
      data.append(`note[${key}]`, note[key]);
    }

    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/notes`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: data,
    });

    const noteData = await response.json();
    const noteToAdd = { ...noteData.note, picture: noteData.picture };

    this.context.dispatchUser("add", noteToAdd);
    this.props.history.push("/notes");
  };

  categoriesUpdated = (updatedCategories) => {
    this.setState({ categories: updatedCategories });
  };

  render() {
    const selected = this.state.categories;
    return (
      <div className="container">
        <h1>Add a new Note</h1>
        <form encType="multipart/form-data" onSubmit={this.onFormSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderDropdown(selected)}
          {this.renderInput("body", "Description")}
          {this.renderPicture()}
          {this.renderButton("Submit")}
        </form>
      </div>
    );
  }
}

export default AddNote;
