import { createStore, combineReducers } from 'redux';


//import reducers from './reducers';

const initialVocabState = {
    vocab: []
  }
  
  const vocabReducer = function(state = initialVocabState, action) {
    switch(action.type) {
    case 'VOCAB_LIST_SUCCESS':
      return Object.assign({}, state, { vocab: action.vocab });
    }
    return state;
  }

  const initialUserProfileState = {
    user: { name:"", coins:0}
  }
  
  const userReducer = function(state = initialUserProfileState, action) {
    switch(action.type) {
    case 'USER_FETCH_SUCCESS':
      return Object.assign({}, state, { user: action.user });
    }
    return state;
  }

// Combine Reducers
var reducers = combineReducers({
    userState: userReducer,
    vocabState: vocabReducer
});


const store = createStore(reducers);
export default store;



