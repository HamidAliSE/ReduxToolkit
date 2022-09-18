import axios from 'axios';
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

const initialState = {
  users: [],
  error: '',
  loading: false,
};

export const fetchUsers = createAsyncThunk('user/fetchUsers', () => {
  return axios
    .get('https://jsonplaceholder.typicode.com/users')
    .then(response =>
      response.data.map(user => {
        return {id: user.id, name: user.name, username: user.username};
      }),
    );
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchUsers.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.error = '';
      state.loading = false;
      state.users = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.users = [];
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default userSlice.reducer;
