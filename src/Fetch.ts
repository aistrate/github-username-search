import { useState, useEffect } from "react";

export { useFetch };

function useFetch<Data>(requestUrl: string | null) {
  const [data, setData] = useState<Data | null>(null);
  const [error, setError] = useState("");
  const [error404, setError404] = useState(false);

  useEffect(() => {
    setData(null);
    setError("");
    setError404(false);

    if (!requestUrl) {
      return;
    }

    (async () => {
      let response: Response;
      try {
        response = await fetch(requestUrl);
      } catch (err) {
        const message = (err as Error).message;
        setError(`Fetch Error: ${message}`);
        return;
      }

      if (!response.ok) {
        if (response.status === 404) {
          setError404(true);
        } else {
          let errorData = await response.json();
          setError(`HTTP Error: (${response.status}) ${errorData.message}`);
        }
        return;
      }

      setData(await response.json());
    })();
  }, [requestUrl]);

  return { data, error, error404 };
}
