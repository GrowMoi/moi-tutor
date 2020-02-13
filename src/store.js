import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducers from './reducers'

const middleware = [thunk]
const composeEnhancers = (
  typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({name: 'MoiTutor'}) : compose()
);

const enhancer = composeEnhancers(
  applyMiddleware(...middleware),
);

const store = createStore(
  rootReducers,
  enhancer,
);

export default store
