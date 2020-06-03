import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import App from './App';
import { AppContainer } from 'react-hot-loader';

import { store } from './store/store';
import { Provider } from 'react-redux';

const render = (App) => {
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <AppContainer>
          <App />
        </AppContainer>
      </Provider>
    </React.StrictMode>,
    document.getElementById('root')
  );
};

render(App);


if (module.hot) {
  module.hot.accept('./App', () => { render(App); });
}