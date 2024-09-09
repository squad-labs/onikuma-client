'use client';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import alertSlice from '@/context/global/slice/alertSlice';
import modalSlice from '@/context/global/slice/modalSlice';
import authSlice from '@/context/global/slice/authSlice';
import toastSlice from '@/context/global/slice/toastSlice';

const rootReducer = combineReducers({
  alert: alertSlice,
  modal: modalSlice,
  auth: authSlice,
  toast: toastSlice,
  // Add reducers here
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
