import { useState, useEffect } from "react";

export { useFetch, usePagedFetch };

function useFetch<Data>(requestUrl: string | null) {
  const [data, setData] = useState<Data | null>(null);
  const [error, setError] = useState("");
  const [error404, setError404] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [requestUrlValue, setRequestUrlValue] = useState<string | null>(null);

  useEffect(() => {
    setData(null);
    setError("");
    setError404(false);
    setRequestUrlValue(requestUrl);

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

  return { data, error, error404, isLoading, requestUrl: requestUrlValue };
}

function usePagedFetch<Data>(
  getRequestUrl: (page: number) => string | null,
  resettingDependency: string | null
) {
  const [lastVisiblePage, setLastVisiblePage] = useState(0);
  const [page, setPage] = useState(1);
  const [allData, setAllData] = useState<Data[] | null>(null);

  useEffect(() => {
    setLastVisiblePage(0);
    setPage(1);
    setAllData(null);
  }, [resettingDependency]);

  const currentFetch = useFetch<Data[]>(getRequestUrl(page));

  useEffect(() => {
    if (
      lastVisiblePage < page &&
      !currentFetch.isLoading &&
      currentFetch.requestUrl === getRequestUrl(page) &&
      currentFetch.data &&
      (currentFetch.data.length > 0 || page === 1)
    ) {
      const currentFetchData = currentFetch.data;
      setLastVisiblePage(page);
      setAllData((allData) => [...(allData || []), ...currentFetchData]);
    }
  }, [lastVisiblePage, page, currentFetch, getRequestUrl]);

  function nextPage() {
    if (
      !currentFetch.isLoading &&
      currentFetch.data &&
      currentFetch.data.length > 0
    ) {
      setPage((page) => page + 1);
    }
  }

  return {
    data: allData,
    error: currentFetch.error,
    error404: currentFetch.error404,
    isLoading: currentFetch.isLoading,
    nextPage,
  };
}
