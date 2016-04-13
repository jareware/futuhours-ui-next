import { Map } from 'immutable';
import { fromJS } from 'futuhours/utils/immutable';
import { List } from 'immutable';

export default {

  initialState: {
    doingInitialFetch: false,
    databaseFailures: new List(),
  },

  actionCreators: {

    startDatabaseConnection(app, subscribeToChanges = true) {
      app.actions.database.initialFetchStarted();
      app.utils.pouchDB.allDocs({
        include_docs: true,
      }).then(res => new Map(res.rows.map(row => [row.id, fromJS(row.doc)])))
        .then(app.actions.database.documentsReceived)
        .catch(app.actions.database.databaseFailed);
      if (!subscribeToChanges) return;
      app.utils.pouchDB.changes({
        since: 'now',
        live: true,
        retry: true,
        include_docs: true,
      }).on('change', change => {
        app.actions.database.documentsReceived(fromJS({ [change.id]: change.doc }));
      }).on('error', err => {
        app.actions.database.databaseFailed(err);
      });
    },

  },

  localReducers: {

    database: {

      initialFetchStarted(state) {
        return state.set('doingInitialFetch', true);
      },

      documentsReceived(state) {
        return state.set('doingInitialFetch', false);
      },

      databaseFailed(state, err) {
        return state
          .update('databaseFailures', list => list.push(err.message))
          .set('doingInitialFetch', false);
      },

    },

  },

};
