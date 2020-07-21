import React, { Component } from "react";
import { Context } from "../context/Context";
import moment from "moment";

class ShowNote extends Component {
  static contextType = Context;
  state = {categories: []}

   getNoteCategories = async () => {
   const note = this.props.location.state;

    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/notes/${note.id}`, {
      headers: {
        method: 'GET',
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const categories = await response.json();
    this.setState({categories})
   }

   async componentDidMount() {
     this.getNoteCategories();
   }

   renderCategories = (categories) => {
     return categories.map((c, index) => {
       return (
         
         <div key={index}>
          {c.name}
         </div>
       );
     } )
   }

  render() {
    const note = this.props.location.state;
    const {categories } = this.state;
    
    return (
      <div className="card mb-3">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <h5 className="card-title">{note.body}</h5>
          <h5>Categories: </h5>
          {this.renderCategories(categories)}

          
       
          <p className="card-text">
            <small className="text-muted">Created {moment(note.created_at).startOf("minute").fromNow()}</small>
          </p>
        </div>
      </div>
    );
  }
}

export default ShowNote;


