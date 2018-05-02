import {createStore, applyMiddleware} from "redux";

import createSagaMiddleware from "redux-saga";
import rootReducer from "../store/reducers";

const saga = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(saga));

export default store;
