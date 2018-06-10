import { Map, List } from "immutable";

import * as actionTypes from "../actions/actionTypes";
import comparators from "./comparators";

const initialState = new Map({
  posts: new Map({ byId: new Map(), allIds: new List() }),
  comments: new Map(),
  likes: new Map(),
  authors: new Map(),
  loading: true
});

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PROFILE_POSTS_GET: {
      return applyPostsGet(state, action);
    }
    case actionTypes.PROFILE_POSTS_GET_SUCCESS: {
      return applyProfilePostsGetSuccess(state, action);
    }
    case actionTypes.POSTS_CREATE_SUCCESS: {
      return applyPostsCreateSuccess(state, action);
    }
    case actionTypes.POSTS_UPDATE_SUCCESS: {
      return applyPostsUpdateSuccess(state, action);
    }
    case actionTypes.POSTS_DELETE_SUCCESS: {
      return applyPostsDeleteSuccess(state, action);
    }
    case actionTypes.POSTS_COMMENTS_GET: {
      return applyPostsCommentsGet(state, action);
    }
    case actionTypes.POSTS_COMMENTS_GET_SUCCESS: {
      return applyPostsCommentsGetSuccess(state, action);
    }
    case actionTypes.POSTS_COMMENT_CREATE_SUCCESS: {
      return applyPostsCommentCreateSuccess(state, action);
    }
    case actionTypes.COMMENTS_DELETE_SUCCESS: {
      return applyCommentsDeleteSuccess(state, action);
    }
    case actionTypes.COMMENTS_UPDATE_SUCCESS: {
      return applyCommentsUpdateSuccess(state, action);
    }
    case actionTypes.POSTS_LIKE_SUCCESS: {
      return applyPostsLikeSuccess(state, action);
    }
    case actionTypes.POSTS_LIKES_GET: {
      return applyPostsLikesGet(state, action);
    }
    case actionTypes.POSTS_LIKES_GET_SUCCESS: {
      return applyPostsLikesGetSuccess(state, action);
    }
    case actionTypes.PROFILE_GET_SUCCESS: {
      return applyAddProfileToAuthors(state, action);
    }
    default:
      return state;
  }
};

const applyPostsGet = (state, action) => {
  state = initialState;

  return state.set("loading", true);
};

const applyProfilePostsGetSuccess = (state, action) => {
  state = state.set("loading", false);

  state = state.updateIn(["posts", "byId"], existingPosts =>
    existingPosts.merge(action.posts.getIn(["entities", "post"]))
  );

  state = state.updateIn(["posts", "allIds"], allIds =>
    new List(action.posts.get("result")).concat(allIds)
  );

  state = state.update("authors", existingAuthors =>
    existingAuthors.mergeWith(
      comparators.compareShallow,
      action.posts.getIn(["entities", "profile"])
    )
  );

  return state;
};

const applyPostsCreateSuccess = (state, action) => {
  state = state.updateIn(["posts", "byId"], existingPosts =>
    existingPosts.merge(action.post.getIn(["entities", "post"]))
  );

  state = state.updateIn(["posts", "allIds"], allIds =>
    allIds.unshift(action.post.get("result"))
  );

  state = state.update("authors", existingAuthors =>
    existingAuthors.mergeWith(
      comparators.compareShallow,
      action.post.getIn(["entities", "profile"])
    )
  );

  return state;
};

const applyPostsUpdateSuccess = (state, action) => {
  return state.updateIn(["posts", "byId", action.post.get("result")], post =>
    post.merge(
      action.post.getIn(["entities", "post", action.post.get("result")])
    )
  );
};

const applyPostsDeleteSuccess = (state, action) => {
  const commentIds = state.getIn(["posts", "byId", action.postId, "comments"]);
  state = state.update("comments", comments => comments.deleteAll(commentIds));

  const likeIds = state.getIn(["posts", "byId", action.postId, "likes"]);
  state = state.update("likes", likes => likes.deleteAll(likeIds));

  state = state.updateIn(["posts", "byId"], byId => byId.delete(action.postId));
  state = state.updateIn(["posts", "allIds"], allIds =>
    allIds.filter(id => id !== action.postId)
  );

  return state;
};

const applyPostsCommentsGet = (state, action) => {
  return state.updateIn(["posts", "byId", action.postId], post =>
    post.set("commentsLoading", true)
  );
};

const applyPostsCommentsGetSuccess = (state, action) => {
  state = state.updateIn(["posts", "byId", action.postId], post =>
    post.merge({
      commentsLoading: false,
      commentsLoaded: true
    })
  );

  state = state.update("comments", existingComments =>
    existingComments.mergeWith(
      comparators.compareShallow,
      action.comments.getIn(["entities", "comment"])
    )
  );

  state = state.update("authors", existingAuthors =>
    existingAuthors.mergeWith(
      comparators.compareShallow,
      action.comments.getIn(["entities", "profile"])
    )
  );

  state = state.updateIn(["posts", "byId", action.postId], post =>
    post.set("comments", action.comments.get("result"))
  );

  return state;
};

const applyPostsCommentCreateSuccess = (state, action) => {
  state = state.update("comments", existingComments =>
    existingComments.mergeWith(
      comparators.compareShallow,
      action.comment.getIn(["entities", "comment"])
    )
  );

  state = state.update("authors", existingAuthors =>
    existingAuthors.mergeWith(
      comparators.compareShallow,
      action.comment.getIn(["entities", "profile"])
    )
  );

  state = state.updateIn(
    [
      "posts",
      "byId",
      action.comment.getIn([
        "entities",
        "comment",
        action.comment.get("result"),
        "post"
      ]),
      "comments"
    ],
    existingComments => existingComments.push(action.comment.get("result"))
  );

  return state;
};

const applyCommentsDeleteSuccess = (state, action) => {
  state = state.updateIn(
    ["posts", "byId", action.postId, "comments"],
    comments => comments.filter(c => c !== action.commentId)
  );

  state = state.update("comments", comments =>
    comments.delete(action.commentId)
  );

  return state;
};

const applyCommentsUpdateSuccess = (state, action) => {
  return state.updateIn(["comments", action.comment.get("result")], comment =>
    comment.merge(
      action.comment.getIn([
        "entities",
        "comment",
        action.comment.get("result")
      ])
    )
  );
};

const applyPostsLikeSuccess = (state, action) => {
  state = state.update("likes", existingLikes =>
    existingLikes.mergeWith(
      comparators.compareShallow,
      action.like.getIn(["entities", "like"])
    )
  );

  // state = state.update("authors", existingAuthors =>
  //   existingAuthors.mergeWith(
  //     comparators.compareShallow,
  //     action.like.getIn(["entities", "profile"])
  //   )
  // );

  state = state.updateIn(
    [
      "posts",
      "byId",
      action.like.getIn([
        "entities",
        "like",
        action.like.get("result"),
        "post"
      ]),
      "likes"
    ],
    existingLikes => existingLikes.push(action.like.get("result"))
  );

  const reaction = action.like.getIn([
    "entities",
    "like",
    action.like.get("result"),
    "reaction"
  ]);

  state = state.updateIn(
    [
      "posts",
      "byId",
      action.like.getIn(["entities", "like", action.like.get("result"), "post"])
    ],
    post => {
      post = post.setIn(
        ["reactionsCount", reaction],
        post.getIn(["reactionsCount", reaction]) + 1
      );
      post = post.setIn(["userReaction"], reaction);
      return post;
    }
  );

  return state;
};

const applyPostsLikesGet = (state, action) => {
  return state.updateIn(["posts", "byId", action.postId], post =>
    post.set("likesLoading", true)
  );
};

const applyPostsLikesGetSuccess = (state, action) => {
  state = state.updateIn(["posts", "byId", action.postId], post =>
    post.merge({
      likesLoading: false,
      likesLoaded: true
    })
  );

  state = state.update("likes", existingLikes =>
    existingLikes.mergeWith(
      comparators.compareShallow,
      action.likes.getIn(["entities", "like"])
    )
  );

  state = state.updateIn(["posts", "byId", action.postId], post =>
    post.set("likes", action.likes.get("result"))
  );

  return state;
};

const applyAddProfileToAuthors = (state, action) => {
  const profile = action.profile.getIn([
    "entities",
    "profile",
    action.profile.get("result")
  ]);
  const author = new Map({
    [profile.get("_id")]: new Map({
      _id: profile.get("_id"),
      firstName: profile.get("firstName"),
      lastName: profile.get("lastName"),
      profilePictureUrl: profile.get("profilePictureUrl")
    })
  });

  state = state.update("authors", existingAuthors =>
    existingAuthors.mergeWith(comparators.compareShallow, author)
  );

  return state;
};

export default postReducer;
