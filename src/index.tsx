import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { AppWithRedux } from './AppWithRedux';
import { Provider } from 'react-redux';
import { store } from './state/store';

// import {App} from './App'
// import { AppWithReducers } from './AppWithReducers';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <App/> */}
      {/* <AppWithReducers/> */}
      <AppWithRedux />
    </Provider>
  </React.StrictMode>
);


