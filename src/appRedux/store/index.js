import { createBrowserHistory } from 'history'
import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from '../reducers'
export const history = createBrowserHistory()


const store = createStore(rootReducer(history), composeWithDevTools(applyMiddleware(thunk)))
export default store