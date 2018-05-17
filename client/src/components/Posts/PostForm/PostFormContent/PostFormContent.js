import React, {Fragment, Component} from "react";
import PropTypes from "prop-types";
import {Field} from "redux-form";
import {withStyles} from "material-ui/styles";
import Button from "material-ui/Button";
import Grid from "material-ui/Grid";
import Card, {CardHeader} from "material-ui/Card";
import {TextField} from "redux-form-material-ui";

import {
  required,
  postTitleMinLength,
  postContentMaxLength
} from "utilities/validation";
import Spinner from "../../../UI/Spinner/Spinner";
import FileInput from "../../../UI/Fields/ImagePreview/ImagePreview";
import {
  validImageType,
  validImageSize
} from "utilities/validation";
import styles from "./PostFormContent.styles";

class PostForm extends Component {
  componentDidMount() {
    this.props.initialize({
      title: this.props.title,
      content: this.props.content,
      imageUrl: this.props.imageUrl
    });
  }

  render() {
    let spinner = null;
    const props = this.props;

    if (props.submitting) {
      spinner = <Spinner size={50} />;
    }

    let errorMessage;
    if (props.error) {
      errorMessage = <div className={props.classes.error}>{props.error}</div>;
    }

    return (
      <Fragment>
        {spinner}
        <div style={{display: props.submitting ? "none" : "block"}}>
          <Grid container>
            <Card className={props.classes.card}>
              <CardHeader
                classes={{title: props.classes.cardTitle}}
                title={props.formTitle}
              />
            </Card>
          </Grid>
          <form className={props.classes.form} onSubmit={props.onSubmit}>
            {errorMessage}
            <div>
              <Field
                className={props.classes.textField}
                name="title"
                component={TextField}
                value={props.title}
                label="Title"
                validate={[required, postTitleMinLength]}
              />
            </div>
            <div>
              <Field
                className={props.classes.textField}
                name="content"
                component={TextField}
                validate={[postContentMaxLength]}
                value={props.content}
                margin="dense"
                label="What's jittering?"
                multiline
                rows={4}
              />
            </div>
            <div className={props.classes.imageField}>
              <Field
                id="imageUrl"
                name="imageUrl"
                defaultPicture=""
                height="200px"
                value={props.imageUrl}
                width="200px"
                component={FileInput}
                validate={[validImageSize, validImageType]}
                label="Add image"
              />
            </div>
            <Button
              className={props.classes.button}
              variant="raised"
              color="primary"
              type="submit">
              Post
            </Button>
          </form>
        </div>
      </Fragment>
    );
  }
}

PostForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  error: PropTypes.string,
  classes: PropTypes.object.isRequired,
  submitting: PropTypes.bool.isRequired,
  formTitle: PropTypes.string.isRequired,
  title: PropTypes.string,
  content: PropTypes.string,
  imageUrl: PropTypes.string
};

export default withStyles(styles)(PostForm);
