import {useState,useCallback, useContext} from "react"

const useHttp=()=>{
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback( async (requestConfig) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(requestConfig.url,{
          method:requestConfig.method ? requestConfig.method :'GET',
          headers:requestConfig.headers ? requestConfig.headers:{},
          body:requestConfig.body ? requestConfig.body:null
      });

      if (!response.ok) {
        setIsLoading(false)
       throw new Error('Unable to login');
      }
      setIsLoading(false);
      const data = await response.json()
      return data

    } catch (err) {
      setError(err.message || 'Something went wrong!');
    }
    
  },[]);
  return {
      isLoading,
      error,
      sendRequest
  }
}


export default useHttp