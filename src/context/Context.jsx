import React from "react";

function dispatchUser(action, value) {
  switch (action) {
    case "populateNotes":
      this.setState({ notes: value.notes });
      break;
    case "populateCategories":
      this.setState({ categories: value.categories });
      break;
    case "populateUsers":
      this.setState({ users: value.users });
      break;
    case "populateCohortStudents":
      this.setState({ cohortStudents: value });
      break;
    case "search":
      this.setState({ search: value });
      break;
    case "delete":
      this.setState((state) => {
        const notes = state.notes.filter((note) => {
          return note.id !== value;
        });
        return {
          notes: notes,
        };
      });
      break;
    case "add":
      this.setState((state) => {
        return {
          notes: [...state.notes, value],
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
            return note;
          }
        });

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
    case "is_teacher":
      this.setState({ isTeacher: value });
      break;
    case "addCohort":
      this.setState((state) => {
        return {
          cohorts: [...state.cohorts, value],
        };
      });
      break;
    case "populateCohorts":
      this.setState({ cohorts: value.cohorts });
      break;
    case "deleteCohort":
      this.setState((state) => {
        const cohorts = state.cohorts.filter((cohort) => {
          return value !== cohort.id;
        });
        return {
          cohorts: cohorts,
        };
      });
      break;
    default:
      console.log("in notes");
  }
}

const Context = React.createContext({
  notes: [],
  search: "",
  categories: [],
  cohorts: [],
  cohortStudents: [],
  dispatchUser: () => {},
  currentUser: false,
  isTeacher: false,
});

export { Context, dispatchUser };
