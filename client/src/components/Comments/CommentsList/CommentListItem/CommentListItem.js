import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import CommentListItemContent from "./CommentListItemContent/CommentListItemContent";
import makeCommentSelector from "store/reducers/selectors/commentSelector";

const commentListItem = props => (
  <CommentListItemContent comment={props.comment} canModify={props.canModify} />
);

commentListItem.propTypes = {
  comment: PropTypes.object.isRequired,
  canModify: PropTypes.bool.isRequired
};

const makeMapStateToProps = () => {
  const getComment = makeCommentSelector();
  const mapStateToProps = (state, props) => {
    const comment = getComment(state, props);
    return {
      comment,
      canModify:
        state.getIn(["auth", "userId"]) === comment.getIn(["author", "_id"])
    };
  };
  return mapStateToProps;
};

export default connect(makeMapStateToProps)(commentListItem);
