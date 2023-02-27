import { useEffect } from 'react';

export function useLoggedLifecycle(tag: string) {
  console.log(tag, '🔄 Rendering');

  useEffect(() => {
    console.log(tag, '✅ Mounted');

    return () => {
      console.log(tag, '⛔️ Unmounting');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
