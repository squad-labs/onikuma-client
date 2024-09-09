import axios from 'axios';
import {
  ShareResultModalProps,
  ShareTopicModalProps,
} from '@/shared/types/ui/Modal';
import { PollResult } from '@/shared/types/data/dashboard';
import { getCookie } from 'cookies-next';

type PostShareImageParams = {
  topicId: string;
  file: File | Blob;
  token: string;
};

export const postShareImage = async ({
  topicId,
  file,
  token,
}: PostShareImageParams) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const res = await axios.post(
      `${process.env.API_BASE_URL}/api/topics/share-image/${topicId}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return res.data;
  } catch (err) {
    return err;
  }
};

export const getShareImage = async (
  params: ShareTopicModalProps & {
    token: string;
  },
) => {
  try {
    const res = await axios.post('/api/image', params);
    return res.data;
  } catch (err) {
    return err;
  }
};

export const getResultImage = async (
  params: ShareResultModalProps & {
    token: string;
  },
) => {
  try {
    const res = await axios.post('/api/result', params);

    return res.data;
  } catch (err) {
    return err;
  }
};

export const getPollResultImage = async (
  params: PollResult & {
    token: string;
  },
) => {
  try {
    const res = await axios.post('/api/poll-result', params);

    return res.data;
  } catch (err) {
    return err;
  }
};

type PostFlipImageParms = {
  topicId: string;
  file: File | Blob;
  pickerName: string;
};

export const postFlipImage = async ({
  topicId,
  file,
  pickerName,
}: PostFlipImageParms) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('pickerName', pickerName);

  try {
    const token = getCookie('token');
    const res = await axios.post(
      `/api/topics/biggest-picker-image/${topicId}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return res.data;
  } catch (err) {
    return err;
  }
};
