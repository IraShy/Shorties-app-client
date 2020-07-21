import React, { Component } from 'react';
import { Context } from "../context/Context";



class EditNotes extends Component {
  static contexType = Context;
  state ={
    title: "",
    body: "",
    categories: [],
    piuture: "",
    completed: false,
    loading: true,
    id: Number(this.props.match.params.id) 
  };

  onInputChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  onFormSubmit = async (event) => {
    event.preventDefault();
    const {name, body, completed, id} = this.state;
    const editedNote = { name, body,  completed, id}

    await this.context.dispatch("update", editedNote);

    await fetch(`${process.env.REACT_APP_BACKEND_URL}/notes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringfy(editedNote)
    });
    this.props.history.push("/notes");
  }

  async componentDidMount() {
    const notes = this.context.notes
    const foundNote = notes.find((note) => {return note.id ===this.state.id});
    this.setState({...foundNote, loading: false});

  }

  render() { 
    const { name, body, loading } = this.state;
    return ( 
        !loading && (
        <div className="container">
          <h1>Edit</h1>
          <form onSubmit={this.onFormSubmit}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={this.onInputChange}
              value={name}
            />
          
            <label htmlFor="body">Description</label>
            <textarea
              name="body"
              id="body"
              onChange={this.onInputChange}
              value={body}
            ></textarea>

            <button type="submit" className="btn btn-danger mt-3 ml-1" htmlFor="completed" >
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
 
export default EditNotes;