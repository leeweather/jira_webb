import { useEffect, useState } from "react";

export const isFalsy = (value: unknown) => (value === 0 ? false : !value);

export const changeObject = (object: object) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    // @ts-ignore
    const value = result[key];
    if (isFalsy(value)) {
      // @ts-ignore
      delete result[key];
    }
  });
  return result;
};

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []);
};

export const useDebounce = <V>(value: V, delay?: number) => {
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceValue(value);
    }, delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);
  return debounceValue;
};

export const useArray = <V>(initValue: V[]) => {
  const [value, setValue] = useState(initValue);
  const clear = (): void => setValue([]);
  const removeIndex = (index: number) => {
    const newValue = value.filter((v, i) => i !== index);
    setValue(newValue);
  };
  const add = (addValue: V) => setValue([...value, addValue]);
  return {
    value,
    clear,
    removeIndex,
    add,
  };
};