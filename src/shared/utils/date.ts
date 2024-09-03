const TimeMap = (() => {
  const min = 60;
  const hour = min * 60;
  const day = hour * 24;
  const week = day * 7;
  const month = week * 4;
  const year = month * 12;
  return { min, hour, day, week, month, year };
})();

const TimeTextMap = {
  [TimeMap.min]: 'm',
  [TimeMap.hour]: 'h',
  [TimeMap.day]: 'd',
  [TimeMap.week]: 'w',
  [TimeMap.month]: 'm',
  [TimeMap.year]: 'y',
};

const createTimeText = (time: number, standard: number, suffix: string) => {
  const duration = Math.floor(time / standard);
  return `${duration}${duration === 1 ? suffix : suffix}`;
};

const translateTimeZone = (updated_at: string) => {
  return +new Date(
    parseInt(updated_at.slice(0, 4)),
    parseInt(updated_at.slice(5, 7)) - 1,
    parseInt(updated_at.slice(8, 10)),
    parseInt(updated_at.slice(11, 13)) + 9,
    parseInt(updated_at.slice(14, 16)),
  );
};

export const fetchRelatedTime = (updated_at: string) => {
  const seconds = (+new Date() - translateTimeZone(updated_at)) / 1000;
  return Object.entries(TimeMap).reduce((text, [time, value]) => {
    if (seconds >= value && time)
      return `${createTimeText(seconds, value, TimeTextMap[value])} ago`;
    return text;
  }, 'Just before');
};

export const fetchDateFormat = (date: string) => {
  return date.slice(0, 10);
};

export const fetchTimeFormat = (date: string) => {
  return date.slice(11, 18);
};
