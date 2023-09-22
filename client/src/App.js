import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import { Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home/Home';
import Ad from './components/pages/Ad/Ad';
import AdAdd from './components/pages/AdAdd/AdAdd';
import AdEdit from './components/pages/AdEdit/AdEdit';

const App = () => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/ad/:id' element={<Ad />} />
          <Route path='/ad/add' element={<AdAdd />} />
          <Route path='/ad/edit/:id' element={<AdEdit />} />
        </Routes>
      </Provider>
    </React.StrictMode>
  );
};

export default App;
