'use client';
import { Option } from '@/shared/types/data/topic';
import { createContext, Dispatch, SetStateAction } from 'react';

export interface IRoundContext {
  currentRound: 8 | 4 | 2 | 1;
  setCurrentRound: Dispatch<SetStateAction<8 | 4 | 2 | 1>>;
  options: Option[];
  selectedOptions: Option[];
  setOptions: Dispatch<SetStateAction<Option[]>>;
  currentIndex: number[];
  setCurrentIndex: Dispatch<SetStateAction<number[]>>;
  next: (optionName: string) => void;
}

const defaultValue: IRoundContext = {
  currentRound: 8,
  setCurrentRound: () => {},
  options: [],
  selectedOptions: [],
  setOptions: () => {},
  currentIndex: [],
  setCurrentIndex: () => {},
  next: () => {},
};

export const RoundContext = createContext<IRoundContext>(defaultValue);
