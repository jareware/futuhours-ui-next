import { bindActionCreators, createStore, applyMiddleware, compose } from 'redux';
import { Map } from 'immutable';
import { combineReducers } from 'redux-immutable';

export function createReduxApp(modules = {}, utilities = {}, initialState = new Map()) {
  const reduxApp = {};
  const appThunkMiddleware = () => next => action => ( // same as redux-thunk, but allows access to the reduxApp object instead
    typeof action === 'function' ? action(reduxApp) : next(action)
  );
  const rootReducer = combineReducers(
    Object.keys(modules).reduce((memo, moduleName) => {
      if (modules[moduleName].reducer) memo[moduleName] = modules[moduleName].reducer; // eslint-disable-line no-param-reassign
      return memo;
    }, {})
  );
  const store = window.store = createStore(rootReducer, initialState, compose(
    applyMiddleware(appThunkMiddleware),
    utilities.devToolsExtension ? utilities.devToolsExtension() : f => f
  ));
  reduxApp.store = store;
  reduxApp.dispatch = store.dispatch;
  Object.keys(modules).forEach(moduleName => {
    if (reduxApp[moduleName]) throw new Error(`Module "${moduleName}" conflicts with an existing name on the reduxApp object`);
    if (modules[moduleName].actions) reduxApp[moduleName] = bindActionCreators(modules[moduleName].actions, store.dispatch);
  });
  Object.keys(utilities).forEach(utilityName => {
    if (reduxApp[utilityName]) throw new Error(`Utility "${utilityName}" conflicts with an existing name on the reduxApp object`);
    reduxApp[utilityName] = utilities[utilityName];
  });
  return reduxApp;
}
