import { combineReducers } from 'redux';
import { SET_HIGHLIGHT, CLEAR_HIGHLIGHT } from './actions';

function highlightValue(state = '', action) {
  switch (action.type) {
    case SET_HIGHLIGHT:
      return action.value;
    case CLEAR_HIGHLIGHT:
      return '';
    default:
      return state;
  }
}

const reducers = combineReducers({
  highlightValue,
});

export default reducers;
