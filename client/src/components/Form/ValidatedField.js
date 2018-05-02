import React from "react";
import PropTypes from "prop-types";

const validatedField = (props) => (
  <div>
    <label>{props.label}</label>
    <div>
      <input {...props.input} placeholder={props.label} type={props.type} />
      {props.meta.touched &&
        ((props.meta.error && <span>{props.meta.error}</span>) ||
          (props.meta.warning && <span>{props.meta.warning}</span>))}
    </div>
  </div>
);

validatedField.propTypes = {
    input: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    meta: PropTypes.object.isRequired
};

export default validatedField;
