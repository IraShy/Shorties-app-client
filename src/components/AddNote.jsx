import React from "react";
import { Context } from "../context/Context";
import Joi from "joi-browser";
import Validation from "../shared/Validation";
import Client from "./Client";

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

  client = new Client();

  onFormSubmit = async (event) => {
    event.preventDefault();
    const { note } = this.state;
    const { categories } = this.state;

    const createdNote = await this.client.createNote(note, categories);

    this.context.dispatchUser("add", createdNote);
    this.props.history.push("/notes");
  };

  categoriesUpdated = (updatedCategories) => {
    const { note } = this.state;
    const updatedNote = {
      ...note,
      categories: updatedCategories,
    };
    const errors = this.validateNote(updatedNote);

    this.setState({
      categories: updatedCategories,
      errors,
    });
  };

  render() {
    const selected = this.state.categories;
    return (
      <div className="container">
        <h3 id="addnote_title">Add a new Note</h3>
        <form encType="multipart/form-data" onSubmit={this.onFormSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderDropdown(selected)}
          {this.renderInput("body", "Description")}
          {this.renderPicture()}
          <div className="addnote_buttons">
          {this.renderBack()}
          {this.renderButton("Submit")}
          </div>
        </form>
      </div>
    );
  }
}

export default AddNote;
