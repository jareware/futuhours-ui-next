import { renderFromStore } from 'futuhours/utils/react';
import { Button, Input } from 'react-bootstrap';
import { List } from 'immutable';

export default renderFromStore(

  __filename,

  null, // use the entire state atom

  (el, state, actions) => (

    el('div', { className: 'this' },

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
        state.projects.projectMap.getIn([`projects/${state.projects.selectedProjectId}`, 'tasks'], List.of()).map(task => (
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

      el(
        Button,
        {
          bsStyle: 'link',
          onClick: () => { /* TODO */ },
        },
        'Punch in'
      )

    )

  )

);
