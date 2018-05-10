import React from "react";
import PropTypes from "prop-types";
import DatePicker from "material-ui-pickers/DatePicker";

const datePicker = props => {
  const value = props.input.value ? new Date(props.input.value) : null;

  return (
    <DatePicker
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

datePicker.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string,
  disableFuture: PropTypes.bool,
  className: PropTypes.object,
  id: PropTypes.string.isRequired
};

export default datePicker;
