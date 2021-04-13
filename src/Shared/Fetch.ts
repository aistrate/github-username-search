import { useState, useEffect } from "react";

export { useFetch };

function useFetch<Data>(requestUrl: string | null) {
  const [data, setData] = useState<Data | null>(null);
  const [error, setError] = useState("");
  const [error404, setError404] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setData(null);
    setError("");
    setError404(false);

    if (!requestUrl) {
      return;
    }

    let effectCancelled = false;
    setIsLoading(true);

    (async () => {
      let response: Response;
      try {
        response = await fetch(requestUrl);
      } catch (err) {
        if (effectCancelled) return;

        const message = (err as Error).message;
        setError(`Fetch Error: ${message}`);
        setIsLoading(false);
        return;
      }

      if (effectCancelled) return;

      if (!response.ok) {
        if (response.status === 404) {
          setError404(true);
          setIsLoading(false);
          return;
        }

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

  return { data, error, error404, isLoading };
}
