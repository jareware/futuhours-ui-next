import createCssNs from 'css-ns'; // @see https://github.com/jareware/css-ns
import React from 'react';
import { render } from 'react-dom';
import { is } from 'immutable';
import { debounce } from 'lodash';

// @example renderFromProps(
//            __filename,
//            { name: React.PropTypes.string.isRequired },
//            (el, props) => el('div', null, "Hello, " + props.name)
//          );
export function renderFromProps(fileName, propTypes, renderFunc) {
  const ns = createCssNs({
    namespace: fileName,
    React,
  });
  return React.createClass({
    displayName: ns('this'),
    propTypes,
    render() {
      return renderFunc.call(null, ns.React.createElement, this.props);
    },
  });
}

// @example renderFromStore(
//            __filename,
//            state => state.get('projects'),
//            (el, projects, actions, utils) => el('ul', null, projects.map(
//              project => el('li', null, project.name)
//            ))
//          );
export function renderFromStore(fileName, storeSelector, renderFunc) {
  const ns = createCssNs({
    namespace: fileName,
    React,
  });
  return React.createClass({
    displayName: ns('this'),
    contextTypes: {
      reduxApp: React.PropTypes.object.isRequired,
    },
    componentWillMount() {
      const reduxApp = this.context.reduxApp;
      const select = storeSelector || (x => x);
      const setState = () => this.setState({
        selectStoreState: select(reduxApp.store.getState()),
      });
      setState(); // set initial state immediately
      this._unsubscribe = reduxApp.store.subscribe(debounce(setState)); // ...and subscribe to further updates
    },
    shouldComponentUpdate(nextProps, nextState) {
      return !is(nextState.selectStoreState, this.state.selectStoreState);
    },
    componentWillUnmount() {
      this._unsubscribe();
    },
    render() {
      return renderFunc.call(null, ns.React.createElement, this.state.selectStoreState, this.context.reduxApp.actions, this.context.reduxApp.utils);
    },
  });
}

// @example renderReduxApp(
//            createReduxApp(...),
//            MyAppUi,
//            document.getElementById('react-root')
//          );
export function renderReduxApp(reduxApp, TopLevelComponent, domMountPoint) {
  const ReduxAppProvider = React.createClass({
    propTypes: {
      children: React.PropTypes.node,
    },
    childContextTypes: {
      reduxApp: React.PropTypes.object.isRequired,
    },
    getChildContext() {
      return { reduxApp };
    },
    render() {
      return React.Children.only(this.props.children); // implicitly asserts exactly 1 child
    },
  });
  render(
    React.createElement(ReduxAppProvider, null, React.createElement(TopLevelComponent)),
    domMountPoint
  );
}
