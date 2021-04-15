import { useState, useEffect } from "react";

export { useFetch };

function useFetch<Data>(requestUrl: string | null) {
  const [data, setData] = useState<Data | null>(null);
  const [httpStatus, setHttpStatus] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setData(null);
    setHttpStatus(null);
    setError(null);

    if (!requestUrl) {
      return;
    }

    let effectCancelled = false;
    setIsLoading(true);

    (async () => {
      let response: Response;
      try {
        response = await fetch(requestUrl);
        if (effectCancelled) return;

        setHttpStatus(response.status);
      } catch (err) {
        if (effectCancelled) return;

        const message = (err as Error).message;
        setError(`Error: ${message}`);
        setIsLoading(false);
        return;
      }

      if (!response.ok) {
        let errorData = await response.json();
        if (effectCancelled) return;

        setError(`HTTP Error: (${response.status}) ${errorData.message}`);
        setIsLoading(false);
        return;
      }

      const responseData = await response.json();
      if (effectCancelled) return;

      setData(responseData);
      setIsLoading(false);
    })();

    return () => {
      effectCancelled = true;
    };
  }, [requestUrl]);

  return { data, httpStatus, error, isLoading };
}
