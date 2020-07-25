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


  render() { 
    return (  );
  }
}
 
export default Validation;