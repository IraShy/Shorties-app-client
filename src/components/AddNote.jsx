import React, { Component } from "react";
import { Context } from "../context/Context";
import CreatableSelect from "react-select/creatable";

class AddNote extends Component {
  static contextType = Context;

  state = {
    note: {},
    categories: [],
  };

  onInputChange = (event) => {
    this.setState({
      "note": {
        ...this.state.note,
        [event.target.id]: event.target.value,
      }
    });
  };

  onCategoryChange = (newValue, actionMeta) => {
      if(newValue) {
        this.setState({categories: newValue.map(i => i.label)})
      } else if(actionMeta.action === "remove-value") {
        const removedValue = actionMeta.removedValue.label;
        this.setState({categories: this.state.categories.filter(category => category !== removedValue)});
      }
  }

  onFormSubmit = async (event) => {
    event.preventDefault();
    const { note } = this.state;
    const { categories } = this.state;
    const body = {
      categories: categories.map(c => ({name: c}))
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
    note.category_ids = category_json.map(c => c.id);

    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ note }),
    });

    const newNote = await response.json();
    this.context.dispatchUser("add", newNote);
    this.props.history.push("/notes");
  };



 

  render() {
   
    const{categories} = this.context
    const options = categories.map((c, index) => ({label: c.name, value: index}))
    return (
      <div className="container">
        <h1>Add a new Note</h1>
        <form onSubmit={this.onFormSubmit}>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                name="title"
                id="title"
                onChange={this.onInputChange}
                className="form-control"
              />
            </div>

            <div className="form-group col-md-6">
              <label htmlFor="title">category</label>
              <CreatableSelect
                isMulti
                onChange={this.onCategoryChange}
                options={ options }
                key={options.id}              
              />
        
            </div>

            <div className="form-group col-md-6">
              <label htmlFor="description">Body</label>
              <textarea
                name="body"
                id="body"
                onChange={this.onInputChange}
                className="form-control"
              ></textarea>
              <button type="submit" className="btn btn-primary mt-3 ml-1">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default AddNote;
