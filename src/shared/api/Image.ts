import axios from 'axios';
import {
  ShareResultModalProps,
  ShareTopicModalProps,
} from '@/shared/types/ui/Modal';
import { PollResult } from '@/shared/types/data/dashboard';

export const getShareImage = async (params: ShareTopicModalProps) => {
  try {
    const res = await axios.post('/api/image', params);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getResultImage = async (params: ShareResultModalProps) => {
  try {
    const res = await axios.post('/api/result', params);

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getPollResultImage = async (params: PollResult) => {
  try {
    const res = await axios.post('/api/poll-result', params);

    return res.data;
  } catch (error) {
    console.log(error);
  }
};
