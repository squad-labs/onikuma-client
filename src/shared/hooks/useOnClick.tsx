'use client';
import { RefObject, useEffect } from 'react';

export default function useOnClickOutside<T extends HTMLElement = HTMLElement>({
  ref,
  handler,
  mouseEvent,
}: {
  ref: RefObject<T>;
  handler: () => void;
  mouseEvent: keyof DocumentEventMap;
}) {
  useEffect(() => {
    const listener = (event: Event) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }

      if (event instanceof MouseEvent) {
        handler();
      }
    };

    document.addEventListener(mouseEvent, listener);

    return () => {
      document.removeEventListener(mouseEvent, listener);
    };
  }, [ref, handler, mouseEvent]);
}
