import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import { Provider as MainProvider } from "./Context/MainContext";
import { Provider as SearchProvider } from "./Context/SearchContext";
import firebaseconfig from "./API/FirebaseConfig";
import * as firebase from "firebase";
import { Provider as ReduxProvider } from "react-redux";
import MianStore from "./Redux/Redux-store/MianStore";
import "bootstrap/dist/css/bootstrap.min.css";

firebase.initializeApp(firebaseconfig);
firebase.analytics();

ReactDOM.render(
  <ReduxProvider store={MianStore}>
    <ThemeProvider>
      <CSSReset />
      <React.StrictMode>
        <MainProvider>
          <SearchProvider>
            <App />
          </SearchProvider>
        </MainProvider>
      </React.StrictMode>
    </ThemeProvider>
  </ReduxProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
