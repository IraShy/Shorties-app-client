import React, { Component } from "react";
import Dropdown from "../shared/Dropdown";
import Input from "../shared/Input";
import Joi from "joi-browser";

class Validation extends Component {
  state = {
    note: {},
    categories: [],
    errors: {},
  };

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

  renderDropdown(selected) {
    const { errors } = this.state;

    return (
      <Dropdown
        selected={selected}
        allCategories={this.context.categories}
        onCategoriesChanged={this.categoriesUpdated}
        errors={errors && errors.categories}
        categoryError={this.categoryError}
      />
    );
  }

  renderPicture() {
    return (
      <Input
        type="file"
        name="picture"
        id="picture"
        label="Image"
        onChange={this.onInputChange}
      />
    );
  }

  renderButton(label) {
    return (
      <button disabled={this.validateNote()} className="btn btn-primary">
        {label}
      </button>
    );
  }

  renderInput(name, label, type = "text") {
    const { note, errors } = this.state;
    return (
      <Input
        type={type}
        name={name}
        label={label}
        onChange={this.onInputChange}
        value={note[name]}
        error={errors && errors[name]}
      />
    );
  }
  renderMarked() {
    return (
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
    );
  }
}

export default Validation;
