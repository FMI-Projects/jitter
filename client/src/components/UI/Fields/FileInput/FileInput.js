import React from "react";
import PropTypes from "prop-types";

const adaptFileEventToValue = delegate => e => delegate(e.target.files[0]);

const fileInput = ({
  input: { value: omitValue, onChange, onBlur, ...inputProps },
  ...props
}) => (
  <input
    onChange={adaptFileEventToValue(onChange)}
    onBlur={adaptFileEventToValue(onBlur)}
    type="file"
    {...inputProps}
    {...props}
  />
);

fileInput.propTypes = {
  input: PropTypes.object.isRequired
};

export default fileInput;
