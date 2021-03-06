import React, { Component } from "react";
import Button from "material-ui/Button";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";

import styles from "./ImagePreview.styles";

class ImagePreview extends Component {
  static propTypes = {
    input: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired,
    meta: PropTypes.object.isRequired,
    defaultPicture: PropTypes.string.isRequired,
    height: PropTypes.string.isRequired,
    width: PropTypes.string.isRequired
  };

  state = {
    selectedImage: null
  };

  componentDidUpdate() {
    if (this.props.meta.error && this.state.selectedImage) {
      this.setState({ selectedImage: null });
    }
  }

  inputRef = React.createRef();

  openInput = () => {
    this.inputRef.current.click();
  };

  onBlur = delegate => e => delegate(e.target.files[0]);

  onChange = delegate => e => {
    this.setSelectedImage(e.target.files[0]);
    delegate(e.target.files[0]);
  };

  clearPicture = () => {
    this.setState({ selectedImage: null });
    this.props.input.onChange(null);
  };

  setSelectedImage = file => {
    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        this.setState({ selectedImage: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  render() {
    const {
      // eslint-disable-next-line no-unused-vars
      input: { value: omitValue, onChange, onBlur, ...inputProps },
      meta: { error }
    } = this.props;

    let errorMessage = null;
    if (error) {
      errorMessage = <div className={this.props.classes.error}>{error}</div>;
    }

    let selectedImage = this.props.defaultPicture;
    if (this.state.selectedImage) {
      selectedImage = this.state.selectedImage;
    }

    let clearButton = null;
    if (this.state.selectedImage || error) {
      clearButton = (
        <Button
          className={this.props.classes.imageButton}
          variant="raised"
          color="secondary"
          onClick={this.clearPicture}
        >
          CLEAR PICTURE
        </Button>
      );
    }

    return (
      <div style={{ width: this.props.width }}>
        <div>
          {selectedImage ? (
            <img
              style={{ width: this.props.width, height: this.props.height }}
              alt="profile"
              src={selectedImage}
            />
          ) : null}
        </div>
        <div>
          <Button
            className={this.props.classes.imageButton}
            variant="raised"
            color="default"
            onClick={this.openInput}
          >
            ADD PICTURE
          </Button>
          {clearButton}
          <input
            ref={this.inputRef}
            id={this.props.id}
            className={this.props.classes.imagePicker}
            onChange={this.onChange(onChange)}
            onBlur={this.onBlur(onBlur)}
            type="file"
            accept="image/*"
            {...inputProps}
          />
        </div>
        {errorMessage}
      </div>
    );
  }
}

export default withStyles(styles)(ImagePreview);
