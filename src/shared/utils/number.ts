import { ColorType } from '@/shared/types/ui/Color';

export const numberSuffix = (num: number) => {
  if (num === 1) return 'st';
  else if (num === 2) return 'nd';
  else if (num === 3) return 'rd';
  else return 'th';
};

export const thousandFormat = (num: string | number): string => {
  // Check if the input is null, undefined, or not a number.
  if (num === null || num === undefined || isNaN(Number(num))) {
    return '0';
  }

  // Convert the input to a string if it's not already.
  const base = num.toString();

  // Format the string with thousand separators.
  return base.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
};

export const fillZero = (width: number, str: string): string => {
  return str.length >= width ? str : '0'.repeat(width - str.length) + str;
};

export const sumNumberArray = (arr: number[]): number => {
  return arr.reduce((acc, cur) => acc + cur, 0);
};

export const getNumberSign = (
  value: number,
): { result: boolean; sign: '+' | '' | '-'; color: ColorType } => {
  return value === 0
    ? { result: true, sign: '', color: 'DARK_GRAY_2' }
    : value > 0
      ? { result: true, sign: '+', color: 'BASE_GREEN_1' }
      : { result: false, sign: '-', color: 'BASE_RED_1' };
};

export const handleNumberUpdate = (text: string | number): number | '' => {
  const value = typeof text !== 'number' ? parseFloat(text) : text;
  if (Number.isNaN(value) || typeof value !== 'number' || value < 0) return '';
  return value;
};
