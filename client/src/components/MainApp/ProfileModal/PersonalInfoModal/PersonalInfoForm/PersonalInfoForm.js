import React from "react";
import PropTypes from "prop-types";
import { Field, reduxForm } from "redux-form";
import { DialogContent, DialogActions } from "material-ui/Dialog";
import Button from "material-ui/Button";
import { TextField } from "redux-form-material-ui";
import { withStyles } from "material-ui/styles";

import DatePicker from "../../../../UI/Fields/DatePicker/DatePicker";
import styles from "./PersonalInfoForm.styles";
import { bioMaxLength } from "../../../../../utilities/validation";

const personalInfoForm = props => {
  let errorMessage;
  if (props.errorMessage) {
    errorMessage = <div>{props.errorMessage}</div>;
  }

  return (
    <form onSubmit={props.handleSubmit}>
      <DialogContent style={{ paddingTop: 0 }}>
        {errorMessage}
        <div>
          <Field
            className={props.classes.field}
            name="bio"
            component={TextField}
            label="Biography"
            validate={[bioMaxLength]}
            multiline
            rows={3}
            autoFocus={true}
          />
        </div>
        <div>
          <Field
            className={props.classes.field}
            name="birthday"
            component={DatePicker}
            label="Birthday"
            type="date"
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button color="default">Cancel</Button>
        <Button color="primary" type="submit">
          Continue
        </Button>
      </DialogActions>
    </form>
  );
};

personalInfoForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(
  reduxForm({ form: "personalInfo" })(personalInfoForm)
);
