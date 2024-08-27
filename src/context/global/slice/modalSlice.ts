import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/context/global/store';
import { ModalType, PoolInModalProps, ShareResultModalProps, ShareTopicModalProps } from '@/shared/types/ui/Modal';

export interface IModalState<T> {
  name: ModalType | undefined;
  data: T
}

type ModalProps = ShareResultModalProps | ShareTopicModalProps | PoolInModalProps | undefined;

const initialState: IModalState<ModalProps> = {
  name: undefined,
  data: undefined,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    OPEN_MODAL: (state, action) => {
      const { name, data } = action.payload;
      state.name = name;
      state.data = data;
    },
    CLOSE_MODAL: (state) => {
      state.name = undefined;
      state.data = undefined;
    },
    CHANGE_MODAL: (state, action) => {
      const { modal } = action.payload;
      state.name = modal;
    },
  },
});

export const { OPEN_MODAL, CLOSE_MODAL, CHANGE_MODAL } = modalSlice.actions;

export const getCurrentModal = (state: RootState) => {
  return { name: state.modal.name };
};
export const getModal = (state: RootState) => state.modal;

export default modalSlice.reducer;
