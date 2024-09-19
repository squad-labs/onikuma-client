'use client';
import { Option } from '@/shared/types/data/topic';
import { createContext, Dispatch, SetStateAction } from 'react';

export interface IRoundContext {
  ticker: string;
  isSending: boolean;
  setTicker: Dispatch<SetStateAction<string>>;
  getToken: (amount: string) => Promise<{ price: number; royalty: number }>;
  mintToken: (callback: () => void) => void;
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
  ticker: '',
  isSending: false,
  setTicker: () => {},
  getToken: async () => ({ price: 0, royalty: 0 }),
  mintToken: () => {},
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
