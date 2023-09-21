import { createStore, combineReducers } from 'redux';
import initialState from './initialState';

// Import reducers
import announcementsReducer from './announcementRedux';

const subreducers = {
  announcements: announcementsReducer, // Corrected typo here
};

const reducer = combineReducers(subreducers);

const store = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // Corrected typo here
);

export default store;
