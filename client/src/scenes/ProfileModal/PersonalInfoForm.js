import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { DialogTitle } from "material-ui/Dialog";
import { Field } from "redux-form/immutable";
import { DialogContent, DialogActions } from "material-ui/Dialog";
import Button from "material-ui/Button";
import { MenuItem } from "material-ui/Menu";
import { TextField, Select } from "redux-form-material-ui";
import { withStyles } from "material-ui/styles";
import { InputLabel } from "material-ui/Input";
import { FormControl } from "material-ui/Form";

import DatePicker from "components/UI/Fields/DatePicker/DatePicker";
import styles from "./ProfileModal.styles";
import { bioMaxLength } from "utilities/validation";
import Spinner from "components/UI/Spinner/Spinner";

const PersonalInfoForm = props => {
  let spinner = null;
  if (props.submitting) {
    spinner = <Spinner />;
  }

  let errorMessage = null;
  if (props.error) {
    errorMessage = <div className={props.classes.error}>{props.error}</div>;
  }

  return (
    <Fragment>
      {spinner}
      <div style={{ display: props.submitting ? "none" : "block" }}>
        <DialogTitle className={props.classes.title} id="profile-dialog-title">
          Tell us more about you...
        </DialogTitle>
        <form onSubmit={props.onSubmit}>
          <DialogContent
            className={[
              props.classes.contentNoPaddingTop,
              props.classes.content
            ].join(" ")}
          >
            {errorMessage}
            <div>
              <FormControl className={props.classes.field}>
                <Field
                  id="bio"
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
                  id="birthday"
                  name="birthday"
                  component={DatePicker}
                  label="Birthday"
                  disableFuture={true}
                  type="date"
                />
              </FormControl>
            </div>
            <div>
              <FormControl className={props.classes.field}>
                <InputLabel htmlFor="gender">Gender</InputLabel>
                <Field
                  style={{ textAlign: "left" }}
                  component={Select}
                  name="gender"
                  id="gender"
                >
                  <MenuItem value={null}>None</MenuItem>
                  <MenuItem value="Male"> Male </MenuItem>
                  <MenuItem value="Female"> Female </MenuItem>
                </Field>
              </FormControl>
            </div>
          </DialogContent>
          <DialogActions className={props.classes.centered}>
            <Button onClick={props.onCancel} color="default">
              Close
            </Button>
            <Button color="primary" type="submit">
              Continue
            </Button>
          </DialogActions>
        </form>
      </div>
    </Fragment>
  );
};

PersonalInfoForm.propTypes = {
  onCancel: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  error: PropTypes.string,
  submitting: PropTypes.bool.isRequired
};

export default withStyles(styles)(PersonalInfoForm);
