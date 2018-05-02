import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import {MuiThemeProvider, createMuiTheme} from "material-ui/styles";

import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

import store from "./store/store";

const theme = createMuiTheme();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root"),
);

registerServiceWorker();
