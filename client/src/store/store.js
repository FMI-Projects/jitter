import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";

import rootReducer from "../store/reducers";
import { watchAuth } from "../store/sagas/";
import setAuthMiddleware from "../services/utility/axios/setAuthMiddleware";
import * as actions from "./actions";

const saga = createSagaMiddleware();

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(saga),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

saga.run(watchAuth);

setAuthMiddleware(store);

store.dispatch(actions.authInit());

export default store;
