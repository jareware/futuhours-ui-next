/* eslint-env browser */
// ^ browser globals are specifically allowed here, but not in general

// Include the runtime polyfill from Babel
// @see https://babeljs.io/docs/usage/polyfill/
import 'babel-polyfill';

// TODO: import FutuHoursUi from 'futuhours/ui/FutuHoursUi';

// Help older mobile browsers with their click-delay-woes
import fastclick from 'fastclick';
fastclick(document.body);

console.log('Hello, World!');
