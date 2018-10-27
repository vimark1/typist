import {combineReducers} from 'redux';
const sampleReducer = (state = null, action) => state;
const rootReducer = combineReducers({
    state: sampleReducer
});

export default rootReducer;