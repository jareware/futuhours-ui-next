import { List } from 'immutable';

export default {

  getAvailableProjects() {
    return new Promise(resolve => {
      setTimeout(resolve, 1000, List.of('Project #1', 'Project #2', 'Project #3'));
    });
  },

};
