import React, { Component } from "react";
import PropTypes from "prop-types";
import Dialog from "material-ui/Dialog";
import { connect } from "react-redux";

import * as actions from "../../../store/actions";
import Welcome from "../../../components/MainApp/ProfileModal/Welcome/Welcome";
import PersonalInfo from "../../../components/MainApp/ProfileModal/PersonalInfo/PersonalInfo";
import Spinner from "../../../components/UI/Spinner/Spinner";

class ProfileModal extends Component {
  static propTypes = {
    updateProfile: PropTypes.func.isRequired,
    error: PropTypes.string,
    step: PropTypes.string,
    open: PropTypes.bool.isRequired,
    closeDialog: PropTypes.func.isRequired,
    progress: PropTypes.func.isRequired,
    openDialog: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired
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

  submitProfileInfo = values => {
    this.props.updateProfile(values);
  };

  render() {
    let modalContent = null;

    switch (this.props.step) {
      case "start":
        modalContent = (
          <Welcome
            onCancel={this.closeDialog}
            onContinue={this.progress}
          />
        );
        break;
      case "personalInfo":
        modalContent = (
          <PersonalInfo
            errorMessage={this.props.error}
            loading={this.props.loading}
            onCancel={this.closeDialog}
            onSubmit={this.submitProfileInfo}
          />
        );
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
    open: state.profileModal.open,
    error: state.profile.error,
    loading: state.profile.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openDialog: () => dispatch(actions.profileModalInit()),
    closeDialog: () => dispatch(actions.profileModalClose()),
    progress: () => dispatch(actions.profileModalContinue()),
    updateProfile: values => dispatch(actions.profileModalUpdate(values))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileModal);
