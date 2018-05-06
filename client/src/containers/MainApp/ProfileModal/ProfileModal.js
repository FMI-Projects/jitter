import React, { Component } from "react";
import Dialog, {
  DialogTitle,
  DialogContent
} from "material-ui/Dialog";
import { withStyles } from "material-ui/styles";

import WelcomeModal from "../../../components/MainApp/ProfileModal/WelcomeModal";
import styles from "./ProfileModal.styles";

class ProfileModal extends Component {
  state = {
    step: "start",
    open: true
  };

  render() {
    let modalContent = null;

    switch (this.state.step) {
      case "start":
        modalContent = <WelcomeModal />;
        break;
      default:
        modalContent = null;
    }

    return (
      <Dialog open={this.state.open} aria-labelledby="profile-dialog-title">
        <DialogTitle id="profile-dialog-title">Welcome to Jitter!</DialogTitle>
        <DialogContent>{modalContent}</DialogContent>
      </Dialog>
    );
  }
}

export default withStyles(styles)(ProfileModal);
