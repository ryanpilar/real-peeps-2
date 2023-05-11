/**
  The purpose of this hook is to provide a way to set an initial value that is compatible 
  with server-side rendering (SSR) in React.

  Returns the updated value as a state variable.
 */

import { useState, useEffect } from "react";

export function useSsrCompatible<T>(newValue: T, initialValue: T) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(newValue);
  }, [newValue]);

  return value;
}
