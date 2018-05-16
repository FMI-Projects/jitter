import React, {Component} from "react";
import PropTypes from "prop-types";
import styles from "./PostCard.styles";
import {withStyles} from "material-ui/styles";
import classnames from "classnames";

import Card, {
  CardHeader,
  CardMedia,
  CardContent,
  CardActions
} from "material-ui/Card";
import Collapse from "material-ui/transitions/Collapse";
import Avatar from "material-ui/Avatar";
import IconButton from "material-ui/IconButton";
import Typography from "material-ui/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import Comments from "./Comments/Comments";

import * as formatDate from "../../../utilities/formatters/formatDate";
import defaultUserImage from "../../../assets/images/defaultUser.png";

class PostCard extends Component {
  static propTypes = {
    post: PropTypes.object,
    classes: PropTypes.object
  };

  state = {
    expanded: false
  };

  handleExpandClick = () => {
    this.setState({expanded: !this.state.expanded});
  };

  render() {
    const {post, classes} = this.props;
    const formattedDate = post.createdAt
      ? formatDate.formatDate(post.createdAt)
      : "N/A";

    return (
      <div>
        <Card className={classes.card}>
          <CardHeader
            avatar={
              post.author.profilePictureUrl ? (
                <Avatar src={post.author.profilePictureUrl} />
              ) : (
                <Avatar src={defaultUserImage} />
              )
            }
            action={
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            }
            title={post.title}
            subheader={`${post.author.firstName} ${
              post.author.lastName
            }, ${formattedDate}`}
          />
          <CardContent>
            <Typography paragraph variant="body1">
              {post.content}
            </Typography>
          </CardContent>
          {post.imageUrl ? (
            <CardMedia className={classes.media} image={post.imageUrl} />
          ) : null}
          <CardActions className={classes.actions} disableActionSpacing>
            <IconButton
              className={classnames(classes.expand, {
                [classes.expandOpen]: this.state.expanded
              })}
              onClick={this.handleExpandClick}
              aria-expanded={this.state.expanded}
              aria-label="Show more">
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Comments postId={post._id} />
            </CardContent>
          </Collapse>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(PostCard);
