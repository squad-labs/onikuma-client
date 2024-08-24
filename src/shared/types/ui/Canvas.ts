import { Position } from '@/shared/types/etc/Position';

export type BaseCanvasProps = {
  bgImage: string;
  name: string;
  stickers?: Sticker[];
  text?: string;
  width?: number;
  height?: number;
};

export type Sticker = {
  position: Position;
  image: string;
};
