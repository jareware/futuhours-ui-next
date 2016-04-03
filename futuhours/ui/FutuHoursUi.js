import { PropTypes } from 'react';
import { renderFromProps, renderFromStore } from 'futuhours/utils/react';

const Toolbar = renderFromProps(

  'Toolbar',

  {
    onButtonClick: PropTypes.func.isRequired,
  },

  (el, props) => (

    el('p', null, 'You can do things like: ',

      el('button', { onClick: props.onButtonClick }, 'Fetch projects')

    )

  )

);

export default renderFromStore(

  __filename,

  null, // use the entire state atom

  (el, state, app) => (

    el('div', null,

      el(Toolbar, { onButtonClick: app.projects.fetchProjects }),

      el('ul', null, state.projects.map(
        project => el('li', { key: project.id }, project.name,
          el('ul', null, project.tasks.map(
            task => el('li', { key: task.id }, task.name)
          ))
        )
      )),

      !!state.operations && el('p', null, 'Fetching...')

    )

  )

);
