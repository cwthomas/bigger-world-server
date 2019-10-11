import React from "react";
import ReactDOM from 'react-dom';
import {  HashRouter} from 'react-router-dom';
import AppContainer from "./js/containers/AppContainer.jsx";

import './css/app.css';
import { Provider } from 'react-redux';
import  store  from './js/store';
import { Route, IndexRoute } from 'react-router';

// ========================================

ReactDOM.render(
    <Provider store={store}>
   <HashRouter >
    <Route path="/" component={AppContainer} >
    
                   
              </Route>
  </HashRouter>
  </Provider>,
    document.getElementById('root')
);