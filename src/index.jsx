import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import 'antd/dist/antd.css';
import { hot } from 'react-hot-loader';
import App from './components/App';
import store from './store';

const AppContainer = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

const HotAppContainer = hot(module)(AppContainer);

render(<HotAppContainer />, document.getElementById('root'));
