import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import FormModule from '../utils/useForm/Form'
import { moduleName as auth, authReducer } from '../modules/AuthPage/ducks';
const logger = createLogger();

const middlewares = [thunk, logger];
const { reducer: formReducer, moduleName: form } = FormModule;

const reducers = combineReducers({
  [form]: formReducer,
  [auth]: authReducer,
});
const store = createStore(
  reducers,
  compose(applyMiddleware(...middlewares))
);

export default store;

