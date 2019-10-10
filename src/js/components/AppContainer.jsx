import React, { Component } from "react";
import store from "../store";
import { connect } from 'react-redux';

import App from "./App.jsx";

class AppContainer extends Component {
    constructor() {
        super();
    }

    componentDidMount() {

        fetch('/vocab')
            .then(response => response.json())
            .then(data=>
                store.dispatch({
                type: 'VOCAB_LIST_SUCCESS',
                vocab: data.words
              }));

              // TODO : allow user to enter username
              fetch('/user/kanjitattoo')
              .then(response => response.json())
              .then(data=>
                  store.dispatch({
                  type: 'USER_FETCH_SUCCESS',
                  user: data
                }));
    }
   

    render() {
      
        return (
           <App user={this.props.user} vocab={this.props.vocab} /> 
        );

    }
}
const mapStateToProps = function(store) {
    return {
      vocab: store.vocabState.vocab,
      user: store.userState.user
    };
  }
  
  export default connect(mapStateToProps)(AppContainer);


