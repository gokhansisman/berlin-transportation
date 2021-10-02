import searchReducer from './SearchReducer';
import detailReducer from './DetailReducer';

import { combineReducers } from 'redux';

export default combineReducers({
    search: searchReducer,
    detail:detailReducer
});