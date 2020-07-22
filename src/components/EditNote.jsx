import React, { Component } from "react";
import { Context } from "../context/Context";
import CreatableSelect from "react-select/creatable";

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

  onFormSubmit = async (event) => {
    event.preventDefault();
    const { id, title, body, completed, categories, picture } = this.state.note;
    const requestBody = {
      title,
      body,
      completed,
      picture,
      categories_attributes: categories,
    };

    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/notes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(requestBody),
    });
    const editedNote = await response.json();
    // editedNote.categories = editedNote.categories_attributes;

    await this.context.dispatchUser("update", { ...editedNote, id });

    this.props.history.push("/notes");
  };

  async componentDidMount() {
    const note = this.props.location.state;
    const { categories } = note;

    this.setState({ note, loading: false });
    this.setState({ categories: categories });
  }

  onCategoryChange = (newValue, actionMeta) => {
    if (newValue) {
      this.setState({
        note: {
          ...this.state.note,
          categories: newValue.map((i) => ({ name: i.label })),
        },
      });
    } else if (actionMeta.action === "remove-value") {
      const removedValue = actionMeta.removedValue.label;
      const noteCategories = this.state.note.categories;
      this.setState({
        note: {
          ...this.state.note,
          categories: noteCategories.filter(
            (category) => category.name !== removedValue
          ),
        },
      });
    }
  };

  render() {
    const { title, body, categories, loading, picture } = this.state.note;
    const { note } = this.state;

    const options = this.context.categories.map((c) => ({
      label: c.name,
      value: c.name,
    }));

    const selected = categories.map((c) => ({
      label: c.name,
      value: c.name,
    }));
    console.log({ note, options, categories: this.context.categories });

    return (
      !loading && (
        <div className="container">
          <h1>Edit</h1>
          <form onSubmit={this.onFormSubmit}>
            <div className="form-group col-md-6">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                name="title"
                id="title"
                onChange={this.onInputChange}
                value={title}
                className="form-control"
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="body">Description</label>
              <textarea
                name="body"
                id="body"
                onChange={this.onInputChange}
                value={body}
                className="form-control"
              ></textarea>
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="title">category</label>
              <p>
                you can select multi categories and create categories you prefer
                :)
              </p>
              <CreatableSelect
                isMulti
                onChange={this.onCategoryChange}
                value={selected}
                options={options}
                key={options.id}
              />

              {/* <input
                name="categories"
                id="categories"
                onChange={this.onInputChange}
                value={this.renderCategories()}
                className="form-control"
              ></input> */}
            </div>

            <h5 className="card-title">Image </h5>
            <div>
              {" "}
              <img src={note.picture} alt="" />
            </div>
            <label htmlFor="picture">Picture</label>
            <input
              type="file"
              name="picture"
              id="picture"
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
            <button type="submit" className="btn btn-danger mt-3 ml-1">
              Submit
            </button>
          </form>
        </div>
      )
    );
  }
}

export default EditNote;
