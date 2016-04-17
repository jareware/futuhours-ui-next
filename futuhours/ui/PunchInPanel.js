import { renderFromStore } from 'futuhours/utils/react';
import { Button, Input } from 'react-bootstrap';
import { getAvailableTaskList, getReadableProjectAndTask } from 'futuhours/app/projects';
import { getOngoingEntries } from 'futuhours/app/entries';

export default renderFromStore(

  __filename,

  null, // use the entire state atom

  (el, state, actions) => (

    el('div', { className: 'this' },

      /*
      el(
        Input,
        {
          type: 'select',
          value: state.projects.selectedProjectId,
          onChange: event => actions.projects.projectSelected(event.target.value),
        },
        el('option', { value: null }, 'none'),
        state.projects.projectMap.toArray().map(project => (
          el(
            'option',
            {
              key: project.id,
              value: project.id,
            },
            project.name
          )
        ))
      ),

      el(
        Input,
        {
          type: 'select',
          value: state.projects.selectedTaskId,
          onChange: event => actions.projects.taskSelected(event.target.value),
        },
        el('option', { value: null }, 'none'),
        getAvailableTaskList(state.projects).map(task => (
          el(
            'option',
            {
              key: task.id,
              value: task.id,
            },
            task.name
          )
        ))
      ),
      */

      el(
        Button,
        {
          bsStyle: 'link',
          onClick: actions.entries.addNewEntry,
        },
        'Punch in'
      )

    )

  )

);
