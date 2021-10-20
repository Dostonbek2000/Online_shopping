import { createStore } from 'redux'
import { combineReducers } from 'redux'
import auth from './auth'
import cart from './cart'

const reducers = combineReducers({ auth, cart })
const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;