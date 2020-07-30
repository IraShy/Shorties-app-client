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
    const { note} = this.state;
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
    const {errors} = this.state;
    return (
      <div className="addnote_container">
        <form encType="multipart/form-data" onSubmit={this.onFormSubmit}>
          <h3 className="mt-5 mb-4 ml-1">Add a new Note</h3>
          {this.renderInput("title", "Title")}
          {this.renderDropdown(selected)}
          {this.renderTextarea(errors)}
          {this.renderPicture()}
          <div className="form-group" id="addnote_buttons">
            {this.renderBack()}
            {this.renderButton("submit")}
          </div>
        </form>
      </div>
    );
  }
}

export default AddNote;
