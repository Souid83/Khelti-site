import { useState, useEffect } from 'react';

export function useJsonData<T>(path: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(path);
        if (!response.ok) {
          throw new Error(`Failed to fetch data from ${path}`);
        }
        const jsonData = await response.json();
        setData(jsonData);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [path]);

  return { data, loading, error };
}
