import React, { Component } from "react";
import PropTypes from "prop-types";
import Dialog from "material-ui/Dialog";
import { connect } from "react-redux";

import * as actions from "store/actions";
import Welcome from "./Welcome/Welcome";
import PersonalInfo from "./PersonalInfo/PersonalInfo";
import Spinner from "components/UI/Spinner/Spinner";
import ProfilePicture from "./ProfilePicture/ProfilePicture";
import Finish from "./Finish/Finish";

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
        modalContent = <ProfilePicture onCancel={this.closeDialog} />;
        break;
      case "finish":
        modalContent = <Finish onCancel={this.closeDialog} />;
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
    step: state.getIn(["userProfileModal", "step"]),
    open: state.getIn(["userProfileModal", "open"])
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openDialog: () => dispatch(actions.userProfileModalInit()),
    closeDialog: () => dispatch(actions.userProfileModalClose()),
    progress: () => dispatch(actions.userProfileModalContinue())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileModal);
