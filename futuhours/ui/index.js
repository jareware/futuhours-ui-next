/* eslint-env browser */
// ^ browser globals are specifically allowed here, but not in general

// Include the runtime polyfill from Babel
// @see https://babeljs.io/docs/usage/polyfill/
import 'babel-polyfill';

// Help older mobile browsers with their click-delay-woes
import fastclick from 'fastclick';
fastclick(document.body);

// Enable this (and Custom formatter support from Chrome DevTools) to see inside Immutable.js data structures while debugging
// import Immutable from 'immutable';
// import immutableDevTools from 'immutable-devtools';
// immutableDevTools(Immutable);

// Construct our app instance
import { createReduxApp } from 'futuhours/utils/redux';
import modules from 'futuhours/app/';
import PouchDB from 'pouchdb';
const utils = {
  pouchDB: new PouchDB(process.env.DB_URL),
  devToolsExtension: window.devToolsExtension,
};
const app = window.app = createReduxApp(modules, utils);

// Import and render the UI root
import FutuHoursUi from 'futuhours/ui/FutuHoursUi';
import { renderReduxApp } from 'futuhours/utils/react';
renderReduxApp(app, FutuHoursUi, document.getElementById('futuhours-root'));
