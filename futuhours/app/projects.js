import { List } from 'immutable';

export const FETCH_PROJECTS_STARTED = 'FETCH_PROJECTS_STARTED';
export const FETCH_PROJECTS_SUCCEEDED = 'FETCH_PROJECTS_SUCCEEDED';
export const FETCH_PROJECTS_FAILED = 'FETCH_PROJECTS_FAILED';

export const actions = {

  fetchProjects() {
    return reduxApp => {
      reduxApp.projects.fetchProjectsStarted();
      reduxApp.futuHoursApi.getAvailableProjects()
        .then(reduxApp.projects.fetchProjectsSucceeded)
        .catch(reduxApp.projects.fetchProjectsFailed);
    };
  },

  fetchProjectsStarted() {
    return { type: FETCH_PROJECTS_STARTED };
  },

  fetchProjectsSucceeded(projectList) {
    return { type: FETCH_PROJECTS_SUCCEEDED, projectList };
  },

  fetchProjectsFailed(error) {
    return { type: FETCH_PROJECTS_FAILED, error };
  },

};

export function reducer(state = List.of(), action) {

  switch (action.type) {

    case FETCH_PROJECTS_STARTED:
    case FETCH_PROJECTS_FAILED:
      return List.of(); // clear previous projects

    case FETCH_PROJECTS_SUCCEEDED:
      return action.projectList;

    default:
      return state; // none of our business -> no state change

  }

}
