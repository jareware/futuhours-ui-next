import { renderFromProps } from 'futuhours/utils/react';

export default renderFromProps(

  __filename,

  {},

  (el, props) => (

    el('div', { className: 'this' }, 'Hola, Mundo!')

  )

);
