import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import reduxReset from "redux-reset";
import formActionSaga from "redux-form-saga";

import rootReducer from "../store/reducers";
import {
  watchAuth,
  watchUserProfile,
  watchUserProfileModal,
  watchProfile
} from "../store/sagas/";
import setAuthMiddleware from "../services/utility/axios/setAuthMiddleware";
import * as actions from "./actions";

const saga = createSagaMiddleware();

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(saga),
    reduxReset(),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

saga.run(watchAuth);
saga.run(watchUserProfile);
saga.run(watchUserProfileModal);
saga.run(watchProfile);
saga.run(formActionSaga);

setAuthMiddleware(store);

store.dispatch(actions.authInit());

export default store;
