'use client';
import { DashboardContext } from '@/context/partial/dashboardContext/DashboardContext';
import { Dashboard, MyVote } from '@/shared/types/data/dashboard';
import { Topic } from '@/shared/types/data/topic';
import { ReactNode, useContext, useState } from 'react';

type Props = {
  children: ReactNode;
  topic: Topic;
  dashboard: Dashboard;
  myVote: MyVote;
};

const DashboardProvider = ({
  children,
  topic: currentTopic,
  dashboard: currentDashboard,
  myVote: currentMyVote,
}: Props) => {
  const [topic, setTopic] = useState<Topic | null>(currentTopic);
  const [dashboard, setDashboard] = useState<Dashboard | null>(
    currentDashboard,
  );
  const [myVote, setMyVote] = useState<MyVote | null>(currentMyVote);

  return (
    <DashboardContext.Provider
      value={{
        topic,
        setTopic,
        dashboard,
        setDashboard,
        myVote,
        setMyVote,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

const useTopic = () => {
  const { topic } = useContext(DashboardContext);
  return topic;
};

const useDashboard = () => {
  const { dashboard } = useContext(DashboardContext);
  return dashboard;
};

const useMyVote = () => {
  const { myVote } = useContext(DashboardContext);
  return myVote;
};

export { DashboardProvider, useTopic, useDashboard, useMyVote };
