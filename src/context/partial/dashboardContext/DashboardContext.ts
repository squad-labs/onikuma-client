import { Dashboard, MyVote } from '@/shared/types/data/dashboard';
import { Topic } from '@/shared/types/data/topic';
import { createContext, Dispatch, SetStateAction } from 'react';

export interface IDashboardContext {
  topic: Topic | null;
  setTopic: Dispatch<SetStateAction<Topic | null>>;
  dashboard: Dashboard | null;
  setDashboard: Dispatch<SetStateAction<Dashboard | null>>;
  myVote: MyVote | null;
  setMyVote: Dispatch<SetStateAction<MyVote | null>>;
}

const defaultValue: IDashboardContext = {
  topic: null,
  setTopic: () => {},
  dashboard: null,
  setDashboard: () => {},
  myVote: null,
  setMyVote: () => {},
};

export const DashboardContext = createContext<IDashboardContext>(defaultValue);
