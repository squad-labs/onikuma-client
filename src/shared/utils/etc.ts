export const getTimezone = () => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
};
