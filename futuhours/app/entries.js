import { Map } from 'immutable';
import { isA, Entry } from 'futuhours/utils/immutable';

export default {

  initialState: {
    entryMap: new Map(),
  },

  actionCreators: {

    addNewEntry(app) {
      const newEntry = new Entry({
        _id: `entries/${new Date().toISOString()}`,
        startDate: Date.now(),
      }).toJS();
      delete newEntry._rev; // TODO: Put these into some util
      app.utils.pouchDB.put(newEntry)
        .then(x => console.info(x))
        .catch(err => console.error(err));
    },

  },

  localReducers: {

    database: {

      documentsReceived(state, docMap) {
        return state.update('entryMap', map => map.merge(docMap.filter(isA.Entry)));
      },

    },

  },

};

export function getOngoingEntries(localState) {
  return localState.entryMap.filter(doc => !doc.endDate);
}
