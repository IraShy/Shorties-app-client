import React, { Component } from "react";
import { Context } from "../context/Context";


class EditNote extends Component {
  static contextType = Context;
  state = {   
   note: {  title: "",
      body: "",
      categories: [],
      piuture: "",
      completed: false,
      loading: true,
      id: Number(this.props.match.params.id)}
  };
  onInputChange = (event) => {
    this.setState({
      note: {...this.state.note, [event.target.id]: event.target.value}
    });
  };

  onFormSubmit = async (event) => {
    event.preventDefault();

    const { id, title, body, completed } = this.state.note;
    const editedNote = { title, body, completed };
    console.log(editedNote)
    

    await fetch(`${process.env.REACT_APP_BACKEND_URL}/notes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(editedNote),
    });
    
    await this.context.dispatchUser("update", {...editedNote, id});

    this.props.history.push("/notes");
  };

  async componentDidMount() {
    const note = this.props.location.state;
    this.setState({ note, loading: false });
   
  }

  render() {
    console.log(this.state)
    const { title, body, loading } = this.state.note;
    
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

            <button
              type="text"
              className="btn btn-danger mt-3 ml-1"
              htmlFor="completed"
              onClick={(e) => {
              e.preventDefault();
                this.setState({ note: { ...this.state.note, completed: true } })
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
