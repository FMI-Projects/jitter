import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "material-ui/styles";
import Paper from "material-ui/Paper";
import Card, { CardHeader } from "material-ui/Card";
import { Grid } from "material-ui";
import styles from "./BaseForm.styles";

const baseForm = props => {
  return (
    <div style={props.style} className={props.classes.base}>
      <Grid container>
        <Card className={props.classes.card}>
          <CardHeader
            classes={{ title: props.classes.cardTitle }}
            title={props.title}
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
  title: PropTypes.string.isRequired,
  style: PropTypes.object
};

export default withStyles(styles)(baseForm);
