import { Comment } from '@/shared/types/data/comment';
import { Socket } from 'socket.io-client';

export interface BaseSocketEvent {
  basicEmit: (event: string, data: Buffer) => void;
  error: (error: Error) => void;
}

export interface CommentSocketEvent extends BaseSocketEvent {
  comment: (comment: Comment) => void;
}

export interface GameSocketEvent extends BaseSocketEvent {
  game: (message: string) => void;
}

export type CommentSocketType = Socket<CommentSocketEvent>;

export type GameSocketType = Socket<GameSocketEvent>;
