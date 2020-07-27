import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Context } from "../context/Context";
import Pagination from "../shared/Pagination";
import { paginate } from "../shared/paginate";
import Button from "react-bootstrap/Button";
import "../stylesheets/Categories.scss";

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
        <div className="container" key={index}>
          <Link
            to={{
              pathname: `/categories/${category.id}`,
              state: category,
            }}
          >
            <Button className="category" variant="outline-secondary" size="lg" block>
              {category.name}
            </Button>
          </Link>
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
          <h1 className="title">Categories</h1>
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
