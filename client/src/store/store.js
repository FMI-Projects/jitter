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
  composeEnhancers(applyMiddleware(saga), reduxReset())
);

const sagas = [
  watchAuth,
  watchUserProfile,
  watchUserProfileModal,
  watchPosts,
  watchProfile,
  watchComments,
  formActionSaga
];

sagas.forEach(s => saga.run(s));

setAuthMiddleware(store);

store.dispatch(actions.authInit());

export default store;
