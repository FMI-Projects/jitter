import {createStore, applyMiddleware, compose} from "redux";
import createSagaMiddleware from "redux-saga";

import rootReducer from "../store/reducers";
import {watchAuth} from "../store/sagas/";

const saga = createSagaMiddleware();

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(saga),
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__(),
  ),
);

saga.run(watchAuth);

export default store;