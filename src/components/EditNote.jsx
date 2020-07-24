import React, { Component } from "react";
import { Context } from "../context/Context";
import CreatableSelect from "react-select/creatable";
import Input from "../shared/Input";
import Dropdown from "../shared/Dropdown";

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
    const { categories } = this.state.note;
    this.setState({
      note: { ...this.state.note, categories: updatedCategories },
    });
    console.log("setState");
    console.log(categories);
  };

  render() {
    const { title, body, categories, loading } = this.state.note;
    const { note } = this.state;

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
            />

            <Input
              name="body"
              label="Description"
              onChange={this.onInputChange}
              value={body}
            />

            <Dropdown
              allCategories={this.context.categories}
              selected={this.state.note.categories}
              onCategoriesChanged={this.categoriesUpdated}
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
