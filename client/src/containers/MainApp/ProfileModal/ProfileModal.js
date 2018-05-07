import React, { Component } from "react";
import Dialog from "material-ui/Dialog";

import WelcomeModal from "../../../components/MainApp/ProfileModal/WelcomeModal/WelcomeModal";
import PersonalInfoModal from "../../../components/MainApp/ProfileModal/PersonalInfoModal/PersonalInfoModal";

class ProfileModal extends Component {
  state = {
    step: "start",
    open: true
  };

  closeDialog = () => {
    this.setState({ open: false });
  };

  progress = step => {
    this.setState({ step });
  };

  render() {
    let modalContent = null;

    switch (this.state.step) {
      case "start":
        modalContent = (
          <WelcomeModal
            onCancel={this.closeDialog}
            onContinue={() => this.progress("personalInfo")}
          />
        );
        break;
      case "personalInfo":
        modalContent = <PersonalInfoModal />;
        break;
      default:
        modalContent = null;
    }

    return (
      <Dialog
        fullWidth={true}
        open={this.state.open}
        onBackdropClick={this.closeDialog}
        aria-labelledby="profile-dialog-title"
      >
        {modalContent}
      </Dialog>
    );
  }
}

export default ProfileModal;
