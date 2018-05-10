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

import {formatDate} from "../../../utilities/formatters/dateFormat";

class PostCard extends Component {
  static propTypes = {
    post: PropTypes.object,
    classes: PropTypes.object,
    author: PropTypes.object
  };

  constructor(props) {
    super(props);

    this.state = {
      expanded: false
    };

    this.handleExpandClick = this.handleExpandClick.bind(this);
  }

  handleExpandClick() {
    this.setState({expanded: !this.state.expanded});
  }

  render() {
    const {post, author, classes} = this.props;
    const formattedDate = post.createdAt ? formatDate(post.createdAt) : "N/A";

    return (
      <div>
        <Card className={classes.card}>
          <CardHeader
            avatar={
              <Avatar aria-label="Recipe" className={classes.avatar}>
                R
              </Avatar>
            }
            action={
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            }
            title={post.title}
            subheader={`${author.firstName} ${
              author.lastName
            } ${formattedDate}`}
          />
          {post.imageUrl ? (
            <CardMedia className={classes.media} src={post.imageUrl} />
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
              <Typography paragraph variant="body2">
                {post.content}
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(PostCard);
