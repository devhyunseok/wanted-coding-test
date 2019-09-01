import { useState, useEffect, Dispatch, SetStateAction} from 'react';

const useInfiniteScroll = (callback: any) : [boolean, Dispatch<SetStateAction<boolean>>] => {
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isFetching) return;
    callback();
  }, [isFetching]);

  function handleScroll() {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isFetching) {
        return;
    }
    setIsFetching(true);
  }

  return [isFetching, setIsFetching];
} 

export default useInfiniteScroll;