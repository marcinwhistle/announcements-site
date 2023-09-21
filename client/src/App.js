import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';

const App = () => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <h1>Hello World</h1>
      </Provider>
    </React.StrictMode>
  );
};

export default App;
