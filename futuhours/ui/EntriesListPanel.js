import { renderFromStore } from 'futuhours/utils/react';
import { Button, Input } from 'react-bootstrap';
import { getAvailableTaskList, getReadableProjectAndTask } from 'futuhours/app/projects';
import { getOngoingEntries } from 'futuhours/app/entries';

export default renderFromStore(

  __filename,

  null, // use the entire state atom

  (el, state, actions) => (

    el('div', { className: 'this' },

      el('table', { className: 'table table-bordered' },
        el('thead', null,
          el('tr', null,
            el('th', null, 'Start time'),
            el('th', null, 'End time'),
            el('th', null, 'Project & task')
          )
        ),
        el('tbody', null,
          getOngoingEntries(state.entries).toArray().map(entry => (
            el('tr', { key: entry._id },
              el('td', null, entry.startDate ? new Date(entry.startDate).toISOString() : 'n/a'),
              el('td', null, entry.endDate ? new Date(entry.endDate).toISOString() : 'n/a'),
              el('td', null, getReadableProjectAndTask(state.projects, entry))
            )
          ))
        )
      )

    )

  )

);
