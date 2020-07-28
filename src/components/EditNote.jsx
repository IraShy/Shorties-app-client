import React from "react";
import { Context } from "../context/Context";
import Joi from "joi-browser";
import Validation from "../shared/Validation";

class EditNote extends Validation {
  static contextType = Context;
  state = {
    note: {
      title: "",
      body: "",
      picture: "",
      completed: false,
      loading: true,
      categories: [],
      id: Number(this.props.match.params.id),
    },
    errors: {},
  };

  schema = Joi.object({
    title: Joi.string().min(2).required().label("Title"),
    body: Joi.string().min(2).required().label("Description"),
    categories: Joi.array().min(1).required().label("Category"),
    picture: Joi.any(),
    completed: Joi.any(),
    loading: Joi.any(),
    id: Joi.any(),
    user_id: Joi.any(),
    public_share: Joi.any(),
    created_at: Joi.any(),
    updated_at: Joi.any(),
  });

  onFormSubmit = async (event) => {
    event.preventDefault();
    const { id, title, body, completed, picture } = this.state.note;
    const categories_attributes = this.state.note.categories;
    const note = {
      title,
      body,
      completed,
      picture,
      categories_attributes,
    };

    note.categories_attributes = JSON.stringify(categories_attributes);

    const data = new FormData();
    for (let key in note) {
      data.append(`note[${key}]`, note[key]);
    }

    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/notes/${id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: data,
      }
    );
    const editedNote = await response.json();
    const noteToEdit = { ...editedNote, picture: editedNote.picture };

    this.context.dispatchUser("update", { ...noteToEdit, id });
    this.props.history.push(`/notes`);
  };

  async componentDidMount() {
    const note = this.props.location.state;
    const { categories, picture } = note;

    this.setState({ note, loading: false });
    this.setState({ categories: categories });
    this.setState({ picture: JSON.stringify(picture) });
  }

  categoriesUpdated = (updatedCategories) => {
    this.setState({
      note: { ...this.state.note, categories: updatedCategories },
    });
  };

  render() {
    const { loading } = this.state.note;
    const { note } = this.state;
    const selected = this.state.note.categories;

    return (
      !loading && (
        <div className="container">
          <h1>Edit</h1>
          <form encType="multipart/form-data" onSubmit={this.onFormSubmit}>
            {this.renderInput("title", "Title")}
            {this.renderDropdown(selected)}
            {this.renderInput("body", "Description")}

            <div className="form-group col-md-6" id="image_container">
            <img src={note.picture} alt=""  className="edit_image"/></div>
            {this.renderPicture()}
            
            <div className="form-group col-md-6" id="edit_buttons">
            {this.renderMarked()}
            {this.renderButtonEdit("submit")}
            </div>
          </form>
        </div>
      )
    );
  }
}

export default EditNote;
