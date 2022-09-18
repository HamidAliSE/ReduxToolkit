import {createLogger} from 'redux-logger';
import {configureStore} from '@reduxjs/toolkit';

import userReducer from '../features/user/userSlice';
import cakeReducer from '../features/cake/cakeSlice';
import iceCreamReducer from '../features/iceCream/iceCreamSlice';

const reduxLoggerMiddleware = createLogger();

const store = configureStore({
  reducer: {
    user: userReducer,
    cake: cakeReducer,
    iceCream: iceCreamReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(reduxLoggerMiddleware),
});

export default store;
