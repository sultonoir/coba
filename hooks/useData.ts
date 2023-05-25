import useSWR from "swr";

const fetcher = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const useData = (params: string) => {
  const { data, error } = useSWR(params, fetcher);

  return {
    anyData: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useData;
