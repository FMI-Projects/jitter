import { Map, List } from "immutable";

import * as actionTypes from "../actions/actionTypes";
import * as formatImage from "../../utilities/formatters/formatImage";
import normalizers from "./normalizers";

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

  state = addPosts(state, action.posts);

  return state;
};

const applyPostsCreateSuccess = (state, action) => {
  return addPosts(state, [action.post]);
};

const applyPostsUpdateSuccess = (state, action) => {
  return state.updateIn(["posts", "byId", action.post._id], post =>
    post.merge(
      new Map({
        title: action.post.title,
        content: action.post.content,
        imageUrl: formatImage.getFullUrl(action.post.imageUrl)
      })
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
    post.set("commentsLoading", false)
  );

  const normalizedComments = action.comments.map(c =>
    normalizers.commentNormalizer(c)
  );

  state = addComments(state, normalizedComments.map(c => c.normalizedComment));
  state = addAuthors(state, normalizedComments.map(c => c.author));
  state = addCommentsToPost(
    state,
    normalizedComments.map(c => c.normalizedComment._id),
    action.postId
  );

  return state;
};

const applyPostsCommentCreateSuccess = (state, action) => {
  const { normalizedComment, author } = normalizers.commentNormalizer(
    action.comment
  );

  state = addComments(state, [normalizedComment]);
  state = addAuthors(state, [author]);
  state = addCommentsToPost(
    state,
    [normalizedComment._id],
    action.comment.post
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
  return state.updateIn(["comments", action.comment._id], comment =>
    comment.merge(new Map({ content: action.comment.content }))
  );
};

const applyPostsLikeSuccess = (state, action) => {
  const { normalizedLike, author } = normalizers.likeNormalizer(action.like);

  state = addLikes(state, [normalizedLike]);
  state = addAuthors(state, [author]);
  state = addLikesToPost(state, [normalizedLike._id], action.like.post);

  return state;
};

const applyPostsLikesGet = (state, action) => {
  return state.updateIn(["posts", "byId", action.postId], post =>
    post.set("likesLoading", true)
  );
};

const applyPostsLikesGetSuccess = (state, action) => {
  state = state.updateIn(["posts", "byId", action.postId], post =>
    post.set("likesLoading", false)
  );

  const normalizedLikes = action.likes.map(l => normalizers.likeNormalizer(l));

  state = addLikes(state, normalizedLikes.map(l => l.normalizedLike));
  state = addAuthors(state, normalizedLikes.map(l => l.author));
  state = addLikesToPost(
    state,
    normalizedLikes.map(l => l.normalizedLike._id),
    action.postId
  );

  return state;
};

const applyAddProfileToAuthors = (state, action) => {
  const author = {
    _id: action._id,
    firstName: action.firstName,
    lastName: action.lastName,
    profilePictureUrl: formatImage.getFullUrl(action.profilePictureUrl)
  };

  return addAuthors(state, [author]);
};

const addPosts = (state, posts) => {
  state = state.updateIn(["posts", "byId"], existingPosts =>
    existingPosts.merge(
      ...posts.map(p => {
        return new Map({
          [p._id]: new Map({
            ...p,
            imageUrl: formatImage.getFullUrl(p.imageUrl),
            comments: new List(),
            likes: new List()
          })
        });
      })
    )
  );

  state = state.updateIn(["posts", "allIds"], allIds =>
    new List(posts.map(p => p._id)).concat(allIds)
  );

  return state;
};

const addComments = (state, comments) => {
  state = state.update("comments", existingComments =>
    existingComments.merge(
      ...comments.map(c => {
        return new Map({
          [c._id]: new Map({
            ...c
          })
        });
      })
    )
  );

  return state;
};

const addAuthors = (state, authors) => {
  state = state.update("authors", existingAuthors =>
    existingAuthors.merge(
      ...authors.map(a => {
        return new Map({
          [a._id]: new Map({
            ...a,
            profilePictureUrl: formatImage.getFullUrl(a.profilePictureUrl)
          })
        });
      })
    )
  );

  return state;
};

const addLikes = (state, likes) => {
  state = state.update("likes", existingLikes =>
    existingLikes.merge(
      ...likes.map(l => {
        return new Map({
          [l._id]: new Map({
            ...l
          })
        });
      })
    )
  );

  return state;
};

const addCommentsToPost = (state, commentIds, postId) => {
  state = state.updateIn(["posts", "byId", postId, "comments"], comments =>
    comments.concat(new List(commentIds))
  );

  return state;
};

const addLikesToPost = (state, likeIds, postId) => {
  state = state.updateIn(["posts", "byId", postId, "likes"], likes =>
    likes.concat(new List(likeIds))
  );

  return state;
};

export default postReducer;
