import { Comment } from '@/shared/types/data/comment';
import { Socket } from 'socket.io-client';
import { ActivityType } from '@/shared/types/data/activity';

export interface BaseSocketEvent {
  basicEmit: (event: string, data: Buffer) => void;
  error: (error: Error) => void;
}

export interface CommentSocketEvent extends BaseSocketEvent {
  comment: (comment: Comment) => void;
}

export interface ActivitySocketEvent extends BaseSocketEvent {
  activity: (activity: ActivityType) => void;
}

export type CommentSocketType = Socket<CommentSocketEvent>;

export type ActivitySocketType = Socket<ActivitySocketEvent>;
