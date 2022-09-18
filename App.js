import React from 'react';
import {Provider} from 'react-redux';

import store from './app/store';
import Screen from './code/Screen';

const App = () => {
  return (
    <Provider store={store}>
      <Screen />
    </Provider>
  );
};

export default App;
