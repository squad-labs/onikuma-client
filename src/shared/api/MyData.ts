import { TestToken } from '@/shared/constants/TEST';

export const fetchMyData = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/dashboards/all-my-data`,
      {
        headers: {
          Authorization: `Bearer ${TestToken}`,
        },
      },
    );

    if (res.ok && res.status === 200) {
      return await res.json();
    }
  } catch (err) {
    return err;
  }
};