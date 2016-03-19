import createCssNs from 'css-ns';
import React from 'react';

// @example renderFromProps(
//            __filename,
//            { name: React.PropTypes.string.isRequired },
//            (el, props) => el('div', null, "Hello, " + props.name)
//          );
export function renderFromProps(fileName, propTypes, renderFunc) {
  const ns = createCssNs({ // @see https://github.com/jareware/css-ns
    namespace: fileName,
    React
  });
  return React.createClass({
    displayName: ns('this'),
    propTypes,
    render() {
      return renderFunc.call(null, ns.React.createElement, this.props);
    }
  });
}
