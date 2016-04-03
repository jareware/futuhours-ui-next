import { bindActionCreators, createStore, applyMiddleware, compose } from 'redux';
import { Record as defineRecord } from 'immutable';
import { combineReducers } from 'redux-immutable';
import { extend, mapValues, isFunction, pickBy } from 'lodash';

export function createReduxApp(modules = {}, utilities = {}, initialState = {}) {
  // This is our "app context" object:
  const reduxApp = {};
  // Create middleware that works like redux-thunk, but allows access to the reduxApp object instead:
  const appThunkMiddleware = () => next => action => (
    isFunction(action) ? action(reduxApp) : next(action)
  );
  // Create root-reducer from the default export functions of all app modules:
  const rootReducer = combineReducers(
    mapValues(modules,
      module => module.default
    )
  );
  // Create an Immutable Record that matches the shape of our top-level state, and ask all reducers for their default state:
  const StateRecordType = defineRecord(mapValues(modules, () => undefined));
  const tempStore = createStore(rootReducer, new StateRecordType());
  const recordedInitialState = tempStore.getState().mergeDeep(initialState);
  // Create our store, with devToolsExtension patched in (if provided):
  const store = createStore(rootReducer, recordedInitialState, compose(
    applyMiddleware(appThunkMiddleware),
    utilities.devToolsExtension ? utilities.devToolsExtension() : f => f
  ));
  // Pre-bind action creators from each module with the dispatcher:
  extend(reduxApp,
    mapValues(modules,
      module => bindActionCreators(
        pickBy(module,
          (val, key) => isFunction(val) && key !== 'default' // every exported function (except the default export) is an action creator
        ),
        store.dispatch
      )
    )
  );
  // Merge in any extra utilities + the store reference:
  extend(reduxApp, utilities, { store });
  return reduxApp;
}
