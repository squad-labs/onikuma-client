import { UserType } from '@/shared/types/data/user';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/context/global/store';

export interface IAuthState {
  isAuthenticated: boolean;
  user: UserType | null;
  error: {
    message: string;
    fallback: () => void;
  } | null;
}

const initialState: IAuthState = {
  isAuthenticated: false,
  user: null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    LOGIN: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    LOGOUT: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
    SET_ERROR: (state, action) => {
      state.error = action.payload;
    },
    CLEAR_ERROR: (state) => {
      state.error = null;
    },
  },
});

export const {} = authSlice.actions;
export const getAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
