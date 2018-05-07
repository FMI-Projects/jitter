import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { DialogTitle } from "material-ui/Dialog";
import { Field, reduxForm } from "redux-form";
import { DialogContent, DialogActions } from "material-ui/Dialog";
import Button from "material-ui/Button";
import { MenuItem } from "material-ui/Menu";
import { TextField, Select } from "redux-form-material-ui";
import { withStyles } from "material-ui/styles";
import { InputLabel } from "material-ui/Input";
import { FormControl } from "material-ui/Form";

import DatePicker from "../../../UI/Fields/DatePicker/DatePicker";
import styles from "./PersonalInfoModal.styles";
import { bioMaxLength } from "../../../../utilities/validation";
import Spinner from "../../../UI/Spinner/Spinner";

const personalInfoModal = props => {
  if (props.loading) {
    return <Spinner />;
  }

  let errorMessage = null;
  if (props.errorMessage) {
    errorMessage = (
      <div className={props.classes.error}>{props.errorMessage}</div>
    );
  }

  return (
    <Fragment>
      <DialogTitle id="profile-dialog-title">
        Tell us more about you...
      </DialogTitle>
      <form onSubmit={props.handleSubmit}>
        <DialogContent className={props.classes.content}>
          {errorMessage}
          <div>
            <FormControl className={props.classes.field}>
              <Field
                name="bio"
                component={TextField}
                label="Biography"
                validate={[bioMaxLength]}
                multiline
                rows={3}
                autoFocus={true}
              />
            </FormControl>
          </div>
          <div>
            <FormControl className={props.classes.field}>
              <Field
                name="birthday"
                component={DatePicker}
                label="Birthday"
                type="date"
              />
            </FormControl>
          </div>
          <div>
            <FormControl className={props.classes.field}>
              <InputLabel htmlFor="gender">Gender</InputLabel>
              <Field component={Select} name="gender" id="gender">
                <MenuItem value={null}>None</MenuItem>
                <MenuItem value="Male"> Male </MenuItem>
                <MenuItem value="Female"> Female </MenuItem>
              </Field>
            </FormControl>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onCancel} color="default">
            Close
          </Button>
          <Button color="primary" type="submit">
            Continue
          </Button>
        </DialogActions>
      </form>
    </Fragment>
  );
};

personalInfoModal.propTypes = {
  errorMessage: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

export default withStyles(styles)(
  reduxForm({ form: "personalInfo" })(personalInfoModal)
);
