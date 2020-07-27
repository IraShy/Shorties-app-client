import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Context } from "../context/Context";
import Pagination from "../shared/Pagination";
import { paginate } from "../shared/paginate";

class Categories extends Component {
  static contextType = Context;

  state = {
    pageSize: 8,
    currentPage: 1,
  };

  deleteCategory = async (id) => {
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/categories/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    this.context.dispatchUser("deleteCategory", id);
  };

  renderCategories = (categories) => {
    const { pageSize, currentPage } = this.state;
    const categoriesList = paginate(categories, currentPage, pageSize);
    return categoriesList.map((category, index) => {
      return (
        <div key={index}>
          {/* <h1>{category.name}</h1> */}
          <Link
            to={{
              pathname: `/categories/${category.id}`,
              state: category,
            }}
          >
            <button>{category.name}</button>
          </Link>

          {/* <button onClick={() => this.deleteNote(note.id)}>Delete</button> */}

          {/* <hr /> */}
        </div>
      );
    });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  render() {
    const { categories } = this.context;
    if (categories.length) {
      const { pageSize, currentPage } = this.state;
      return (
        <React.Fragment>
          {this.renderCategories(categories)}
          <Pagination
            itemsCount={categories.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </React.Fragment>
      );
    } else {
      return null;
    }
  }
}

export default Categories;
