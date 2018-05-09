import React, {Component} from "react";
import PropTypes from "prop-types";
import styles from "./PostsList.styles";
import classnames from "classnames";

import {withStyles} from "material-ui/styles";
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

class PostsList extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    posts: PropTypes.arrayOf(PropTypes.object),
    classes: PropTypes.object,
    user: PropTypes.object
  };

  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
      expandedKey: ""
    };

    this.handleExpandClick = this.handleExpandClick.bind(this);
  }

  handleExpandClick(postId) {
    this.setState({expanded: !this.state.expanded, expandedKey: postId});
  }

  render() {
    const {posts, classes, user} = this.props;

    return (
      <div>
        {posts.map(post => {
          return (
            <div key={post._id}>
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
                  subheader={`${user.firstName} ${user.lastName}`}
                />
                {post.imageUrl ? (
                  <CardMedia className={classes.media} src={post.imageUrl} />
                ) : null}
                <CardActions className={classes.actions} disableActionSpacing>
                  <IconButton
                    className={classnames(classes.expand, {
                      [classes.expandOpen]:
                        post._id === this.state.expandedKey &&
                        this.state.expanded
                    })}
                    onClick={() => this.handleExpandClick(post._id)}
                    aria-expanded={
                      post._id === this.state.expandedKey && this.state.expanded
                    }
                    aria-label="Show more">
                    <ExpandMoreIcon />
                  </IconButton>
                </CardActions>
                <Collapse
                  in={
                    post._id === this.state.expandedKey && this.state.expanded
                  }
                  timeout="auto"
                  unmountOnExit>
                  <CardContent>
                    <Typography paragraph variant="body2">
                      {post.content}
                    </Typography>
                  </CardContent>
                </Collapse>
              </Card>
            </div>
          );
        })}
      </div>
    );
  }
}

export default withStyles(styles)(PostsList);
