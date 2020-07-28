import React from "react";

const Input = ({ name, label, error, ...rest  }) => {
  return (
    <div className="form-group col-md-6" id="input_label">
      <label htmlFor={name}>{label}</label>
      <input
        name={name}
        id={name}
        {...rest}
        className="form-control"
      />
      {error && <div className="alert alert-info">{error}</div>}
    </div>
  );
};

export default Input;
