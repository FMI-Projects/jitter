import React from "react";
import PropTypes from "prop-types";
import MaterialDatePicker from "material-ui-pickers/DatePicker";

const DatePicker = props => {
  const value = props.input.value ? new Date(props.input.value) : null;

  return (
    <MaterialDatePicker
      {...props.input}
      id={props.id}
      label={props.label}
      value={value}
      format={"MM/DD/YYYY"}
      disableFuture={props.disableFuture}
      className={props.className}
      clearable
    />
  );
};

DatePicker.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string,
  disableFuture: PropTypes.bool,
  className: PropTypes.object,
  id: PropTypes.string.isRequired
};

export default DatePicker;
