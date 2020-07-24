import React, { Component } from "react";
import { Context } from "../context/Context";
import Joi from "joi-browser";
import CreatableSelect from "react-select/creatable";
import Input from "../shared/Input";

class AddNote extends Component {
  static contextType = Context;

  state = {
    note: { title: "", body: "" },
    categories: [],
    errors: {},
  };

  schema = Joi.object({
    title: Joi.string().min(2).required(),
    body: Joi.string().min(2).required(),
    categories: Joi.array().min(1).required(),
    picture: Joi.any(),
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
    const options = { abortEarly: false };
    const { error } = this.schema.validate(note, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  onCategoryChange = (newValue, actionMeta) => {
    let categories;
    if (newValue) {
      categories = newValue.map((i) => i.label);
    } else if (actionMeta.action === "remove-value") {
      const removedValue = actionMeta.removedValue.label;
      categories = this.state.categories.filter(
        (category) => category !== removedValue
      );
    }
    const errors = this.validateNote({ ...this.state.note, categories });
    this.setState({ categories, errors });
  };

  onFormSubmit = async (event) => {
    event.preventDefault();
    const { note } = this.state;
    const { categories } = this.state;
    const body = {
      categories: categories.map((c) => ({ name: c })),
    };
    const category_response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/categories`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(body),
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
  render() {
    const { errors } = this.state;
    const { title, body } = this.state.note;
    const { categories } = this.context;
    const options = categories.map((c, index) => ({
      label: c.name,
      value: index,
    }));

    return (
      <div className="container">
        <h1>Add a new Note</h1>
        <form encType="multipart/form-data" onSubmit={this.onFormSubmit}>
          <Input
            name="title"
            label="Title"
            onChange={this.onInputChange}
            value={title}
            error={errors && errors.title}
          />

          <div className="form-group col-md-6">
            <label htmlFor="categories">category</label>
            <p>you can select multi categories and also create categories :)</p>
            <CreatableSelect
              isMulti
              onChange={this.onCategoryChange}
              options={options}
              key={options.id}
              error={errors && errors.categories}
            />
            {errors && errors.categories && (
              <div className="alert alert-danger">
                You must select as least one category
              </div>
            )}
          </div>

          <Input
            name="body"
            label="Description"
            onChange={this.onInputChange}
            value={body}
            error={errors && errors.body}
          />

          <Input
            type="file"
            name="picture"
            id="picture"
            label="Image"
            onChange={this.onInputChange}
          />

          <button
            disabled={this.state.errors}
            type="submit"
            className="btn btn-primary mt-3 ml-1"
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default AddNote;
