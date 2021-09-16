import React from 'react';
import ReactDOM from 'react-dom';
import { PersistGate } from 'redux-persist/integration/react'

import './index.scss';

import App from './App';
import {
  persistStore

} from 'redux-persist'
import reportWebVitals from './reportWebVitals';
import "./axios-config";
import { Provider } from 'react-redux'
import { IconContext } from "react-icons";

import store from "./store"
let persistor = persistStore(store)

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>

      <React.StrictMode>
        <IconContext.Provider value={{ className: "react-icon" }}>

          <App />
        </IconContext.Provider>

      </React.StrictMode>
    </PersistGate>

  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
