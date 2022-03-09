import Home from "../components/Home/Home"
import useHttp from "../Http-request/use-http"
import AuthContext from "../store/auth-context"
import { useContext,useEffect, useState } from "react"

const HomePage=()=>{



    const authCtx = useContext(AuthContext)
    const [info,setInfo]=useState()
    const {isLoading,sendRequest} = useHttp()

    useEffect(()=>{
        const getUserInfo= async()=>{
            const data = await sendRequest({
                url:'/users/me',
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':authCtx.token
                  }
            })
            setInfo(data)            

        }
        getUserInfo()
    },[sendRequest,authCtx.token])

 
return(
    <div>
       
        {isLoading && <p>Loading...</p>}
        {!isLoading && info && <Home userInfo={info} />}

    </div>
   
)
}

export default HomePage