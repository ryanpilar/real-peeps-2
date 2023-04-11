/**
    This code exports a function called useLocalStorage, which takes two arguments: 
    key and initialValue, both of which are strings.

    When the useLocalStorage function is called, it returns an array containing two values: 
    storedValue and setValue function.

    The storedValue is a state variable that is declared and initialized using the useState 
    hook. The initial value of storedValue is either retrieved from local storage using the 
    key argument or is set to initialValue.

    The setValue function is responsible for updating the value of storedValue and storing 
    it in local storage. It takes an argument called value that can be either a string or a 
    function. If it's a function, it gets called with the current value of storedValue and 
    the result is used to update the value of storedValue.

    Finally, the useLocalStorage function returns an array containing storedValue and 
    setValue function, which can be used to get and set the value of the stored item in 
    local storage.
 */

import * as React from "react";

export default function useLocalStorage(
  key: string,
  initialValue: string
): [string, (value: Function | string) => void] {
  // Declare state variable `storedValue` and `setStoredValue` using the `useState` hook with an anonymous function
  // that attempts to retrieve the value of `key` from local storage, otherwise sets it to `initialValue`
  const [storedValue, setStoredValue] = React.useState(() => {
    try {
      // Get the value of `key` from local storage if `window` object is available
      const item =
        typeof window !== "undefined" && window.localStorage.getItem(key);

      return item ? item : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value: Function | string) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;

      setStoredValue(valueToStore);

      window.localStorage.setItem(key, valueToStore);
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
}
