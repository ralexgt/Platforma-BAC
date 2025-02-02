import {useState, useEffect} from "react";

function useFetch<T> (url: string) {
  const [data, setData] = useState<T>();
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const abort = new AbortController();
    
    fetch(url, {signal: abort.signal})
    .then(res => {
      if (!res.ok) {
        throw Error("could not fetch data");
      }  
      return res.json();
    })
    .then((data: T) => {
      setData(data);
      setIsPending(false);
      setError("");
    })
    .catch((err) => {
      if (err.name === "AbortError") {     
        setIsPending(false);
        setError(err.message);
      }
    });

    return () => {
      abort.abort();
    }
  }, [url]);

  return {data, isPending, error};
}

export default useFetch;
