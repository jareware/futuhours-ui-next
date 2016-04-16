import { PropTypes } from 'react';
import { renderFromProps, renderFromStore } from 'futuhours/utils/react';
import PunchInPanel from 'futuhours/ui/PunchInPanel';

export default renderFromStore(

  __filename,

  state => state.database,

  (el, state) => (

    el('div', null,

      el(PunchInPanel),

      !!state.databaseFailures.size && el('p', null, 'ERROR: DATABASE FAILED'),

      !!state.doingInitialFetch && el('p', null, 'Fetching...')

    )

  )

);
