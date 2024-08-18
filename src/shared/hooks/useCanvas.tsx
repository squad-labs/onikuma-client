import { BaseCanvasProps } from "@/shared/types/ui/Canvas"
import { createCanvas } from 'canvas'

export const useCanvas = ({ bgImage, stickers, text, width = 700, height = 700 }: BaseCanvasProps) => {
  const canvas = createCanvas(width, height)

  return canvas;
}