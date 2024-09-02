import axios from 'axios';
import {
  ShareResultModalProps,
  ShareTopicModalProps,
} from '@/shared/types/ui/Modal';
import { PollResult } from '@/shared/types/data/dashboard';
import { getCookie } from 'cookies-next';

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

type PostFlipImageParms = {
  topicId: string;
  file: File | Blob;
  pickerName: string;
}

export const postFlipImage = async({ topicId, file, pickerName }: PostFlipImageParms) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('pickerName', pickerName);

  try {
    const token = getCookie('token');
    const res = await axios.post(`/api/topics/biggest-picker-image/${topicId}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })

    return res.data;
  } catch (error) {

  }
}