import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import reduxReset from "redux-reset";
import formActionSaga from "redux-form-saga";

import rootReducer from "../store/reducers";
import {
  watchAuth,
  watchUserProfile,
  watchUserProfileModal,
  watchPosts,
  watchProfile,
  watchComments
} from "../store/sagas/";
import setAuthMiddleware from "../services/utility/axios/setAuthMiddleware";
import * as actions from "./actions";

const saga = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(saga),
    reduxReset()
  )
);

saga.run(watchAuth);
saga.run(watchUserProfile);
saga.run(watchUserProfileModal);
saga.run(watchPosts);
saga.run(watchProfile);
saga.run(watchComments);
saga.run(formActionSaga);

setAuthMiddleware(store);

store.dispatch(actions.authInit());

export default store;
