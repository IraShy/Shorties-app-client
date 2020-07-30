import React, { Component } from "react";
import Dropdown from "../shared/Dropdown";
import Input from "../shared/Input";
import Joi from "joi-browser";
import { Link } from "react-router-dom";
import _ from "lodash";


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
      <button disabled={this.state.errors} className="btn btn-warning">
        {label}
      </button>
    );
  }

  renderButtonEdit(label) {
    const { note } = this.state;
    return (
      <button disabled={this.validateNote(note)} className="btn btn-warning">
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

  renderTextarea(errors) {
    const {note } = this.state;
    return (
      <div className="form-group">
        <label htmlFor="textarea">Description </label>
        <textarea
          name="body"
          onChange={this.onInputChange}
          value={note.body}
          className="form-control"
          id="body"
          rows="3"
        ></textarea>
        { !_.isEmpty(errors) && <div className="alert alert-info">{errors.body}</div>}
      </div>
    );
  }


  renderBack = () => {
    return (
      <img
        src={require("../assets/back.png")}
        width="35"
        height="35"
        alt="icon"
        id="back_icon"
        onClick={this.props.history.goBack}
      />
    );
  };

  renderBackEdit = () => {
    return (
      <Link to={`/notes`}>
        <img
          src={require("../assets/back.png")}
          width="40"
          height="40"
          alt="icon"
          id="back_icon"
        />
      </Link>
    );
  };
}

export default Validation;
