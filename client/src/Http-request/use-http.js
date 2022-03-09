import {useState,useCallback} from "react"

const useHttp=()=>{
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  

  const sendRequest = useCallback( async (requestConfig) => {
    setIsLoading(true);
    setError(null);
    console.log("from send request",requestConfig.body)
    try {
      const response = await fetch(requestConfig.url,{
          method:requestConfig.method ? requestConfig.method :'GET',
          headers:requestConfig.headers ? requestConfig.headers:{},
          body:requestConfig.body ? requestConfig.body:null
      });

      if (!response.ok) {
        
        throw new Error('Request failed!');
      }

      const data = await response.json()
      return data

    } catch (err) {
      //console.log(err)
      setError(err.message || 'Something went wrong!');
    }
    setIsLoading(false);
  },[])
  return {
      isLoading,
      error,
      sendRequest
  }
}


export default useHttp