import { Map } from 'immutable';

export default {

  initialState: {
    projectMap: new Map(),
  },

  localReducers: {

    database: {

      documentsReceived(state, docMap) {
        return state.update('projectMap', map => map.merge(docMap));
      },

    },

  },

};
