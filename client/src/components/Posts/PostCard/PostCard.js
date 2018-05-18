import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import styles from "./PostCard.styles";
import { withStyles } from "material-ui/styles";
import classnames from "classnames";
import { Link } from "react-router-dom";

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
import Menu, { MenuItem } from "material-ui/Menu";
import CommentIcon from "@material-ui/icons/Comment";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";

import Comments from "./Comments/Comments";
import EditPost from "./EditPost/EditPost";
import DeletePost from "./DeletePost/DeletePost";

import * as formatDate from "utilities/formatters/formatDate";
import defaultUserImage from "assets/images/defaultUser.png";

class PostCard extends Component {
  static propTypes = {
    post: PropTypes.object,
    classes: PropTypes.object,
    canModify: PropTypes.bool.isRequired
  };

  state = {
    expanded: false,
    menuOpen: null
  };

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  handleMenuClick = e => {
    this.setState({ menuOpen: e.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ menuOpen: null });
  };

  render() {
    const { post, classes, canModify } = this.props;
    const formattedDate = post.createdAt
      ? formatDate.getFullDate(post.createdAt)
      : "N/A";

    return (
      <Fragment>
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
              canModify ? (
                <IconButton>
                  <MoreVertIcon onClick={this.handleMenuClick} />
                  <Menu
                    anchorEl={this.state.menuOpen}
                    open={Boolean(this.state.menuOpen)}
                    onClose={this.handleMenuClose}
                  >
                    <MenuItem>
                      <EditPost
                        _id={post._id}
                        closeMenu={this.handleMenuClose}
                        title={post.title}
                        content={post.content}
                      />
                    </MenuItem>
                    <MenuItem>
                      <DeletePost postId={post._id} />
                    </MenuItem>
                  </Menu>
                </IconButton>
              ) : null
            }
            title={
              <Link to={`/profile/${post.author._id}`} className={classes.link}>
                {post.author.firstName} {post.author.lastName}
              </Link>
            }
            subheader={formattedDate}
          />
          <CardContent>
            <Typography paragraph variant="title">
              {post.title}
            </Typography>
            <Typography paragraph variant="body1">
              {post.content}
            </Typography>
          </CardContent>
          {post.imageUrl ? (
            <CardMedia className={classes.media} image={post.imageUrl} />
          ) : null}
          <CardActions className={classes.actions} disableActionSpacing>
            <IconButton>
              <ThumbUpIcon />
            </IconButton>
            <IconButton
              className={classnames(classes.expand, {
                [classes.expandOpen]: this.state.expanded
              })}
              onClick={this.handleExpandClick}
              aria-expanded={this.state.expanded}
              aria-label="Show more"
            >
              <CommentIcon />
            </IconButton>
          </CardActions>
          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Comments postId={post._id} />
            </CardContent>
          </Collapse>
        </Card>
      </Fragment>
    );
  }
}

export default withStyles(styles)(PostCard);
