import React from "react";
import PropTypes from "prop-types";

const TextInputGroup = props => {
  const {
    label,
    name,
    type,
    placeholder,
    error,
    value,
    onChange,
    autofocus
  } = props;

  return (
    <div className="form-group input-group-prepend mt-5 mb-5">
      <span htmlFor={name} className="input-group-text">
        {label}
      </span>
      <input
        id={name}
        autoFocus={autofocus}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        error={error}
        className="input-group"
      ></input>
    </div>
  );
};

TextInputGroup.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  autofocus: PropTypes.bool,
  name: PropTypes.string.isRequired,
  error: PropTypes.string
};
TextInputGroup.defaultProps = {
  type: "text"
};
export default TextInputGroup;
