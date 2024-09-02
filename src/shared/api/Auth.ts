import axios from 'axios';

type UserLoginParams = {
  wallet: string;
  timezone: string;
};

export const userLogin = async (params: UserLoginParams) => {
  try {
    const res = await axios.post('/api/users/login', params);

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const userRefresh = async (params: UserLoginParams) => {
  try {
    const res = await axios.post('/api/users/refresh', params);

    return res.data;
  } catch (error) {
    console.log(error);
  }
};
