import React, { Component } from "react";
import CreatableSelect from "react-select/creatable";

class Dropdown extends Component {
  state = {
    errors: {},
  };

  onCategoryChange = (newValue, actionMeta) => {
    let updatedCategories;

    if (newValue) {
      updatedCategories = newValue.map((i) => ({ name: i.label }));
    } else if (actionMeta.action === "remove-value") {
      const removedValue = actionMeta.removedValue.label;
      const noteCategories = this.props.selected;
      updatedCategories = noteCategories.filter(
        (category) => category.name !== removedValue
      );
    }
    this.props.onCategoriesChanged(updatedCategories);
  };

  render() {
    const { errors } = this.state;
    const { selected } = this.props;
    // const { errors } = this.props.errors;
    const allCategories = this.props.allCategories;

    const options = allCategories.map((c) => ({
      label: c.name,
      value: c.name,
    }));

    let value;
    if (selected) {
      value = selected.map((c) => ({
        label: c.name,
        value: c.name,
      }));
    }

    console.log({selected})

    return (
      <div className="form-group col-md-6">
        <label htmlFor="categories">category</label>
        <p>you can select multi categories and also create categories :)</p>
        <CreatableSelect
          isMulti
          onChange={this.onCategoryChange}
          options={options}
          key={options.id}
          value={value}
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
