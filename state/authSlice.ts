import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SUPERADMIN_USERNAME } from '../config';
import { User } from '../types';

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  user: User | null;
  isSuperAdmin: boolean;
}

const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
  user: null,
  isSuperAdmin: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setSignIn: (state, action: PayloadAction<{ token: string; user: User }>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.isSuperAdmin = action.payload.user.username === SUPERADMIN_USERNAME;
    },
    setSignOut: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.isSuperAdmin = false;
    },
  },
});

export const { setSignIn, setSignOut } = authSlice.actions;
export default authSlice.reducer;
