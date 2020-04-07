const airbnb = require('@neutrinojs/airbnb');
const react = require('@neutrinojs/react');
const jest = require('@neutrinojs/jest');

module.exports = {
  options: {
    root: __dirname,
  },
  use: [
    (neutrino) => {
      if (process.env.NODE_ENV !== 'test') {
        neutrino.config.resolve.alias.set('react-dom', '@hot-loader/react-dom');
      }
    },
    airbnb({
      eslint: {
        baseConfig: {
          rules: {
            'react/jsx-props-no-spreading': 'off',
            'import/prefer-default-export': 'off',
          },
        },
      },
    }),
    react({
      html: {
        title: 'sample-hackernews-client-react-app'
      }
    }),
    jest({
      clearMocks: true,
      testRegex: './.*(_test|_spec|\.test|\.spec)\.(mjs|jsx|js)$',
      setupFiles: ['jest-date-mock'],
      setupFilesAfterEnv: ['./tests/setup.js'],
    }),
  ],
};
