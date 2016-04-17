import { PropTypes } from 'react';
import { renderFromProps, renderFromStore } from 'futuhours/utils/react';
import PunchInPanel from 'futuhours/ui/PunchInPanel';
import EntriesListPanel from 'futuhours/ui/EntriesListPanel';

export default renderFromStore(

  __filename,

  state => state.database,

  (el, state) => (

    el('div', null,

      !!state.databaseFailures.size && el('p', null, 'ERROR: DATABASE FAILED'),

      !!state.doingInitialFetch && el('p', null, 'Fetching...'),

      el(PunchInPanel),

      el(EntriesListPanel)

    )

  )

);
