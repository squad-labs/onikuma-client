import axios from 'axios';
import { TestToken } from '@/shared/constants/TEST';

export const getMyData = async () => {
  try {
    const response = await axios.get('/dashboards/all-my-data', {
      headers: {
        Authorization: `Bearer ${TestToken}`,
      },
    });

    return response.data;
  } catch (err) {

    return err;
  }
};