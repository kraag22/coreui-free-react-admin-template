import React from 'react';
import ReactDOM from 'react-dom';
import AddUser from './AddUser';
import { Provider } from 'react-redux';
import { configureStore } from '../../stores/configure-store.development';
import { HashRouter } from 'react-router-dom';

it('renders without crashing', () => {
  const store = configureStore()
  const div = document.createElement('div');
  ReactDOM.render(<Provider store={store}><HashRouter><AddUser /></HashRouter></Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});
