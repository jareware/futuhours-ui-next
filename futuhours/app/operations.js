import { FETCH_PROJECTS_STARTED, FETCH_PROJECTS_SUCCEEDED, FETCH_PROJECTS_FAILED } from './projects';
import { Record as defineRecord } from 'immutable';

const StateRecordType = defineRecord({
  isFetching: false,
});

export default function (state = new StateRecordType(), action) {

  switch (action.type) {

    case FETCH_PROJECTS_STARTED:
      return state.set('isFetching', true);

    case FETCH_PROJECTS_SUCCEEDED:
    case FETCH_PROJECTS_FAILED:
      return state.set('isFetching', false);

    default:
      return state; // none of our business -> no state change

  }

}
