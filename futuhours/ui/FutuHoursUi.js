import createCssNs from 'futuhours/utils/css-ns';

const { React } = createCssNs(__filename);

export default React.createClass({

  render() {
    return <div className="this">Hola, Mundo!</div>;
  }

});
