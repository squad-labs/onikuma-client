import axios from 'axios';
import { ShareResultModalProps, ShareTopicModalProps } from '@/shared/types/ui/Modal';

export const getShareImage = async (params: ShareTopicModalProps) => {
  try {
    const res = await axios.post('/api/image', params);

    console.log('res', res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getResultImage = async (params: ShareResultModalProps) => {
  try {
    const res = await axios.post('/api/result', params);

    console.log('res', res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}