import {createSlice} from '@reduxjs/toolkit';

import {cakeActions} from '../cake/cakeSlice';

const initialState = {
  numOfIceCreams: 20,
};

const iceCreamSlice = createSlice({
  name: 'iceCream',
  initialState,
  reducers: {
    ordered: state => {
      state.numOfIceCreams--;
    },
    restocked: (state, action) => {
      state.numOfIceCreams += action.payload;
    },
  },
  // Method 1 for using extra reducers
  //   extraReducers: {
  //     ['cake/orderedDeal']: state => {
  //       state.numOfIceCreams--;
  //     },
  //   },

  //   Method 2 for using extra reducers (Recommended)
  extraReducers: builder => {
    builder.addCase(cakeActions.orderedDeal, state => {
      state.numOfIceCreams--;
    });
  },
});

export default iceCreamSlice.reducer;
export const iceCreamActions = iceCreamSlice.actions;
