import { useCallback, useEffect, useState } from "react";

/**
 * A useState-like hook that persists its value to localStorage.
 * Safe against SSR / disabled storage (falls back to in-memory state).
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const readValue = useCallback((): T => {
    if (typeof window === "undefined") return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item !== null ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  }, [key, initialValue]);

  const [storedValue, setStoredValue] = useState<T>(readValue);

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStoredValue((prev) => {
        const next = value instanceof Function ? value(prev) : value;
        try {
          window.localStorage.setItem(key, JSON.stringify(next));
        } catch {
          // Ignore write errors (e.g. private mode / quota exceeded).
        }
        return next;
      });
    },
    [key],
  );

  // Re-read if the key changes.
  useEffect(() => {
    setStoredValue(readValue());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return [storedValue, setValue] as const;
}
