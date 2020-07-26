import React, { Component } from "react";
import { Context } from "../context/Context";
import Joi from "joi-browser";
import CreatableSelect from "react-select/creatable";
// import Form from "./common/form";
import Input from "../shared/Input";

class AddNote extends Component {
  static contextType = Context;

  state = {
    note: {},
    categories: [],
    errors: {},
  };

  schema = {
    categories: Joi.array().required().label("Category"),
  };

  onInputChange = (event) => {
    if (event.target?.files) {
      this.setState({
        note: {
          ...this.state.note,
          [event.target.id]: event.target.files[0],
        },
      });
    } else {
      this.setState({
        note: {
          ...this.state.note,
          [event.target.id]: event.target.value,
        },
      });
    }
  };

  onCategoryChange = (newValue, actionMeta) => {
    if (newValue) {
      this.setState({ categories: newValue.map((i) => i.label) });
    } else if (actionMeta.action === "remove-value") {
      const removedValue = actionMeta.removedValue.label;
      this.setState({
        categories: this.state.categories.filter(
          (category) => category !== removedValue
        ),
      });
    }
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
          />

          <div className="form-group col-md-6">
            <label htmlFor="categories">category</label>
            <p>
              you can select multi categories and create categories you prefer
              :)
            </p>
            <CreatableSelect
              isMulti
              onChange={this.onCategoryChange}
              options={options}
              key={options.id}
            />
          </div>


          <Input
            name="body"
            label="Description"
            onChange={this.onInputChange}
            value={body}
          />

          <Input
            type="file"
            name="picture"
            id="picture"
            label="Image"
            onChange={this.onInputChange}
          />

          <button type="submit" className="btn btn-primary mt-3 ml-1">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default AddNote;
