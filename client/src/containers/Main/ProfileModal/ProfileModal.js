import React, { Component } from "react";
import PropTypes from "prop-types";
import Dialog from "material-ui/Dialog";
import { connect } from "react-redux";

import * as actions from "../../../store/actions";
import Welcome from "../../../components/Main/ProfileModal/Welcome/Welcome";
import PersonalInfo from "../../../components/Main/ProfileModal/PersonalInfo/PersonalInfo";
import Spinner from "../../../components/UI/Spinner/Spinner";
import ProfilePicture from "../../../components/Main/ProfileModal/ProfilePicture/ProfilePicture";

class ProfileModal extends Component {
  static propTypes = {
    step: PropTypes.string,
    open: PropTypes.bool.isRequired,
    closeDialog: PropTypes.func.isRequired,
    progress: PropTypes.func.isRequired,
    openDialog: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.openDialog();
  }

  closeDialog = () => {
    this.props.closeDialog();
  };

  progress = () => {
    this.props.progress();
  };

  render() {
    let modalContent = null;

    switch (this.props.step) {
      case "start":
        modalContent = (
          <Welcome onCancel={this.closeDialog} onContinue={this.progress} />
        );
        break;
      case "personalInfo":
        modalContent = <PersonalInfo onCancel={this.closeDialog} />;
        break;
      case "profilePicture":
        modalContent = <ProfilePicture />;
        break;
      default:
        modalContent = <Spinner />;
    }

    return (
      <Dialog
        fullWidth={true}
        open={this.props.open}
        onBackdropClick={this.closeDialog}
        aria-labelledby="profile-dialog-title"
      >
        {modalContent}
      </Dialog>
    );
  }
}

const mapStateToProps = state => {
  return {
    step: state.profileModal.step,
    open: state.profileModal.open
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openDialog: () => dispatch(actions.profileModalInit()),
    closeDialog: () => dispatch(actions.profileModalClose()),
    progress: () => dispatch(actions.profileModalContinue())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileModal);
