import React, { Component } from "react";
import { Context } from "../context/Context";
import Input from "../shared/Input";
import Dropdown from "../shared/Dropdown";
import Joi from "joi-browser";

class EditNote extends Component {
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

  onInputChange = (event) => {
    let note;
    if (event.target?.files) {
      note = {
        ...this.state.note,
        [event.target.id]: event.target.files[0],
      };
    } else {
      note = {
        ...this.state.note,
        [event.target.id]: event.target.value,
      };
    }

    const errors = this.validateNote({
      ...note,
      categories: this.state.categories,
    });
    this.setState({ note, errors });
  };

  validateNote = (note) => {
    const options = { abortEarly: true };
    const { error } = Joi.validate(note, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

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
    const { title, body, loading } = this.state.note;
    const { note, errors } = this.state;
    console.log(errors);
    return (
      !loading && (
        <div className="container">
          <h1>Edit</h1>
          <form encType="multipart/form-data" onSubmit={this.onFormSubmit}>
            <Input
              name="title"
              label="Title"
              onChange={this.onInputChange}
              value={title}
              error={errors && errors.title}
            />

            <Input
              name="body"
              label="Description"
              onChange={this.onInputChange}
              value={body}
              error={errors && errors.body}
            />

            <Dropdown
              allCategories={this.context.categories}
              selected={this.state.note.categories}
              onCategoriesChanged={this.categoriesUpdated}
              categoryError={this.categoryError}
            />

            <h5 className="card-title">Image </h5>
            <div>
              <img src={note.picture} alt="" />
            </div>

            <Input
              type="file"
              name="picture"
              id="picture"
              label="Image"
              onChange={this.onInputChange}
            />

            <button
              type="text"
              className="btn btn-danger mt-3 ml-1"
              htmlFor="completed"
              onClick={(e) => {
                e.preventDefault();
                this.setState({
                  note: { ...this.state.note, completed: true },
                });
              }}
            >
              marked as Completed
            </button>

            <button
              disabled={this.state.errors}
              type="submit"
              className="btn btn-primary mt-3 ml-1"
            >
              Submit
            </button>
          </form>
        </div>
      )
    );
  }
}

export default EditNote;
