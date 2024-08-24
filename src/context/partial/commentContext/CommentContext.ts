import { CommentSocketType } from '@/shared/types/etc/Socket';
import { Dispatch, SetStateAction, createContext } from 'react';

export interface ICommnetContext {
  comment: string;
  setComment: Dispatch<SetStateAction<string>>;
  socket: CommentSocketType | null;
  isConnected: boolean;
}

const defaultValue: ICommnetContext = {
  comment: '',
  setComment: () => {},
  socket: null,
  isConnected: false,
};

export const CommentContext = createContext<ICommnetContext>(defaultValue);
