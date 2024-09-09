import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/context/global/store';
import { ToastType as Type } from '@/shared/types/ui/Toast';

export type ToastType = {
  toastId: number;
  index: number;
  type: Type;
  canClose: boolean;
  autoClose: {
    duration: number;
  };
};

export type IToastSlice = {
  data: ToastType[];
  total: number;
};

const initialState: IToastSlice = {
  data: [],
  total: 0,
};

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    SET_TOAST: (state, action) => {
      state.total++;

      const newToast: ToastType = {
        toastId: state.total,
        index: state.data.length + 1,
        type: action.payload.type,
        canClose: action.payload.canClose,
        autoClose: action.payload.autoClose,
      };

      state.data.push(newToast);
    },
    REMOVE_TOAST: (state, action) => {
      const { toastId } = action.payload;
      const newState = [];

      for (let i = 0; i < state.data.length; i++) {
        if (state.data[i].toastId !== toastId) {
          state.data[i].index = newState.length + 1;
          newState.push(state.data[i]);
        }
      }

      state.data = newState;
    },
  },
});

export const { SET_TOAST, REMOVE_TOAST } = toastSlice.actions;
export const getToast = (state: RootState) => state.toast;

export default toastSlice.reducer;
