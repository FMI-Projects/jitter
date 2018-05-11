import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { DialogTitle } from "material-ui/Dialog";
import { Field, reduxForm } from "redux-form";
import {
  DialogContent,
  DialogActions,
  DialogContentText
} from "material-ui/Dialog";
import Button from "material-ui/Button";
import { withStyles } from "material-ui/styles";

import defaultProfilePicture from "../../../../assets/images/defaultUser.png";
import imageConstants from "../../../../utilities/constants/imageConstants";
import styles from "../ProfileModal.styles";
import Spinner from "../../../UI/Spinner/Spinner";
import * as actions from "../../../../store/actions";
import FileInput from "../../../UI/Fields/ImagePreview/ImagePreview";
import {
  validImageType,
  validImageSize
} from "../../../../utilities/validation";

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
  const submit = handleSubmit(actions.userProfilePicture);

  return (
    <Fragment>
      {spinner}
      <div style={{ display: props.submitting ? "none" : "block" }}>
        <DialogTitle className={props.classes.title} id="profile-dialog-title">
          We&#39;re almost there...
        </DialogTitle>
        <form onSubmit={submit}>
          <DialogContent
            className={[
              props.classes.contentNoPaddingTop,
              props.classes.content
            ].join(" ")}
          >
            {errorMessage}
            <DialogContentText variant="body1">
              Help others recognise you by adding a profile picture.
            </DialogContentText>
            <div className={props.classes.centered}>
              <Field
                id="profilePicture"
                name="profilePicture"
                defaultPicture={defaultProfilePicture}
                height={imageConstants.defaultProfilePicture.height}
                width={imageConstants.defaultProfilePicture.width}
                component={FileInput}
                validate={[validImageSize, validImageType]}
                label="Profile Picture"
              />
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
