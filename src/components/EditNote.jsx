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
    }
  };
  onInputChange = (event) => {
    this.setState({
      note: { ...this.state.note, [event.target.id]: event.target.value },
    });
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
    const { id, title, body, completed, categories } = this.state.note;
    const editedNote = { title, body, completed, categories };

    const bodyCategory = {
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
        body: JSON.stringify(bodyCategory),
      }
    );

    const category_json = await category_response.json();
    editedNote.category_ids = category_json.map((c) => c.id);


    await fetch(`${process.env.REACT_APP_BACKEND_URL}/notes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(editedNote),
    });

    await this.context.dispatchUser("update", { ...editedNote, id });

    this.props.history.push("/notes");
  };

  async componentDidMount() {
    const note = this.props.location.state;
    const { categories } = note;
    
    this.setState({ note, loading: false });
    this.setState({categories: categories}); 
    
  }

  renderCategories = () => {
    const {categories} = this.state.note
    return  categories.map((c , index) => {
      return (
        <span key={index}>{c.name}</span>
        
      )
      console.log(c.name)
    })
  }

  render() {
    const { title, body, loading, categories } = this.state.note;
     const options = categories.map((c, index) => ({
      label: c.name,
      value: index,
    }));

    console.log(categories)

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
       
            <p>{this.renderCategories()}</p>
             <div className="form-group col-md-6">
              <label htmlFor="title">category</label>
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
