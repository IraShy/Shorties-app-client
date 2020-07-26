import React, { Component } from 'react';

class Validation extends Component {
  state = {
    note: { title: "", body: "" },
    categories: [],
    errors: {},
  };

   schema = Joi.object({
    title: Joi.string().min(2).required(),
    body: Joi.string().min(2).required(),
    categories: Joi.array().min(1).required(),
    picture: Joi.any(),
  });

   validateNote = (note) => {
    const options = { abortEarly: true };
    const { error } = Joi.validate(note, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };


  render() { 
    return (  );
  }
}
 
export default Validation;