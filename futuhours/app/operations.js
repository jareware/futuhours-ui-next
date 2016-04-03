import { FETCH_PROJECTS_STARTED, FETCH_PROJECTS_SUCCEEDED, FETCH_PROJECTS_FAILED } from './projects';

export default function (state = false, action) {

  switch (action.type) {

    case FETCH_PROJECTS_STARTED:
      return true;

    case FETCH_PROJECTS_SUCCEEDED:
    case FETCH_PROJECTS_FAILED:
      return false;

    default:
      return state; // none of our business -> no state change

  }

}
