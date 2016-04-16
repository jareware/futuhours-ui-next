import { Map, List } from 'immutable';

export default {

  initialState: {
    projectMap: new Map(),
    selectedProjectId: null,
    selectedTaskId: null,
  },

  localReducers: {

    projects: {

      projectSelected(state, newProjectId) {
        return state.merge({
          selectedProjectId: parseInt(newProjectId, 10), // project ID's are always numeric
          selectedTaskId: null, // selecting a new project resets the task selection
        });
      },

      taskSelected(state, newProjectId) {
        return state.set('selectedTaskId', parseInt(newProjectId, 10)); // task ID's are always numeric
      },

    },

    database: {

      documentsReceived(state, docMap) {
        return state.update('projectMap', map => map.merge(docMap));
      },

    },

  },

};

// Available Tasks for the currently selected Project, or empty List
export function getAvailableTaskList(localState) {
  return localState.projectMap.getIn([`projects/${localState.selectedProjectId}`, 'tasks'], List.of());
}
