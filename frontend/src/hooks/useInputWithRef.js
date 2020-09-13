import { useEffect, useRef } from 'react';
import { useImmer } from 'use-immer';

function useInputWithRef(waitFor = 0) {
  const inputRef = useRef(null);

  const [input, setInput] = useImmer({
    isLoading: false,
    searchTerm: '',
  });

  useEffect(() => {
    const searchTimer = setTimeout(() => {
      if (input.searchTerm === inputRef.current.value && inputRef.current.value)
        console.log('Search: ', input.searchTerm);
    }, waitFor);
    return () => {
      clearTimeout(searchTimer);
    };
  }, [input, waitFor]);

  return [input, setInput, inputRef];
}

export default useInputWithRef;
