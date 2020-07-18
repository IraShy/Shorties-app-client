import React, { Component } from "react";
import { Context } from "../context/Context";
// import CreateCategory from "./CreateCategory";

class AddNote extends Component {
  static contextType = Context;

  onInputChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
    
  };

  onFormSubmit = async (event) => {
    event.preventDafault();
    const body = {
      note: this.state,
      // category: this.state.category
    };
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(body.note)
    });

    // const category_response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/categories`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${localStorage.getItem("token")}`,
    //   },
    //   body: JSON.stringify(body.category)

    // });

   
    console.log(body);
    // console.log(category_response);

    const newNote = await response.json();
    this.context.dispatchUser("add", newNote);
    this.props.history.push("/notes");
  };

  render() {
    return (
      <div className="container">
        <h1>Add a new Note</h1>
        <form onSubmit={this.onFormSubmit}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            onChange={this.onInputChange}
          />
          {/* <label htmlFor="title">category</label>
          <input
            type="text"
            name="category"
            id="category"
            onChange={this.onInputChange}
          /> */}


          <label htmlFor="description">Body</label>
          <textarea
            name="body"
            id="body"
            onChange={this.onInputChange}
          ></textarea>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default AddNote;
