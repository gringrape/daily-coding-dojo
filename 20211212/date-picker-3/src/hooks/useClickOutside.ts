import { useEffect } from 'react';

export default function useClickOutside(ref: any, handler: any) {
  useEffect(() => {
    const listener = (e: any) => {
      if (!ref.current || ref.current.contains(e.target)) {
        return;
      }

      handler();
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.addEventListener('touchstart', listener);
    };
  });
}
