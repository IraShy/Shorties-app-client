import React from "react";

function dispatchUser(action, value) {
  switch (action) {
    case "populateNotes":
      this.setState({ notes: value.notes });
      break;
    case "populateCategories":
      this.setState({ categories: value.categories });
      break;
    case "search":
      this.setState({ search: value });
      break;
    case "delete": 
      this.setState((state) => {
        const notes = state.notes.filter((note) => {
          return note.id !== value
        })
        return {
          notes: notes
        }
      })
      break;
    case "add":
      this.setState((state) => {
        return {
          notes: [...state.notes, value],
        };
      });
      
      break;
    case "delete":
      this.setState((state) => {
        const notes = state.notes.filter((note) => {
          return value !== note.id;
        });
        return {
          notes: notes,
        };
      });
      break;


    case "deleteCategory":
      this.setState((state) => {
        const categories = state.categories.filter((category) => {
          return value !== category.id;
        });
        return {
          notes: {
            categories: categories,
          },
        };
      });
      break;

    case "update":
      this.setState((state) => {
        const notes = state.notes.map((note) => {
          if (value.id === note.id) {
            return value;
          } else {
            console.log("NoMatch");
            return note;
          }
        });
        console.log('update', {notes})
        return {
          notes: notes,
        };
      });
      break;
    case "logout":
      this.setState({ currentUser: false, notes: [] });
      break;
    case "current user":
      this.setState({ currentUser: value });
      break;
    default:
      console.log("in notes");
  }
}

const Context = React.createContext({
  notes: [],
  search: "",
  categories: [],
  dispatchUser: () => {},
  currentUser: false,
});

export { Context, dispatchUser };
