/* eslint-env browser */
// ^ browser globals are specifically allowed here, but not in general

// Include the runtime polyfill from Babel
// @see https://babeljs.io/docs/usage/polyfill/
import 'babel-polyfill';

// Help older mobile browsers with their click-delay-woes
import fastclick from 'fastclick';
fastclick(document.body);

// Import and render the UI root
import React from 'react'
import { render } from 'react-dom'
import FutuHoursUi from 'futuhours/ui/FutuHoursUi';
render(<FutuHoursUi />, document.getElementById('futuhours-root'));
