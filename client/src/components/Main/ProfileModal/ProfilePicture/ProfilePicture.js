import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { DialogTitle } from "material-ui/Dialog";
import { Field, reduxForm } from "redux-form";
import { DialogContent, DialogActions } from "material-ui/Dialog";
import Button from "material-ui/Button";
import { withStyles } from "material-ui/styles";
import { FormControl } from "material-ui/Form";

import styles from "./ProfilePicture.styles";
import Spinner from "../../../UI/Spinner/Spinner";
import * as actions from "../../../../store/actions";
import FileInput from "../../../UI/Fields/FileInput/FileInput";
import { validImageType, validImageSize } from "../../../../utilities/validation";

const personalInfo = props => {
  let spinner = null;
  if (props.submitting) {
    spinner = <Spinner />;
  }

  let errorMessage = null;
  if (props.error) {
    errorMessage = <div className={props.classes.error}>{props.error}</div>;
  }

  const { handleSubmit } = props;
  const submit = handleSubmit(actions.profilePicture);

  return (
    <Fragment>
      {spinner}
      <div style={{ display: props.submitting ? "none" : "block" }}>
        <DialogTitle id="profile-dialog-title">
          We&#39;re almost there...
        </DialogTitle>
        <form onSubmit={submit}>
          <DialogContent className={props.classes.content}>
            {errorMessage}
            <div>
              <FormControl>
                <Field
                  name="profilePicture"
                  component={FileInput}
                  validate={[validImageSize, validImageType]}
                  label="Profile Picture"
                />
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
      </div>
    </Fragment>
  );
};

personalInfo.propTypes = {
  onCancel: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.string,
  submitting: PropTypes.bool.isRequired
};

export default withStyles(styles)(
  reduxForm({ form: "profilePicture" })(personalInfo)
);
