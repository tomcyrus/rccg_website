import { useEffect, useState } from 'react';
import { api, errorMessage } from '../utils/api';

export function usePublicContent<T>(kind: string) {
  const [items, setItems] = useState<T[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let active = true;
    const refresh = () => api<T[]>(`/public/${kind}`).then(data => {
      if (active) { setItems(data); setError(''); }
    }).catch(err => { if (active) setError(errorMessage(err)); })
      .finally(() => { if (active) setLoading(false); });
    void refresh();
    window.addEventListener('focus', refresh);
    window.addEventListener('church-content-changed', refresh);
    return () => { active = false; window.removeEventListener('focus', refresh); window.removeEventListener('church-content-changed', refresh); };
  }, [kind]);
  return { items, error, loading };
}
