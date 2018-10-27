import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import PostCardContent from "./PostCardContent/PostCardContent";
import makePostSelector from "store/reducers/selectors/postSelector";

const postCard = props => (
  <PostCardContent post={props.post} canModify={props.canModify} />
);

postCard.propTypes = {
  post: PropTypes.object.isRequired,
  canModify: PropTypes.bool.isRequired
};

const makeMapStateToProps = () => {
  const getPost = makePostSelector();
  const mapStateToProps = (state, props) => {
    const post = getPost(state, props);
    return {
      post,
      canModify:
        state.getIn(["auth", "userId"]) === post.getIn(["author", "_id"])
    };
  };
  return mapStateToProps;
};

export default connect(makeMapStateToProps)(postCard);
