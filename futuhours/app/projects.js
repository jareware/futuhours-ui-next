import { List, fromJS } from 'immutable';

export const FETCH_PROJECTS_STARTED = 'FETCH_PROJECTS_STARTED';
export const FETCH_PROJECTS_SUCCEEDED = 'FETCH_PROJECTS_SUCCEEDED';
export const FETCH_PROJECTS_FAILED = 'FETCH_PROJECTS_FAILED';

export function fetchProjects() {
  return app => {
    app.projects.fetchProjectsStarted();
    app.pouchDB.allDocs({
      include_docs: true,
      start_key: 'projects/',
      end_key: 'projects/_',
    })
      .then(res => res.rows.map(row => row.doc))
      .then(fromJS)
      .then(app.projects.fetchProjectsSucceeded)
      .catch(app.projects.fetchProjectsFailed);
  };
}

export function fetchProjectsStarted() {
  return { type: FETCH_PROJECTS_STARTED };
}

export function fetchProjectsSucceeded(projectList) {
  return { type: FETCH_PROJECTS_SUCCEEDED, projectList };
}

export function fetchProjectsFailed(error) {
  return { type: FETCH_PROJECTS_FAILED, error };
}

export default function (state = List.of(), action) {

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
