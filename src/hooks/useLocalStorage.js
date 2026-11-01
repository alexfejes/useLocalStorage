import { useEffect, useState } from "react";

// Read a key from localStorage, parse the JSON, fall back to `initial`
const read = (key, initial) => JSON.parse(localStorage.getItem(key)) ?? initial;

export function useLocalStorage(key, initial) {
  // State, lazily initialized from localStorage
  const [value, setValue] = useState(() => read(key, initial));

  // Save to localStorage whenever key or value changes
  useEffect(
    () => localStorage.setItem(key, JSON.stringify(value)),
    [key, value],
  );

  // FIX: sync other tabs (select the lines below + Ctrl+/)
  useEffect(() => {
    const sync = (e) => e.key === key && setValue(read(key, initial));
    addEventListener("storage", sync);
    return () => removeEventListener("storage", sync);
  }, [key, initial]);

  return [value, setValue];
}
