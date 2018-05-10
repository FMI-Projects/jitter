import React, { Fragment } from "react";
import Button from "material-ui/Button";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";

import styles from "./ImagePreview.styles";

const adaptFileEventToValue = delegate => e => delegate(e.target.files[0]);

const fileInput = ({
  input: { value: omitValue, onChange, onBlur, ...inputProps },
  ...props
}) => (
  <Fragment>
    <Button>
      <label htmlFor={props.id}>ADD PICTURE</label>
    </Button>
    <input
      id={props.id}
      className={props.classes.imagePicker}
      onChange={adaptFileEventToValue(onChange)}
      onBlur={adaptFileEventToValue(onBlur)}
      type="file"
      {...inputProps}
    />
  </Fragment>
);

fileInput.propTypes = {
  input: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(fileInput);
