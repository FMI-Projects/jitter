import React from "react";
import PropTypes from "prop-types";
import DatePicker from "material-ui-pickers/DatePicker";

const datePicker = props => {
  const value = props.input.value ? new Date(props.input.value) : null;

  return (
    <DatePicker
      {...props.input}
      value={value}
      format={"MM/DD/YYYY"}
      label={props.label}
      disableFuture={props.disableFuture}
      className={props.className}
      clearable
    />
  );
};

datePicker.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string,
  disableFuture: PropTypes.bool,
  className: PropTypes.object
};

export default datePicker;
