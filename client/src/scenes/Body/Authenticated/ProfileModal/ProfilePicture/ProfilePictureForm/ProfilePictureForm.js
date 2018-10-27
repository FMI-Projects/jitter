import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { DialogTitle } from "material-ui/Dialog";
import { Field } from "redux-form/immutable";
import {
  DialogContent,
  DialogActions,
  DialogContentText
} from "material-ui/Dialog";
import Button from "material-ui/Button";
import { withStyles } from "material-ui/styles";

import defaultProfilePicture from "assets/images/defaultUser.png";
import imageConstants from "utilities/constants/imageConstants";
import styles from "../../ProfileModal.styles";
import Spinner from "components/UI/Spinner/Spinner";
import FileInput from "components/UI/Fields/ImagePreview/ImagePreview";
import { validImageType, validImageSize } from "utilities/validation";

const profilePictureForm = props => {
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
          We&#39;re almost there...
        </DialogTitle>
        <form onSubmit={props.onSubmit}>
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

profilePictureForm.propTypes = {
  onCancel: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  error: PropTypes.string,
  submitting: PropTypes.bool.isRequired
};

export default withStyles(styles)(profilePictureForm);
