import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import reduxReset from "redux-reset";
import formActionSaga from "redux-form-saga";

import rootReducer from "../store/reducers";
import rootSaga from "../store/sagas";
import setAuthMiddleware from "../services/utility/axios/setAuthMiddleware";
import * as actions from "./actions";

const saga = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(saga), reduxReset())
);

saga.run(rootSaga);
saga.run(formActionSaga);

setAuthMiddleware(store);

store.dispatch(actions.authInit());

export default store;
