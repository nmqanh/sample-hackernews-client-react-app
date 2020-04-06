const airbnb = require('@neutrinojs/airbnb');
const react = require('@neutrinojs/react');
const jest = require('@neutrinojs/jest');

module.exports = {
  options: {
    root: __dirname,
  },
  use: [
    (neutrino) => {
      neutrino.config.resolve.alias.set('react-dom', '@hot-loader/react-dom');
    },
    airbnb(),
    react({
      html: {
        title: 'sample-hackernews-client-react-app'
      }
    }),
    jest(),
  ],
};
