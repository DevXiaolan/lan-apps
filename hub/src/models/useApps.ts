import { getApps, IApp } from '@/services';
import { useCallback, useState } from 'react';

export default function useApps() {
  const [apps, setApps] = useState<IApp[]>([]);
  const load = useCallback(() => {
    getApps().then(data => setApps(data));
  }, []);
  return {
    apps,
    load,
  };
}
