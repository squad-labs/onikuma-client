import { ActivityType } from '@/shared/types/data/activity';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/context/global/store';

export type ActivitySliceType = ActivityType & {
  alertId: string;
};

export type IAlertSlice = {
  data: ActivitySliceType[];
  total: number;
};

const initialState: IAlertSlice = {
  data: [],
  total: 0,
};

const alertState = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    SET_ALERT_DATA: (state, action) => {
      state.total++;
      const newAlert: ActivitySliceType = {
        activityId: action.payload.activityId,
        topicId: action.payload.topicId,
        userWallet: action.payload.userWallet,
        poolIn: action.payload.poolIn,
        createdAt: action.payload.createdAt,
        alertId: state.total.toString(),
      };

      state.data.push(newAlert);
    },
    REMOVE_ALERT_DATA: (state, action) => {
      const { alertId } = action.payload;

      const _state = state.data.filter((item) => item.alertId !== alertId);

      state.data = _state;
    },
  },
});

export const { SET_ALERT_DATA, REMOVE_ALERT_DATA } = alertState.actions;
export const getAlertData = (state: RootState) => state.alert;

export default alertState.reducer;
