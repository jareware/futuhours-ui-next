import createCssNs from 'css-ns';
import React from 'react';

// @see https://github.com/jareware/css-ns
export default fileName => createCssNs({
  namespace: fileName,
  exclude: /^(icon)-/,
  React
});
