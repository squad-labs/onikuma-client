import { useCallback, useEffect, useRef, useState } from 'react';

const useTimer = (endTime?: string) => {
  const [timeLeft, setTimeLeft] = useState<Date>(new Date());
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const getTimeList = useCallback((start: number, end: number) => {
    let numList = [];
    for (let i = start; i <= end; i++) {
      if (i < 10) {
        numList.push('0' + i.toString());
      } else {
        numList.push(i.toString());
      }
    }
    return numList;
  }, []);

  const handleOnChangeNumber = useCallback((text: string, max: 23 | 59) => {
    const num = parseInt(text);
    if (text.length === 0 || Number.isNaN(num)) {
      return 0;
    }
    if (num >= max) {
      return max;
    }
    return num;
  }, []);

  const handleConvertNumber = useCallback((num: number) => {
    if (num < 10) return `0${num}`;
    return num.toString();
  }, []);

  useEffect(() => {
    const now = new Date();
    const [year, month, date] = [
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
    ];
    const end = endTime ? new Date(endTime) : new Date(year, month, date + 1);
    setTimeLeft(new Date(end.getTime() - now.getTime()));

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => new Date(prev.getTime() - 1000));
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [endTime]);

  return {
    date: timeLeft.getUTCDate(),
    hour: timeLeft.getUTCHours(),
    minute: timeLeft.getUTCMinutes(),
    second: timeLeft.getUTCSeconds(),
    getTimeList,
    handleOnChangeNumber,
    handleConvertNumber,
  };
};

export default useTimer;
