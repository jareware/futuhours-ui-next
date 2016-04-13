import { PropTypes } from 'react';
import { renderFromProps, renderFromStore } from 'futuhours/utils/react';

const Toolbar = renderFromProps(

  'Toolbar',

  {
    buttonClickHandler: PropTypes.func.isRequired,
    buttonClickArg: PropTypes.any,
  },

  (el, props) => (

    el('p', null, 'You can do things like: ',

      el('button', { onClick: props.buttonClickHandler.bind(null, props.buttonClickArg) }, 'Fetch projects')

    )

  )

);

export default renderFromStore(

  __filename,

  null, // use the entire state atom

  (el, state, actions) => (

    el('div', null,

      el(Toolbar, { buttonClickHandler: actions.database.startDatabaseConnection, buttonClickArg: true }),

      !!state.database.databaseFailures.size && el('p', null, 'ERROR: DATABASE FAILED'),

      el('ul', null, state.projects.projectMap.toArray().map(
        project => el('li', { key: project.id }, project.name,
          el('ul', null, project.tasks.map(
            task => el('li', { key: task.id }, task.name)
          ))
        )
      )),

      !!state.database.doingInitialFetch && el('p', null, 'Fetching...')

    )

  )

);
