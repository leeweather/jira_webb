import { useSearchParams } from "react-router-dom";

export const useUrlQueryParam = (keys: string[]) => {
  const [searchParams, setSearchParam] = useSearchParams();
  return [
    keys.reduce((pre, key) => {
      return { ...pre, [key]: searchParams.get(key) };
    }, {}),
    setSearchParam,
  ] as const;
};
