import React, { Component } from "react";
import CreatableSelect from "react-select/creatable";

class Dropdown extends Component {
  state = {
    categories: [],
    errors: {},
  };

  onCategoryChange = (newValue, actionMeta) => {
    let updatedCategories;

    if (newValue) {
      updatedCategories = newValue.map((i) => ({ name: i.label }));
    } else if (actionMeta.action === "remove-value") {
      const removedValue = actionMeta.removedValue.label;
      const noteCategories = this.state.categories;
      updatedCategories = noteCategories.filter(
        (category) => category.name !== removedValue
      );
    }
    this.props.onCategoriesChanged(updatedCategories);
    this.setState({categories: updatedCategories});
  };

  render() {
    const { errors } = this.state;
    const allCategories = this.props.allCategories;
    const options = allCategories.map((c) => ({
      label: c.name,
      value: c.name,
    }));

    return (
      <div className="form-group col-md-6">
        <label htmlFor="categories">category</label>
        <p>you can select multi categories and also create categories :)</p>
        <CreatableSelect
          isMulti
          onChange={this.onCategoryChange}
          options={options}
          key={options.id}
        />
        {errors && errors.categories && (
          <div className="alert alert-danger">
            You must select as least one category
          </div>
        )}
      </div>
    );
  }
}

export default Dropdown;
