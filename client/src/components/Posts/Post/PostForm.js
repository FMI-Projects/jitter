import React, {Fragment} from "react";
import PropTypes from "prop-types";
import {Field} from "redux-form";
import {withStyles} from "material-ui/styles";
import Button from "material-ui/Button";
import {TextField} from "redux-form-material-ui";

import {required, postTitleMinLength} from "../../../utilities/validation";
import Spinner from "../../../components/UI/Spinner/Spinner";

import styles from "./PostForm.styles";

import Paper from "material-ui/Paper";
import Card, {CardHeader} from "material-ui/Card";
import {Grid} from "material-ui";

const postForm = props => {
  let spinner = null;

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
      <Grid container>
        <Card className={props.classes.card}>
          <CardHeader classes={{title: props.classes.cardTitle}} title="Post" />
        </Card>
      </Grid>
      <Paper className={props.classes.headline}>
        <form className={props.classes.form} onSubmit={props.onSubmit}>
          {errorMessage}
          <div>
            <Field
              className={props.classes.textField}
              name="title"
              component={TextField}
              label="title"
              validate={[required, postTitleMinLength]}
            />
          </div>
          <div>
            <Field
              className={props.classes.textField}
              name="content"
              component={TextField}
              margin="dense"
              label="What's jittering?"
              multiline
              rows={4}
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
      </Paper>
    </Fragment>
  );
};

postForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  error: PropTypes.string,
  classes: PropTypes.object.isRequired,
  submitting: PropTypes.bool.isRequired
};

export default withStyles(styles)(postForm);
