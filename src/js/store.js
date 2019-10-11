import { combineReducers, createStore } from 'redux';

// TODO : later break these up
//import reducers from './reducers';

const initialVocabState = {
  vocab: []
}

const vocabReducer = function (state = initialVocabState, action) {
  switch (action.type) {
    case 'VOCAB_LIST_SUCCESS':
      return { ...state, vocab: action.vocab };
  }
  return state;
}

const initialUserProfileState = {
  user: { name: "", coins: 0, xp: 0 }
}

const userReducer = function (state = initialUserProfileState, action) {
  switch (action.type) {
    case 'USER_FETCH_SUCCESS':
      return { user: { ...action.user } };
    case 'USER_REWARD':

      return { ...state, user: { ...state.user, coins: state.user.coins + action.coins, xp: state.user.xp + action.xp } };
  }
  return state;
}



// Combine Reducers
var reducers = combineReducers({
  userState: userReducer,
  vocabState: vocabReducer
});


const store = createStore(reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
export default store;



