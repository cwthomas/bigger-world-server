import React, { Component } from "react";
import ReactDOM from 'react-dom';
import AppContainer from "./js/components/AppContainer.jsx";
import './css/app.css';
import { Provider } from 'react-redux';
import  store  from './js/store';


// ========================================

ReactDOM.render(
    <Provider store={store}>
    <AppContainer />
  </Provider>,
    document.getElementById('root')
);