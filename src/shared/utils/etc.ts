export const blockDuplicate = (arr1: any[], arr2: any[], page: number) => {
  if ((arr1.length + arr2.length) / page === 20) return true;
  return false;
};

export const getTimezone = () => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
};
