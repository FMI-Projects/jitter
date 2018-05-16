import React from "react";
import PropTypes from "prop-types";
import { Button } from "material-ui";

const profileActions = props => (
  <div className={props.className}>
    <Button variant="raised" color="primary">
      ADD FRIEND
    </Button>
  </div>
);

profileActions.propTypes = {
  className: PropTypes.string
};

export default profileActions;
