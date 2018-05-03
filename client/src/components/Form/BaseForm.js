import React from "react";
import PropTypes from "prop-types";

import {withStyles} from "material-ui/styles";
import Paper from "material-ui/Paper";
import Card, {CardHeader} from "material-ui/Card";
import {Grid} from "material-ui";

import styles from "./styles";

const baseForm = props => {
  return (
    <div className={props.classes.base}>
      <Grid container>
        <Card className={props.classes.card}>
          <CardHeader
            classes={{title: props.classes.cardTitle}}
            title="Register"
          />
        </Card>
      </Grid>
      <Paper className={props.classes.headline}>{props.children}</Paper>
    </div>
  );
};

baseForm.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};

export default withStyles(styles)(baseForm);
