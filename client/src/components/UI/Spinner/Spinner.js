import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "material-ui/styles";
import {CircularProgress} from "material-ui/Progress";

import styles from "./Spinner.styles";

class CircularDeterminate extends React.Component {
  state = {
    completed: 0
  };

  componentDidMount() {
    this.timer = setInterval(this.progress, 20);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  progress = () => {
    const {completed} = this.state;
    this.setState({completed: completed === 100 ? 0 : completed + 1});
  };

  render() {
    const {classes} = this.props;

    return (
      <div className={classes.container}>
        <CircularProgress
          className={classes.progress}
          variant="determinate"
          size={100}
          value={this.state.completed}
        />
      </div>
    );
  }
}

CircularDeterminate.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CircularDeterminate);
