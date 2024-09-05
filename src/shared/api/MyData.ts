import axios from 'axios';
import { getCookie } from 'cookies-next';

export const getMyData = async () => {
  const token = getCookie('accessToken');

  try {
    const response = await axios.get('/api/dashboards/all-my-data', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (err) {
    return err;
  }
};
